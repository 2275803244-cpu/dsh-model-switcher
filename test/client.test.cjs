/**
 * Harness for lib/client.js: loads the hand-written browser bundle in a VM with
 * a fake __ModuleLoader__/document and a minimal React shim, drives the two
 * registered slots, and asserts the Host API contract the plugin depends on.
 *
 * Self-contained on purpose: no react/react-dom resolution, so it runs from any
 * directory and cannot be fooled by a mismatched React copy.
 *
 *   node test/client.test.cjs
 */
'use strict';

const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const BUNDLE = path.resolve(__dirname, '..', 'lib', 'client.js');

// ------------------------------------------------------------------ DOM stub
const styleTags = [];
class FakeNode {}
const documentStub = {
  querySelector: () => null,
  createElement: () => ({ dataset: {}, textContent: '', setAttribute() {} }),
  head: { appendChild: (tag) => styleTags.push(tag) },
  addEventListener() {},
  removeEventListener() {}
};

// ------------------------------------------------------------- React shim
/**
 * A tiny element factory + hooks implementation. Enough for these components:
 * useState, useRef, useEffect (flushed on demand), useSyncExternalStore.
 * Elements are plain `{ type, props }` records, so assertions can walk them.
 */
function createReactShim() {
  const pendingEffects = [];
  let hooks = [];
  let cursor = 0;
  let rerender = null;

  const depsChanged = (prev, next) => {
    if (prev === undefined || next === undefined) return true;
    if (prev.length !== next.length) return true;
    for (let i = 0; i < prev.length; i += 1) if (prev[i] !== next[i]) return true;
    return false;
  };

  const React = {
    createElement: (type, props, ...children) => {
      const merged = children.length === 0 ? props || {} : { ...(props || {}), children: children.length === 1 ? children[0] : children };
      return { type, props: merged };
    },
    useState(initial) {
      const index = cursor++;
      if (hooks[index] === undefined) hooks[index] = { value: typeof initial === 'function' ? initial() : initial };
      const slot = hooks[index];
      return [slot.value, (next) => {
        slot.value = typeof next === 'function' ? next(slot.value) : next;
        if (rerender) rerender();
      }];
    },
    useRef(initial) {
      const index = cursor++;
      if (hooks[index] === undefined) hooks[index] = { current: initial };
      return hooks[index];
    },
    useEffect(fn, deps) {
      const index = cursor++;
      const slot = hooks[index];
      if (slot !== undefined && !depsChanged(slot.deps, deps)) return;
      hooks[index] = { deps };
      pendingEffects.push(fn);
    },
    useSyncExternalStore(subscribe, getSnapshot) {
      const index = cursor++;
      if (hooks[index] === undefined) hooks[index] = { value: getSnapshot() };
      const slot = hooks[index];
      slot.value = getSnapshot();
      return slot.value;
    },
    useCallback: (fn) => fn,
    useMemo: (fn) => fn(),
    useId: () => 'id'
  };

  const jsxRuntime = {
    jsx: (type, props, key) => ({ type, props: props || {}, key }),
    jsxs: (type, props, key) => ({ type, props: props || {}, key }),
    Fragment: Symbol.for('react.fragment')
  };

  /**
   * Turn a JSX element tree into the fully-resolved output: descend through
   * nested function components (invoking them) and host/Fragment elements, so
   * collect/textOf/panelOf see the real rendered DOM-ish structure. Hook calls
   * use the single shared `hooks`/`cursor` pair: functions are invoked in a
   * stable per-render order, so each call site reliably gets its own indices.
   */
  function resolveEl(el) {
    if (el === null || typeof el !== 'object') return el;
    if (Array.isArray(el)) return el.map(resolveEl);
    const type = el.type;
    if (typeof type === 'function') {
      // Function component: invoke it (this advances cursor past its hooks),
      // then resolve whatever it returned.
      return resolveEl(type(el.props));
    }
    if (typeof type === 'string') {
      // Host element: resolve children in place.
      if (el.props && el.props.children !== undefined) {
        return { type, props: { ...el.props, children: resolveEl(el.props.children) } };
      }
      return el;
    }
    // Fragment or exotic type: unwrap its children.
    return el.props && el.props.children !== undefined ? resolveEl(el.props.children) : el;
  }

  return {
    React,
    jsxRuntime,
    /**
     * Render one component function with a fresh hook list and return a getter
     * for the current tree: state updates re-render internally, so assertions
     * read the latest output through the getter.
     */
    render(Component, props) {
      hooks = [];
      cursor = 0;
      pendingEffects.length = 0;
      let current = null;
      const run = () => {
        cursor = 0;
        pendingEffects.length = 0;
        rerender = run;
        current = resolveEl({ type: Component, props });
        // Flush effects produced by this render pass (state updates re-render).
        let guard = 0;
        while (pendingEffects.length > 0 && guard < 20) {
          const batch = pendingEffects.splice(0, pendingEffects.length);
          for (const fn of batch) fn();
          guard += 1;
        }
      };
      run();
      return () => current;
    },
    /** Let promise callbacks and their re-renders settle. */
    async settle() {
      for (let i = 0; i < 6; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => setImmediate(resolve));
      }
    }
  };
}

// ------------------------------------------------------------- slot capture
function loadBundle(reactShim) {
  const registered = [];
  const source = fs.readFileSync(BUNDLE, 'utf8');
  const sandbox = {
    window: {
      __ModuleLoader__: { load: (record) => registered.push(record) },
      innerWidth: 1280,
      addEventListener() {},
      removeEventListener() {}
    },
    document: documentStub,
    Node: FakeNode,
    console
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'lib/client.js' });
  assert.strictEqual(registered.length, 1, 'bundle must register exactly one module');
  const record = registered[0];
  assert.strictEqual(record.id, 'dsh-client-ui-model-switcher');
  return record.factory((id) => {
    if (id === 'react') return reactShim.React;
    if (id === 'react/jsx-runtime') return reactShim.jsxRuntime;
    throw new Error('unexpected require ' + id);
  });
}

/** Run the plugin body against a fake cordis ctx and capture its registrations. */
function mountPlugin(reactShim, api, sessionState) {
  const slots = [];
  const slotsService = {
    inject: (name, fn) => fn(),
    register: (options, Component) => {
      slots.push({ options, Component });
      return () => {};
    }
  };
  const scope = {
    slots: slotsService,
    modelDirectories: { directoryFor: () => sessionState.directory },
    sessions: { subagentAddress: () => undefined },
    remote: api,
    get: (key) => {
      if (key === 'remote') return api;
      if (key === 'connection') return { rpc: {} };
      throw new Error('unknown service ' + key);
    }
  };
  const ctx = {
    inject: (deps, fn) => {
      for (const dep of deps) {
        assert.ok(['slots', 'modelDirectories', 'connection', 'remote'].includes(dep), 'unexpected dependency ' + dep);
      }
      fn(scope);
    }
  };
  const plugin = loadBundle(reactShim);
  assert.strictEqual(typeof plugin.apply, 'function', 'browser half must export apply');
  plugin.apply(ctx);
  assert.deepStrictEqual(
    slots.map((entry) => entry.options.name).sort(),
    ['conversation.input.right', 'conversation.session.header.actions']
  );
  return slots;
}

// ------------------------------------------------------------ render helpers
function walk(node, visit) {
  if (Array.isArray(node)) {
    for (const child of node) walk(child, visit);
    return;
  }
  if (node === null || typeof node !== 'object') return;
  visit(node);
  if (node.props && node.props.children !== undefined) walk(node.props.children, visit);
}

/** All elements of one tag (or every element when tag is undefined), in order. */
function collect(element, tag) {
  const found = [];
  walk(element, (node) => {
    if (tag === undefined || node.type === tag) found.push(node);
  });
  return found;
}

/** Visible-ish text: string children plus aria-label/title, in tree order. */
function textOf(element) {
  const parts = [];
  walk(element, (node) => {
    const children = node.props ? node.props.children : undefined;
    if (typeof children === 'string' || typeof children === 'number') parts.push(String(children));
    for (const attr of ['aria-label', 'title']) {
      if (node.props && typeof node.props[attr] === 'string') parts.push(node.props[attr]);
    }
  });
  return parts.join(' | ');
}

function hasClass(element, className) {
  return typeof element.props.className === 'string' && element.props.className.split(' ').includes(className);
}

function click(element) {
  const handler = element.props.onClick;
  assert.strictEqual(typeof handler, 'function', 'element must have an onClick');
  handler();
}

/** The open panel, found through a render getter. */
function panelOf(getElement) {
  return collect(getElement(), 'div').find((node) => hasClass(node, '_ms_panel'));
}

// ------------------------------------------------------------------ fixtures
const GROUPS = [
  { id: 'deepseek-official', name: 'DeepSeek', models: [
    { id: 'deepseek-v4.1-flash-expires-on-0910', name: 'V4.1 Flash', reasoning: { efforts: [{ id: 'low', name: 'Low' }, { id: 'high', name: 'High' }], defaultEffort: 'high' } },
    { id: 'deepseek-v4-pro', name: 'V4 Pro' }
  ] },
  { id: 'anthropic', name: 'Anthropic', models: [{ id: 'claude-sonnet', name: 'Sonnet' }] },
  { id: 'ollama', name: 'Ollama Local', models: [{ id: 'llama3.1:8b', name: 'Llama' }] }
];

function remoteStub() {
  const calls = [];
  return {
    calls,
    llm: {
      listProviders: () => {
        calls.push(['llm.listProviders']);
        return Promise.resolve({ ok: true, value: [
          { id: 'deepseek-official', name: 'DeepSeek' },
          { id: 'anthropic', name: 'Anthropic' },
          { id: 'ollama', name: 'Ollama Local' }
        ] });
      },
      listConfigurableProviders: () => {
        calls.push(['llm.listConfigurableProviders']);
        return Promise.resolve({ ok: true, value: [
          { provider: 'deepseek-official', displayName: 'DeepSeek', settingsNs: 'llm-deepseek', settingsPath: [] },
          { provider: 'anthropic', displayName: 'Anthropic', settingsNs: 'llm-pi-ai', settingsPath: ['providers', 'anthropic'] },
          { provider: 'groq', displayName: 'Groq', settingsNs: 'llm-pi-ai', settingsPath: ['providers', 'groq'] },
          { provider: 'ollama', displayName: 'Ollama Local', settingsNs: 'llm-pi-ai', settingsPath: ['providers', 'ollama'] }
        ] });
      },
      discoverModels: (opts) => {
        calls.push(['llm.discoverModels', opts]);
        return Promise.resolve({ ok: true, value: { models: [
          { id: 'resolved-model', name: 'Resolved Model' }
        ] } });
      }
    },
    settings: {
      describe: () => {
        calls.push(['settings.describe']);
        return Promise.resolve({ ok: true, value: { writable: true, hasDocument: true, namespaces: [
          { ns: 'llm-deepseek', value: { apiKeyEnv: 'DEEPSEEK_API_KEY' } },
          { ns: 'llm-pi-ai', value: { providers: {
            anthropic: { apiKeyEnv: 'ANTHROPIC_API_KEY' },
            groq: { apiKeyEnv: 'GROQ_API_KEY' },
            ollama: { baseURL: 'http://localhost:11434/v1' }
          } } }
        ] } });
      },
      mutate: (req) => {
        calls.push(['settings.mutate', req]);
        return Promise.resolve({ ok: true });
      }
    },
    credentials: {
      describe: (refs) => {
        calls.push(['credentials.describe', Array.from(refs)]);
        assert.ok(Array.isArray(refs), 'credentials.describe takes a ref array');
        return Promise.resolve({ ok: true, value: {
          DEEPSEEK_API_KEY: { configured: true, writable: true },
          ANTHROPIC_API_KEY: { configured: false, writable: true },
          GROQ_API_KEY: { configured: true, writable: true }
        } });
      },
      set: (req) => {
        calls.push(['credentials.set', req]);
        return Promise.resolve({ ok: true, value: {} });
      }
    }
  };
}

function sessionState(current) {
  const snapshot = { current, routable: true, groups: GROUPS, failures: [], status: 'ready', error: null };
  const subscribers = new Set();
  const directory = {
    selected: null,
    load: () => Promise.resolve(snapshot),
    select: (selection) => {
      directory.selected = selection;
      return Promise.resolve();
    },
    store: {
      subscribe: (fn) => {
        subscribers.add(fn);
        return () => subscribers.delete(fn);
      },
      getSnapshot: () => snapshot
    }
  };
  return { directory };
}

function slotOf(reactShim, api, state, name) {
  const slots = mountPlugin(reactShim, api, state);
  const slot = slots.find((entry) => entry.options.name === name);
  assert.ok(slot, 'slot ' + name + ' registered');
  return slot;
}

// -------------------------------------------------------------------- tests
function test(name, fn) {
  return Promise.resolve()
    .then(fn)
    .then(() => console.log('  ok   ' + name))
    .catch((error) => {
      console.error('  FAIL ' + name + '\n         ' + (error && error.message));
      process.exitCode = 1;
    });
}

async function main() {
  console.log('dsh-client-ui-model-switcher client harness');
  const tests = [];

  tests.push(test('registers both slots and renders the header trigger', () => {
    const shim = createReactShim();
    const api = remoteStub();
    const state = sessionState({ provider: 'deepseek-official', model: 'deepseek-v4.1-flash-expires-on-0910', reasoningEffort: 'high' });
    const slot = slotOf(shim, api, state, 'conversation.session.header.actions');
    const element = shim.render(slot.Component, slot.options.inject('session-1'));
    assert.match(textOf(element()), /一键切换服务商和模型/);
  }));

  tests.push(test('usability check uses the real Remote contract', async () => {
    const shim = createReactShim();
    const api = remoteStub();
    const state = sessionState({ provider: 'deepseek-official', model: 'deepseek-v4-pro' });
    const slot = slotOf(shim, api, state, 'conversation.session.header.actions');
    const map = await slot.options.inject('session-1').loadUsable();
    assert.deepStrictEqual(api.calls, [
      ['llm.listProviders'],
      ['llm.listConfigurableProviders'],
      ['settings.describe'],
      ['credentials.describe', ['DEEPSEEK_API_KEY', 'ANTHROPIC_API_KEY', 'GROQ_API_KEY']]
    ]);
    assert.deepStrictEqual(JSON.parse(JSON.stringify(map)), {
      'deepseek-official': true, // registered route + configured key
      anthropic: false, // registered route, no key
      groq: false, // key configured, route not registered
      ollama: true // registered route, no key required
    });
  }));

  tests.push(test('panel hides unusable providers and keeps the rest', async () => {
    const shim = createReactShim();
    const api = remoteStub();
    const state = sessionState({ provider: 'deepseek-official', model: 'deepseek-v4.1-flash-expires-on-0910', reasoningEffort: 'high' });
    const slot = slotOf(shim, api, state, 'conversation.session.header.actions');
    const element = shim.render(slot.Component, slot.options.inject('session-1'));
    click(collect(element(), 'button')[0]);
    await shim.settle();
    const panel = panelOf(element);
    assert.ok(panel, 'panel renders once open');
    const text = textOf(panel);
    assert.match(text, /DeepSeek/);
    assert.match(text, /Ollama Local/);
    assert.ok(!/Anthropic/.test(text), 'keyless provider must be hidden, got: ' + text);
    assert.ok(!/Groq/.test(text), 'unregistered route must be hidden, got: ' + text);
  }));

  tests.push(test('switching a model submits provider + model', async () => {
    const shim = createReactShim();
    const api = remoteStub();
    const state = sessionState({ provider: 'deepseek-official', model: 'deepseek-v4.1-flash-expires-on-0910', reasoningEffort: 'high' });
    const slot = slotOf(shim, api, state, 'conversation.session.header.actions');
    const element = shim.render(slot.Component, slot.options.inject('session-1'));
    click(collect(element(), 'button')[0]);
    await shim.settle();
    const rows = collect(element(), 'button').filter((node) => hasClass(node, '_ms_row'));
    const proRow = rows.find((node) => textOf(node).includes('deepseek-v4-pro'));
    assert.ok(proRow, 'V4 Pro row present');
    click(proRow);
    await shim.settle();
    assert.deepStrictEqual(JSON.parse(JSON.stringify(state.directory.selected)), { provider: 'deepseek-official', model: 'deepseek-v4-pro' });
  }));

  tests.push(test('re-picking the active model keeps the chosen effort', async () => {
    const shim = createReactShim();
    const api = remoteStub();
    const state = sessionState({ provider: 'deepseek-official', model: 'deepseek-v4.1-flash-expires-on-0910', reasoningEffort: 'low' });
    const slot = slotOf(shim, api, state, 'conversation.session.header.actions');
    const element = shim.render(slot.Component, slot.options.inject('session-1'));
    click(collect(element(), 'button')[0]);
    await shim.settle();
    const rows = collect(element(), 'button').filter((node) => hasClass(node, '_ms_row'));
    const activeRow = rows.find((node) => hasClass(node, '_ms_active'));
    assert.ok(activeRow, 'active row present');
    click(activeRow);
    await shim.settle();
    assert.deepStrictEqual(JSON.parse(JSON.stringify(state.directory.selected)), {
      provider: 'deepseek-official',
      model: 'deepseek-v4.1-flash-expires-on-0910',
      reasoningEffort: 'low'
    });
  }));

  tests.push(test('a model with a declared default effort carries it', async () => {
    const shim = createReactShim();
    const api = remoteStub();
    const state = sessionState({ provider: 'deepseek-official', model: 'deepseek-v4-pro' });
    const slot = slotOf(shim, api, state, 'conversation.input.right');
    const element = shim.render(slot.Component, slot.options.inject('session-1'));
    click(collect(element(), 'button')[0]); // open the composer seat
    await shim.settle();
    const rows = collect(element(), 'button').filter((node) => hasClass(node, '_msRow'));
    const flashRow = rows.find((node) => textOf(node).includes('V4.1 Flash'));
    assert.ok(flashRow, 'V4.1 Flash row present');
    click(flashRow);
    await shim.settle();
    assert.deepStrictEqual(JSON.parse(JSON.stringify(state.directory.selected)), {
      provider: 'deepseek-official',
      model: 'deepseek-v4.1-flash-expires-on-0910',
      reasoningEffort: 'high'
    });
  }));

  tests.push(test('the composer seat shows the effort level', () => {
    const shim = createReactShim();
    const api = remoteStub();
    const state = sessionState({ provider: 'deepseek-official', model: 'deepseek-v4.1-flash-expires-on-0910', reasoningEffort: 'low' });
    const slot = slotOf(shim, api, state, 'conversation.input.right');
    const element = shim.render(slot.Component, slot.options.inject('session-1'));
    const text = textOf(element());
    assert.match(text, /V4\.1 Flash/);
    assert.match(text, /Low/);
  }));

  tests.push(test('a failing usability check degrades to the unfiltered list', async () => {
    const shim = createReactShim();
    const api = remoteStub();
    api.llm.listProviders = () => Promise.reject(new Error('offline'));
    const state = sessionState({ provider: 'deepseek-official', model: 'deepseek-v4-pro' });
    const slot = slotOf(shim, api, state, 'conversation.session.header.actions');
    const element = shim.render(slot.Component, slot.options.inject('session-1'));
    click(collect(element(), 'button')[0]);
    await shim.settle();
    const text = textOf(panelOf(element));
    assert.match(text, /DeepSeek/);
    assert.match(text, /Anthropic/);
    assert.match(text, /Ollama Local/);
  }));

  tests.push(test('every provider unusable still renders the full list', async () => {
    const shim = createReactShim();
    const api = remoteStub();
    api.credentials.describe = (refs) => Promise.resolve({
      ok: true,
      value: Object.fromEntries(Array.from(refs).map((ref) => [ref, { configured: false, writable: true }]))
    });
    const state = sessionState({ provider: 'deepseek-official', model: 'deepseek-v4-pro' });
    const slot = slotOf(shim, api, state, 'conversation.session.header.actions');
    const element = shim.render(slot.Component, slot.options.inject('session-1'));
    click(collect(element(), 'button')[0]);
    await shim.settle();
    assert.match(textOf(panelOf(element)), /DeepSeek/);
  }));

  tests.push(test('the panel re-checks provider usability on every open', async () => {
    const shim = createReactShim();
    const api = remoteStub();
    const state = sessionState({ provider: 'deepseek-official', model: 'deepseek-v4-pro' });
    const slot = slotOf(shim, api, state, 'conversation.session.header.actions');
    const element = shim.render(slot.Component, slot.options.inject('session-1'));
    click(collect(element(), 'button')[0]);
    await shim.settle();
    assert.ok(!/Anthropic/.test(textOf(panelOf(element))), 'keyless provider hidden on first open');
    // The user stores the key in Settings; the next open must pick it up.
    api.credentials.describe = (refs) => Promise.resolve({
      ok: true,
      value: Object.fromEntries(Array.from(refs).map((ref) => [ref, { configured: true, writable: true }]))
    });
    click(collect(element(), 'button')[0]); // close
    await shim.settle();
    click(collect(element(), 'button')[0]); // reopen
    await shim.settle();
    assert.match(textOf(panelOf(element)), /Anthropic/, 'provider appears after its key is added');
  }));

  tests.push(test('web-search toggle cycles and persists its pref via settings.mutate', async () => {
    const shim = createReactShim();
    const api = remoteStub();
    const state = sessionState({ provider: 'deepseek-official', model: 'deepseek-v4-pro' });
    const slot = slotOf(shim, api, state, 'conversation.session.header.actions');
    const element = shim.render(slot.Component, slot.options.inject('session-1'));
    click(collect(element(), 'button')[0]); // open the header panel
    await shim.settle();
    let panel = panelOf(element);
    const badge = collect(panel, 'button').find((node) => hasClass(node, '_ms_searchBadge'));
    assert.ok(badge, 'search toggle badge present in the panel footer');
    assert.match(textOf(badge), /未联网/, 'starts off when no stored pref');
    assert.strictEqual(badge.props['aria-pressed'], false, 'off badge not pressed');
    // cycle on → follow → off; each step must write only-add into the plugin ns.
    const onWrites = () => api.calls.filter((c) => c[0] === 'settings.mutate');
    click(badge);
    await shim.settle();
    panel = panelOf(element);
    let b = collect(panel, 'button').find((node) => hasClass(node, '_ms_searchBadge'));
    assert.match(textOf(b), /联网(?!未)/, 'badge now shows on');
    assert.strictEqual(b.props['aria-pressed'], true, 'on badge pressed');
    click(b);
    await shim.settle();
    panel = panelOf(element);
    b = collect(panel, 'button').find((node) => hasClass(node, '_ms_searchBadge'));
    assert.match(textOf(b), /沿用上次/, 'badge shows follow');
    click(b);
    await shim.settle();
    panel = panelOf(element);
    b = collect(panel, 'button').find((node) => hasClass(node, '_ms_searchBadge'));
    assert.match(textOf(b), /未联网/, 'badge wraps back to off');
    const writes = onWrites().map((c) => c[1]);
    assert.ok(writes.length >= 1, 'toggle persisted through settings.mutate');
    for (const w of writes) {
      assert.strictEqual(w.ns, 'dsh-client-ui-model-switcher', 'search pref ns is plugin-local');
      assert.strictEqual(w.ops.length, 1, 'single only-add op');
      assert.strictEqual(w.ops[0].op, 'set', 'path-level set');
      assert.deepStrictEqual([...w.ops[0].path], ['searchPref'], 'writes under searchPref');
      assert.ok(['on', 'follow', 'off'].includes(w.ops[0].value), 'a valid search mode value');
    }
    // every transition produced exactly one write in stable order on/follow/off.
    const values = writes.map((w) => w.ops[0].value);
    assert.deepStrictEqual(values, ['on', 'follow', 'off'], 'cycles on→follow→off');
  }));

  tests.push(test('manage panel writes a provider preset via settings.mutate only-add', async () => {
    const shim = createReactShim();
    const api = remoteStub();
    const state = sessionState({ provider: 'deepseek-official', model: 'deepseek-v4-pro' });
    const slot = slotOf(shim, api, state, 'conversation.session.header.actions');
    const element = shim.render(slot.Component, slot.options.inject('session-1'));
    click(collect(element(), 'button')[0]);
    await shim.settle();
    let panel = panelOf(element);
    assert.match(textOf(panel), /自定义接口预设/, 'manage button present in panel footer');
    // open the manage sub-panel and fill the form.
    const manageBtn = collect(panel, 'button').find((b) => /自定义接口预设/.test(textOf(b)));
    assert.ok(manageBtn, 'manage button found');
    click(manageBtn);
    await shim.settle();
    panel = panelOf(element);
    assert.strictEqual(
      collect(panelOf(element), 'button').find((b) => /自定义接口预设/.test(textOf(b))).props['aria-expanded'],
      true,
      'manage panel toggles open'
    );
    let panelText = textOf(panel);
    assert.match(panelText, /服务商名称/, 'manage form fields render');
    assert.match(panelText, /接口地址 baseURL/, 'manage form asks for baseURL');
    assert.match(panelText, /默认模型 ID/, 'manage form asks for a model id');
    // submit the form: must hit only-add settings.mutate with providers.<slug>.
    let input = collect(panel, 'input');
    input[0].props.onChange({ target: { value: '我的中转' } });
    input[1].props.onChange({ target: { value: 'https://api.example.com/v1' } });
    input[2].props.onChange({ target: { value: 'MY_PROVIDER_API_KEY' } });
    input[3].props.onChange({ target: { value: 'sk-abc123' } });
    input[4].props.onChange({ target: { value: 'gpt-4o' } });
    await shim.settle();
    panel = panelOf(element);
    let submitBtn = collect(panel, 'button').find((b) => textOf(b).includes('下一步：确认'));
    assert.ok(submitBtn, 'confirm step button present');
    click(submitBtn);
    await shim.settle();
    // now on confirm phase.
    panel = panelOf(element);
    let confirmBtn = collect(panel, 'button').find((b) => textOf(b).includes('确认写入'));
    assert.ok(confirmBtn, 'confirm write button present');
    click(confirmBtn);
    await shim.settle();
    const mutates = api.calls.filter((c) => c[0] === 'settings.mutate');
    assert.strictEqual(mutates.length, 2, 'preset write + discover re-write each mutate once');
    const writes = mutates.map((c) => c[1]);
    // only-add: single op, set under providers.<slug> on ns llm-pi-ai.
    for (const w of writes) {
      assert.strictEqual(w.ns, 'llm-pi-ai', 'preset writes to llm-pi-ai ns');
      assert.strictEqual(w.ops.length, 1, 'each write is a single op (only-add)');
      assert.ok(w.ops[0].op === 'set', 'uses path-level set');
      assert.deepStrictEqual([...w.ops[0].path.slice(0, 1)], ['providers'], 'adds under providers.*');
    }
    // credential set recorded.
    const sets = api.calls.filter((c) => c[0] === 'credentials.set');
    assert.strictEqual(sets.length, 1, 'writes the api key once');
    assert.strictEqual(sets[0][1].ref, 'MY_PROVIDER_API_KEY', 'credential ref is the chosen env name');
    assert.strictEqual(sets[0][1].value, 'sk-abc123', 'credential value stored');
    // discover probe ran with the baseURL.
    const disc = api.calls.filter((c) => c[0] === 'llm.discoverModels');
    assert.strictEqual(disc.length, 1, 'discoverModels probed once');
    assert.strictEqual(disc[0][1].baseURL, 'https://api.example.com/v1', 'probe hits the typed baseURL');
    // done state appears.
    const donePanel = panelOf(element);
    assert.match(textOf(donePanel), /已写入全局配置/, 'success message after write');
  }));

  await Promise.all(tests);
  console.log(process.exitCode === 1 ? 'FAILED' : 'all assertions passed');
}

main();
