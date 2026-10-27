// dsh-client-ui-model-switcher — browser half.
// One-click provider/model switcher: a session-header action that lists
// every configured provider group and its models (the same advisory
// catalog the /model popup and composer model seat share) and switches the
// session in a single click via the ModelDirectory controller.
// Hand-written ModuleLoader bundle: requires only statically provided
// modules (react, react/jsx-runtime), so no build step is needed.
window.__ModuleLoader__.load({
	id: "dsh-client-ui-model-switcher",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		const { jsx, jsxs } = react_jsx_runtime;
		//#region dsh-client-ui-model-switcher/ModelSwitcher.module.css
		const css = "._ms_root{position:relative}._ms_trigger{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;border:1px solid transparent;background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);cursor:pointer}._ms_trigger:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_panel{position:fixed;z-index:1000;width:min(380px,calc(100vw - 32px));max-height:min(520px,calc(100vh - 120px));display:flex;flex-direction:column;gap:6px;padding:8px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:12px;background:var(--dsw-alias-bg-module-platform,#fff);box-shadow:0 8px 24px rgba(0,0,0,.12)}._ms_head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 2px}._ms_title{font-size:13px;font-weight:600;color:var(--dsw-alias-label-primary,#1f2329);line-height:20px}._ms_current{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary,#4e5969);padding:4px 8px;border-radius:8px;background:var(--dsw-alias-bg-module-field,#f7f8fa)}._ms_warn{font-size:12px;line-height:18px;color:#d4380d;padding:0 8px}._ms_err{font-size:12px;line-height:18px;color:#d4380d;padding:0 8px;white-space:pre-wrap}._ms_status{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#86909c);padding:0 8px}._ms_list{list-style:none;margin:0;padding:0;overflow-y:auto;display:flex;flex-direction:column;gap:8px}._ms_group{display:flex;flex-direction:column;gap:2px}._ms_groupName{font-size:12px;line-height:18px;font-weight:600;color:var(--dsw-alias-label-secondary,#4e5969);padding:2px 6px}._ms_groupHint{font-weight:400;color:var(--dsw-alias-label-tertiary,#86909c);font-size:11px}._ms_row{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;padding:6px 8px;border:1px solid transparent;border-radius:8px;background:transparent;color:var(--dsw-alias-label-primary,#1f2329);font-size:13px;line-height:20px;cursor:pointer;text-align:left}._ms_row:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_row:disabled{opacity:.55;cursor:default}._ms_active{border-color:var(--dsw-static-brand-blue-600,#3964fe);background:rgba(57,100,254,.06)}._ms_modelName{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_modelId{font-size:11px;color:var(--dsw-alias-label-tertiary,#86909c);max-width:45%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_check{color:var(--dsw-static-brand-blue-600,#3964fe);font-weight:700;flex:none}._ms_empty{padding:12px 8px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-tertiary,#86909c)}._ms_providerTag{flex:none;font-size:11px;line-height:16px;padding:1px 6px;border-radius:999px;background:var(--dsw-alias-bg-module-field,#f7f8fa);color:var(--dsw-alias-label-secondary,#4e5969);border:1px solid var(--dsw-alias-border-l2,#e5e6eb);max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_failSummary{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary,#86909c);padding:0 8px}._msRoot{display:inline-flex;position:relative}._msTrigger{font-size:12px;line-height:18px;padding:2px 8px;border-radius:6px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);cursor:pointer;white-space:nowrap;max-width:160px;overflow:hidden;text-overflow:ellipsis}._msTrigger:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._msDisabled{opacity:.5;cursor:default}._msPopover{position:absolute;bottom:calc(100% + 6px);right:0;z-index:1000;width:min(280px,calc(100vw - 32px));max-height:320px;overflow-y:auto;display:flex;flex-direction:column;gap:2px;padding:6px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:10px;background:var(--dsw-alias-bg-module-platform,#fff);box-shadow:0 8px 24px rgba(0,0,0,.12)}._msList{display:flex;flex-direction:column;gap:2px}._msRow{display:flex;align-items:center;gap:6px;width:100%;box-sizing:border-box;padding:5px 8px;border:1px solid transparent;border-radius:6px;background:transparent;color:var(--dsw-alias-label-primary,#1f2329);font-size:12px;line-height:18px;cursor:pointer;text-align:left}._msRow:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._msRow:disabled{opacity:.55;cursor:default}._msActive{border-color:var(--dsw-static-brand-blue-600,#3964fe);background:rgba(57,100,254,.06)}._msModelName{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._msModelId{font-size:11px;color:var(--dsw-alias-label-tertiary,#86909c);max-width:40%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._msCheck{color:var(--dsw-static-brand-blue-600,#3964fe);font-weight:700;flex:none;font-size:12px}._msEmpty{padding:8px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#86909c)}._msSwitch{font-size:12px;line-height:18px;padding:5px 8px;border:none;background:transparent;color:var(--dsw-static-brand-blue-600,#3964fe);cursor:pointer;text-align:left;border-radius:6px}._msSwitch:hover{background:rgba(57,100,254,.06)}._msBack{font-size:12px;line-height:18px;padding:5px 8px;border:none;background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);cursor:pointer;text-align:left;border-radius:6px;gap:4px;display:flex;align-items:center}._msBack:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._msPList{display:flex;flex-direction:column;gap:2px}._msPRow{display:flex;align-items:center;gap:6px;width:100%;box-sizing:border-box;padding:5px 8px;border:1px solid transparent;border-radius:6px;background:transparent;color:var(--dsw-alias-label-primary,#1f2329);font-size:12px;line-height:18px;cursor:pointer;text-align:left}._msPRow:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._msPActive{border-color:var(--dsw-static-brand-blue-600,#3964fe);background:rgba(57,100,254,.06)}._msPName{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._msGroupBody{display:flex;flex-direction:column;gap:6px}._ms_chips{display:flex;flex-wrap:wrap;gap:4px;padding:0 2px}._ms_chip{font-size:12px;line-height:18px;padding:2px 9px;border-radius:999px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);cursor:pointer}._ms_chip:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_chipActive{background:var(--dsw-static-brand-blue-600,#3964fe);border-color:var(--dsw-static-brand-blue-600,#3964fe);color:#fff}._ms_searchBadge{display:inline-flex;align-items:center;gap:2px;margin-left:6px;padding:0 5px;border-radius:6px;font-size:11px;line-height:16px;color:var(--dsw-static-brand-blue-600,#3964fe);background:rgba(57,100,254,.08);white-space:nowrap}._ms_manageBtn{flex:none;padding:3px 8px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);font-size:12px;line-height:18px;cursor:pointer;white-space:nowrap}._ms_manageBtn:hover{border-color:var(--dsw-static-brand-blue-600,#3964fe);color:var(--dsw-static-brand-blue-600,#3964fe)}._ms_managePanel{position:fixed;z-index:1001;width:min(420px,calc(100vw - 32px));max-height:min(560px,calc(100vh - 120px));display:flex;flex-direction:column;gap:8px;padding:10px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:12px;background:var(--dsw-alias-bg-module-platform,#fff);box-shadow:0 8px 24px rgba(0,0,0,.12);overflow-y:auto}._ms_field{display:flex;flex-direction:column;gap:3px}._ms_fieldLabel{font-size:12px;line-height:18px;font-weight:600;color:var(--dsw-alias-label-primary,#1f2329)}._ms_fieldInput{box-sizing:border-box;width:100%;padding:5px 8px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:8px;background:var(--dsw-alias-bg-module-field,#f7f8fa);color:var(--dsw-alias-label-primary,#1f2329);font-size:13px;line-height:20px}._ms_fieldInput:focus{outline:none;border-color:var(--dsw-static-brand-blue-600,#3964fe)}._ms_fieldHint{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary,#86909c)}._ms_confirm{margin-top:2px;padding:6px 8px;border-radius:8px;background:rgba(255,77,79,.06);color:#d4380d;font-size:12px;line-height:18px}._ms_confirmText{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#86909c)}._ms_btn{min-width:0;flex:none;padding:4px 12px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:8px;background:var(--dsw-alias-bg-module-field,#f7f8fa);color:var(--dsw-alias-label-primary,#1f2329);font-size:13px;line-height:20px;cursor:pointer}._ms_btn:hover{border-color:var(--dsw-static-brand-blue-600,#3964fe);color:var(--dsw-static-brand-blue-600,#3964fe)}._ms_btnPrimary{background:var(--dsw-static-brand-blue-600,#3964fe);border-color:var(--dsw-static-brand-blue-600,#3964fe);color:#fff}._ms_btnPrimary:hover{background:var(--dsw-static-brand-blue-500,#2e54c6);color:#fff}._ms_btn[disabled]{opacity:.6;cursor:not-allowed}._ms_presetList{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}._ms_presetRow{display:flex;align-items:center;gap:8px;padding:6px 8px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:8px;background:transparent}._ms_presetName{font-size:13px;line-height:20px;font-weight:600;color:var(--dsw-alias-label-primary,#1f2329);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_presetUrl{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary,#86909c);flex:none;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_footer{display:flex;justify-content:flex-end;gap:8px;padding:6px 0 2px;border-top:1px solid var(--dsw-alias-border-l1,#f0f1f3)}._ms_footer._ms_manageBtn{justify-content:flex-start}";
		const tagId = "dsh-client-ui-model-switcher/ModelSwitcher.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-client-ui-model-switcher";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var styles = {
			"root": "_ms_root",
			"trigger": "_ms_trigger",
			"panel": "_ms_panel",
			"head": "_ms_head",
			"title": "_ms_title",
			"current": "_ms_current",
			"warn": "_ms_warn",
			"err": "_ms_err",
			"status": "_ms_status",
			"list": "_ms_list",
			"group": "_ms_group",
			"groupName": "_ms_groupName",
			"groupHint": "_ms_groupHint",
			"row": "_ms_row",
			"active": "_ms_active",
			"modelName": "_ms_modelName",
			"modelId": "_ms_modelId",
			"check": "_ms_check",
			"empty": "_ms_empty",
			"providerTag": "_ms_providerTag",
			"failSummary": "_ms_failSummary",
			"groupBody": "_ms_groupBody",
			"chips": "_ms_chips",
			"chip": "_ms_chip",
			"chipActive": "_ms_chipActive",
			"msRoot": "_msRoot",
			"msTrigger": "_msTrigger",
			"msDisabled": "_msDisabled",
			"msPopover": "_msPopover",
			"msList": "_msList",
			"msRow": "_msRow",
			"msActive": "_msActive",
			"msModelName": "_msModelName",
			"msModelId": "_msModelId",
			"msCheck": "_msCheck",
			"msEmpty": "_msEmpty",
			"msSwitch": "_msSwitch",
			"msBack": "_msBack",
			"msPList": "_msPList",
			"msPRow": "_msPRow",
			"msPActive": "_msPActive",
			"msPName": "_msPName",
			"searchBadge": "_ms_searchBadge",
			"manageBtn": "_ms_manageBtn",
			"managePanel": "_ms_managePanel",
			"field": "_ms_field",
			"fieldLabel": "_ms_fieldLabel",
			"fieldInput": "_ms_fieldInput",
			"fieldHint": "_ms_fieldHint",
			"confirm": "_ms_confirm",
			"confirmText": "_ms_confirmText",
			"btn": "_ms_btn",
			"btnPrimary": "_ms_btnPrimary",
			"presetList": "_ms_presetList",
			"presetRow": "_ms_presetRow",
			"presetName": "_ms_presetName",
			"presetUrl": "_ms_presetUrl",
			"footer": "_ms_footer"
		};
		//#endregion
		/** Display name of the current provider (catalog name when advertised). */
		function providerName(groups, provider) {
			for (const group of groups) {
				if (group.id === provider) return group.name;
			}
			return provider;
		}
		/** Display name of one model route, falling back to its opaque id. */
		function modelName(groups, provider, model) {
			for (const group of groups) {
				if (group.id !== provider) continue;
				for (const entry of group.models) {
					if (entry.id === model) return entry.name;
				}
			}
			return model;
		}
		/** Read a nested value by path (settings profile lookup). */
		function getPath(value, path) {
			let cur = value;
			for (const key of path) {
				if (cur === void 0 || cur === null) return void 0;
				cur = cur[key];
			}
			return cur;
		}
		/**
		 * The complete selection one model row submits: the adapter-owned default
		 * effort of that exact model route, while re-picking the model already in
		 * force keeps the effort the user chose (the /model popup and the composer
		 * seat build the same selection — omitting effort would silently drop it).
		 */
		function selectionFor(current, provider, model) {
			const same = !!current && current.provider === provider && current.model === model.id;
			const reasoningEffort = same
				? (current.reasoningEffort !== void 0 ? current.reasoningEffort : model.reasoning && model.reasoning.defaultEffort)
				: (model.reasoning && model.reasoning.defaultEffort);
			return reasoningEffort === void 0
				? { provider, model: model.id }
				: { provider, model: model.id, reasoningEffort };
		}
		/** Display suffix for the current model's effort level, when the route declares one. */
		function effortLabel(groups, current) {
			if (!current) return void 0;
			for (const group of groups) {
				if (group.id !== current.provider) continue;
				for (const model of group.models) {
					if (model.id !== current.model) continue;
					const reasoning = model.reasoning;
					if (!reasoning) return void 0;
					const effort = current.reasoningEffort !== void 0 ? current.reasoningEffort : reasoning.defaultEffort;
					if (effort === void 0) return void 0;
					const named = reasoning.efforts.find((level) => level.id === effort);
					return named ? named.name : effort;
				}
			}
			return void 0;
		}
		/**
		 * The Remote namespace face. `ctx.remote` is the API client the client
		 * plugins share; older surfaces exposed it as `connection.api`.
		 */
		function remoteApi(scope) {
			try {
				const remote = scope.get("remote");
				if (remote) return remote;
			} catch (e) { /* fall through */ }
			try {
				const connection = scope.get("connection");
				return connection && connection.api ? connection.api : null;
			} catch (e) {
				return null;
			}
		}
		/**
		 * Which provider routes are actually usable: a registered route AND, when
		 * its settings profile names an apiKeyEnv ref, that credential configured
		 * (stored through the Models page or present in the environment). Routes
		 * with no key requirement (Ollama) count as usable. Null when the check is
		 * unavailable, which callers read as "do not filter".
		 *
		 * Wire shapes: `llm.listProviders()` → `{ id, name }[]`; the configurable
		 * directory → `{ provider, displayName, settingsNs, settingsPath }[]`;
		 * `settings.describe()` → `{ namespaces: [{ ns, value }] }`;
		 * `credentials.describe(refs: string[])` → `Record<ref, { configured }>`.
		 */
		async function usableProviders(api) {
			if (!api) return null;
			try {
				const [registered, directory, settingsResponse] = await Promise.all([
					api.llm.listProviders(),
					api.llm.listConfigurableProviders(),
					api.settings.describe()
				]);
				if (!registered.ok || !directory.ok || !settingsResponse.ok) return null;
				const active = new Set(registered.value.map((entry) => entry.id));
				const namespaces = new Map(settingsResponse.value.namespaces.map((view) => [view.ns, view]));
				const rows = directory.value.map((entry) => {
					const namespace = namespaces.get(entry.settingsNs);
					let apiKeyEnv;
					try {
						const profile = getPath(namespace && namespace.value, entry.settingsPath);
						if (profile && typeof profile.apiKeyEnv === "string" && profile.apiKeyEnv.length > 0) apiKeyEnv = profile.apiKeyEnv;
					} catch (e) { /* keep undefined */ }
					return { provider: entry.provider, active: active.has(entry.provider), apiKeyEnv };
				});
				const refs = [...new Set(rows.filter((row) => row.apiKeyEnv !== void 0).map((row) => row.apiKeyEnv))];
				let credentials = {};
				if (refs.length > 0) {
					const response = await api.credentials.describe(refs);
					if (response.ok) credentials = response.value;
				}
				const map = {};
				for (const row of rows) {
					if (!row.active) { map[row.provider] = false; continue; }
					if (row.apiKeyEnv === void 0) { map[row.provider] = true; continue; }
					map[row.provider] = !!(credentials[row.apiKeyEnv] && credentials[row.apiKeyEnv].configured === true);
				}
				return map;
			} catch (e) {
				return null;
			}
		}
		/**
		 * Search-preference memory, kept entirely local to the browser so it never
		 * touches Host settings (the connector has no per-model "search" toggle).
		 * Storage key is namespaced under this plugin to avoid any clash with Host
		 * config keys. Values: "on" stashes "web search on", "off" the inverse,
		 * "follow" means keep whatever the session already uses.
		 */
		var SEARCH_KEY = "dsh-client-ui-model-switcher/searchPref";
		function searchPref() {
			try {
				const raw = typeof localStorage !== "undefined" ? localStorage.getItem(SEARCH_KEY) : null;
				return raw === "on" || raw === "off" || raw === "follow" ? raw : "off";
			} catch (e) {
				return "off";
			}
		}
		function setSearchPref(value) {
			try {
				if (typeof localStorage !== "undefined") localStorage.setItem(SEARCH_KEY, value);
			} catch (e) { /* non-persistent is fine */ }
		}
		/** Turn a display name into a stable url-safe slug used as the settings key. */
		function slugKey(name) {
			if (!name) return "";
			return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "provider";
		}
		/** Full provider profile this plugin writes into Host settings (only-add). */
		function presetProfile(form) {
			return {
				displayName: form.displayName,
				apiKeyEnv: form.apiKeyEnv,
				api: "openai-completions",
				baseURL: form.baseURL,
				models: [{ id: form.model }]
			};
		}
		/**
		 * Persist a URL preset into global Host settings WITHOUT touching existing
		 * entries: a single op-set under `llm-pi-ai:providers.<key>`. The key never
		 * resolves an existing provider, so the write is strictly additive. The
		 * secret is stored separately via credentials.
		 */
		async function persistPreset(api, form) {
			const slug = slugKey(form.displayName);
			const profile = presetProfile(form);
			const response = await api.settings.mutate({
				ns: "llm-pi-ai",
				ops: [{ op: "set", path: ["providers", slug], value: profile }]
			});
			if (!response.ok) throw new Error(response.error && response.error.message ? response.error.message : "写入全局配置失败");
			if (form.apiKey) {
				const cred = await api.credentials.set({ ref: form.apiKeyEnv, value: form.apiKey });
				if (!cred.ok) throw new Error("密钥保存失败");
			}
			return { slug, profile };
		}
		/**
		 * Read-only model probe for a just-created URL preset: asks the connector
		 * to enumerate the models the base replies with, then, if any come back,
		 * broadens only the profile we just wrote (never touching another key).
		 * apiKey is passed in-memory for the probe only and never persisted.
		 */
		async function probeModels(api, form) {
			try {
				const resp = await api.llm.discoverModels({
					settingsNs: "llm-pi-ai",
					baseURL: form.baseURL,
					api: "openai-completions",
					apiKey: form.apiKey
				});
				if (resp && resp.ok && resp.value && Array.isArray(resp.value.models) && resp.value.models.length > 0) {
					const profile = presetProfile(form);
					profile.models = resp.value.models.map((m) => ({ id: m.id, name: m.name || m.id }));
					const slug = slugKey(form.displayName);
					await api.settings.mutate({
						ns: "llm-pi-ai",
						ops: [{ op: "set", path: ["providers", slug], value: profile }]
					});
					return { models: profile.models };
				}
			} catch (e) {
				/* probe is best-effort; the single declared model is already saved */
			}
			return { models: null };
		}
		/** Human text for the stored search preference ("on" | "off" | "follow"). */
		function searchPrefLabel(pref) {
			return pref === "on" ? "🔍 联网" : pref === "follow" ? "🔍 沿用上次" : "🔍 未联网";
		}
		/**
		 * Manage a custom "URL preset" entirely from the UI, then persist it to the
		 * global Host settings as an additive route. Safe-by-construction:
		 *  - every field is validated before the confirm screen appears;
		 *  - the confirm screen spells out that the write is additive only;
		 *  - the write is a single op-setting `llm-pi-ai:providers.<key>`, never
		 *    resolving an existing provider, so nothing that already exists changes;
		 *  - the secret goes to credentials, never into settings values.
		 */
		function UrlPresetForm({ api, onClose, onSaved }) {
			const [phase, setPhase] = react.useState("form");
			const [saving, setSaving] = react.useState(false);
			const [error, setError] = react.useState(null);
			const [form, setForm] = react.useState({ displayName: "", baseURL: "", apiKeyEnv: "", model: "", apiKey: "" });
			const set = (key) => (value) => setForm((f) => Object.assign({}, f, { [key]: value }));
			const validate = () => {
				if (!form.displayName.trim()) return "服务商名称必填";
				if (!/^https?:\/\/.+/.test(form.baseURL.trim())) return "接口地址须以 http:// 或 https:// 开头";
				if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(form.apiKeyEnv.trim())) return "凭据名须为合法环境变量名（如 MY_PROVIDER_API_KEY）";
				if (!form.model.trim()) return "模型 ID 必填";
				if (!form.apiKey) return "API Key 必填";
				return null;
			};
			const submit = () => {
				const err = validate();
				setError(err);
				if (!err) setPhase("confirm");
			};
			const confirmSave = () => {
				setSaving(true);
				setError(null);
				Promise.resolve()
					.then(() => persistPreset(api, form))
					.then(() => probeModels(api, form))
					.then(() => {
						setSaving(false);
						setPhase("done");
						if (typeof onSaved === "function") onSaved();
					})
					.catch((e) => {
						setSaving(false);
						setError(e && e.message ? e.message : "保存失败");
						setPhase("confirm");
					});
			};
			const fieldEl = (label, hint, value, onChange, type) => jsxs("div", { className: styles.field, children: [
				jsx("div", { className: styles.fieldLabel, children: label }),
				jsx("input", { type: type || "text", className: styles.fieldInput, value: value, placeholder: hint, onChange: (e) => onChange(e.target.value) }),
				hint ? jsx("div", { className: styles.fieldHint, children: hint }) : null
			]});
			return jsxs("div", { className: styles.managePanel, children: [
				jsxs("div", { className: styles.head, children: [
					jsx("span", { className: styles.title, children: "自定义接口预设" }),
					jsx("button", { type: "button", className: styles.manageBtn, onClick: onClose, children: "关闭" })
				] }),
				error ? jsx("div", { className: styles.err, children: error }) : null,
				phase === "done" ? jsx("div", { className: styles.status, children: "已写入全局配置（仅新增，未改动现有）。可关闭后，在列表中直接切换新服务商。" }) : null,
				phase === "form" ? jsxs(react.Fragment, { children: [
					fieldEl("服务商名称", "如 我的中转", form.displayName, set("displayName")),
					fieldEl("接口地址 baseURL", "https://api.example.com/v1", form.baseURL, set("baseURL")),
					fieldEl("凭据名（环境变量）", "MY_PROVIDER_API_KEY", form.apiKeyEnv, set("apiKeyEnv")),
					fieldEl("API Key", "sk-…", form.apiKey, set("apiKey"), "password"),
					fieldEl("默认模型 ID", "gpt-4o", form.model, set("model")),
					jsx("div", { className: styles.confirmText, children: "密钥仅存入凭据区，不外传；保存后仅新增此服务商，不动现有配置。" }),
					jsx("button", { type: "button", className: styles.btn + " " + styles.btnPrimary, onClick: submit, children: "下一步：确认" })
				] }) : null,
				phase === "confirm" ? jsxs(react.Fragment, { children: [
					jsx("div", { className: styles.confirm, children: "将写入全局配置（llm-pi-ai），仅新增、不改动现有：" + form.displayName + " @ " + form.baseURL }),
					jsxs("div", { className: styles.head, style: { justifyContent: "flex-end", gap: 8 }, children: [
						jsx("button", { type: "button", className: styles.btn, onClick: () => setPhase("form"), disabled: saving, children: "返回修改" }),
						jsx("button", { type: "button", className: styles.btn + " " + styles.btnPrimary, onClick: confirmSave, disabled: saving, children: saving ? "写入中…" : "确认写入" })
					] })
				] }) : null
			]});
		}
		/**
		 * Session-header action: one trigger + a fixed-position panel listing every
		 * configured provider group and its models. One click on a row submits the
		 * full provider/model selection through the shared ModelDirectory controller
		 * (the same one the /model popup and composer model seat use), so the host
		 * stays the single fact source and every surface shows the new selection.
		 */
		function ModelSwitcherAction({ available, loadDirectory, selectModel, subscribe, getSnapshot, loadUsable, api }) {
			// Defensive: the injected face is contractually present for session-scope
			// slots; render nothing if it is ever absent.
			if (!subscribe || !getSnapshot) return null;
			const [open, setOpen] = react.useState(false);
			const [selecting, setSelecting] = react.useState(null);
			const [panelPos, setPanelPos] = react.useState(null);
			const [usableMap, setUsableMap] = react.useState(null);
			const [manageOpen, setManageOpen] = react.useState(false);
			// Web-search preference shown in the panel footer. The Host exposes only
			// a single *globally configured* search provider (chosen at execution
			// time via ctx.web / config.searchProvider) and has no per-session or
			// per-conversation enable contract, so this chip is a plugin-local
			// pref: it remembers the last choice in this browser, and when the
			// settings surface is writable it mirrors that value into the plugin
			// namespace so it survives restarts (a known limitation, not a host
			// hook — see the docs block above SEARCH_KEY).
			const [searchMode, setSearchMode] = react.useState(() => searchPref());
			const triggerRef = react.useRef(null);
			const rootRef = react.useRef(null);
			const state = react.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
			react.useEffect(() => {
				if (!open) return;
				if (typeof loadDirectory === "function") loadDirectory();
				if (typeof loadUsable !== "function") return;
				// Re-check on every open: a key added in Settings must light the
				// provider up without a page reload, so the stale map is dropped
				// first and the fresh one replaces it when it lands.
				setUsableMap(null);
				let live = true;
				Promise.resolve()
					.then(loadUsable)
					.then((map) => { if (live) setUsableMap(map === void 0 ? null : map); })
					.catch(() => { /* keep the unfiltered list */ });
				return () => { live = false; };
			}, [open]);
			react.useEffect(() => {
				if (!open) return;
				const closeOutside = (event) => {
					if (!(event.target instanceof Node)) return;
					if (rootRef.current !== null && rootRef.current.contains(event.target)) return;
					setOpen(false);
				};
				document.addEventListener("pointerdown", closeOutside);
				return () => document.removeEventListener("pointerdown", closeOutside);
			}, [open]);
			const current = state && state.current ? state.current : null;
			const groups = state && state.groups ? state.groups : [];
			// Never let the usability filter empty the panel: a catalog group that
			// loaded at all is selectable, so filtering it away would leave the
			// user with no way to switch.
			const filteredGroups = usableMap === null ? groups : groups.filter((group) => usableMap[group.id] !== false);
			const visibleGroups = filteredGroups.length > 0 ? filteredGroups : groups;
			const [activeProvider, setActiveProvider] = react.useState(null);
			const activeId = visibleGroups.some((g) => g.id === activeProvider)
				? activeProvider
				: (current && visibleGroups.some((g) => g.id === current.provider)
					? current.provider
					: (visibleGroups.length > 0 ? visibleGroups[0].id : null));
			const activeGroup = visibleGroups.find((g) => g.id === activeId) || null;
			const pick = (provider, model) => {
				if (!available || selecting !== null || typeof selectModel !== "function") return;
				const key = provider + "/" + model.id;
				setSelecting(key);
				Promise.resolve(selectModel(selectionFor(current, provider, model))).then((ok) => {
					setSelecting(null);
					if (ok) setOpen(false);
				}).catch(() => {
					setSelecting(null);
				});
			};
			const openPanel = () => {
				if (open) { setOpen(false); return; }
				const rect = triggerRef.current ? triggerRef.current.getBoundingClientRect() : null;
				setPanelPos(rect ? { top: rect.bottom + 6, right: Math.max(8, window.innerWidth - rect.right) } : { top: 56, right: 24 });
				setOpen(true);
			};
			// Cycle on → follow → off (matching searchPrefLabel) and persist the
			// choice. localStorage keeps it live for this browser; when the Host
			// settings doc is writable we also push it under the plugin namespace
			// via the same only-add settings.mutate path the preset form uses, so
			// the choice really is durable across sessions.
			const cycleSearch = () => {
				const next = searchMode === "on" ? "follow" : (searchMode === "follow" ? "off" : "on");
				setSearchPref(next);
				setSearchMode(next);
				if (api && api.settings && typeof api.settings.mutate === "function") {
					api.settings.mutate({
						ns: "dsh-client-ui-model-switcher",
						ops: [{ op: "set", path: ["searchPref"], value: next }]
					}).catch(() => { /* non-persistent is fine */ });
				}
			};
			const onKeyDown = (event) => {
				if (event.key !== "Escape" || !open) return;
				event.preventDefault();
				setOpen(false);
				if (triggerRef.current) triggerRef.current.focus();
			};
			return jsxs("div", {
				ref: rootRef,
				className: styles.root,
				onKeyDown,
				children: [
					jsx("button", {
						ref: triggerRef,
						type: "button",
						className: styles.trigger,
						"aria-label": "一键切换服务商和模型",
						"aria-expanded": open,
						title: "一键切换服务商和模型",
						onClick: openPanel,
						children: jsx("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", children: [
							jsx("rect", { x: 2, y: 3, width: 12, height: 2, rx: 1, fill: "currentColor" }),
							jsx("rect", { x: 2, y: 7, width: 12, height: 2, rx: 1, fill: "currentColor" }),
							jsx("rect", { x: 2, y: 11, width: 12, height: 2, rx: 1, fill: "currentColor" }),
							jsx("circle", { cx: 5.5, cy: 4, r: 1.8, fill: "#fff", stroke: "currentColor", strokeWidth: 1.2 }),
							jsx("circle", { cx: 10.5, cy: 8, r: 1.8, fill: "#fff", stroke: "currentColor", strokeWidth: 1.2 }),
							jsx("circle", { cx: 7.5, cy: 12, r: 1.8, fill: "#fff", stroke: "currentColor", strokeWidth: 1.2 })
						] })
					}),
					open ? jsx("div", { className: styles.panel, style: panelPos, children: [
						jsxs("div", { className: styles.head, children: [
							jsx("span", { className: styles.title, children: "一键切换服务商 / 模型" }),
							!available ? jsx("span", { className: styles.warn, children: "该会话不支持切换" }) : null
						] }),
						jsx("div", { className: styles.current, children: current ? "当前：" + providerName(groups, current.provider) + " / " + modelName(groups, current.provider, current.model) + (effortLabel(groups, current) === void 0 ? "" : " · " + effortLabel(groups, current)) : "当前：未加载" }),
						state && state.routable === false ? jsx("div", { className: styles.warn, children: "当前服务商不可用，请切换" }) : null,
						state && (state.status === "loading" || state.status === "selecting") ? jsx("div", { className: styles.status, children: "加载中…" }) : null,
						state && state.error ? jsx("div", { className: styles.err, children: state.error }) : null,
						visibleGroups.length > 0 ? jsxs("div", { className: styles.groupBody, children: [
							jsx("div", { className: styles.chips, children: visibleGroups.map((group) => {
								const chipActive = activeId === group.id;
								return jsx("button", {
									type: "button",
									className: styles.chip + (chipActive ? " " + styles.chipActive : ""),
									"aria-pressed": chipActive,
									onClick: () => setActiveProvider(group.id),
									children: group.name + " " + group.models.length
								}, group.id);
							}) }),
							activeGroup && activeGroup.models.length > 0 ? jsx("div", { className: styles.list, children: activeGroup.models.map((model) => {
								const active = !!current && current.provider === activeGroup.id && current.model === model.id;
								const busy = selecting === activeGroup.id + "/" + model.id;
								return jsx("button", {
									type: "button",
									className: styles.row + (active ? " " + styles.active : ""),
									disabled: selecting !== null,
									onClick: () => pick(activeGroup.id, model),
									children: [
										jsx("span", { className: styles.modelName, children: model.name }),
										jsx("span", { className: styles.modelId, children: model.id }),
										active ? jsx("span", { className: styles.check, children: "✓" }) : (busy ? jsx("span", { className: styles.check, children: "…" }) : null)
									]
								}, activeGroup.id + "/" + model.id);
							}) }) : jsx("div", { className: styles.empty, children: "该服务商暂无模型" })
						] }) : (state && state.status !== "loading" ? jsx("div", { className: styles.empty, children: "暂无已配置可用的服务商——在「设置 → 模型」里给服务商填 key 后自动出现" }) : null),
						visibleGroups.length === 0 && state && state.failures && state.failures.length > 0 ? jsx("div", { className: styles.failSummary, children: "缺 key 的服务商：" + state.failures.map((f) => f.name).join("、") }) : null,
						jsx("div", { className: styles.footer, children: [
							jsx("button", {
								type: "button",
								className: styles.searchBadge,
								onClick: cycleSearch,
								"aria-pressed": searchMode !== "off",
								title: "联网搜索偏好（插件本地设置；Host 仅有全局 searchProvider，无逐会话开关）",
								children: searchPrefLabel(searchMode)
							}),
							jsx("button", {
								type: "button",
								className: styles.manageBtn,
								onClick: () => setManageOpen(!manageOpen),
								"aria-expanded": manageOpen,
								children: "＋ 自定义接口预设"
							})
						] }),
						manageOpen ? jsx(UrlPresetForm, {
							api,
							onClose: () => setManageOpen(false),
							onSaved: () => {
								if (typeof loadUsable === "function") {
									setUsableMap(null);
									Promise.resolve(loadUsable()).then((map) => { if (map !== void 0) setUsableMap(map); }).catch(() => {});
								}
							}
						}) : null
					] }) : null
			]
		});
		}

		/**
		 * Native model seat replacement: shows the current model; clicking opens
		 * a popover with the current provider's models and a "切换服务商" option
		 * to switch to another provider. Same modelDirectories controller as the
		 * header panel, so changes are reflected everywhere.
		 */
		function RefinedModelSelect({ selectModel, subscribe, getSnapshot, useSession }) {
			if (!subscribe || !getSnapshot) return null;
			const [open, setOpen] = react.useState(false);
			const [selecting, setSelecting] = react.useState(null);
			const [phase, setPhase] = react.useState("models");
			const [activeProvider, setActiveProvider] = react.useState(null);
			const rootRef = react.useRef(null);
			const state = react.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
			react.useEffect(() => {
				if (!open) return;
				const closeOutside = (event) => {
					if (!(event.target instanceof Node)) return;
					if (rootRef.current !== null && rootRef.current.contains(event.target)) return;
					setOpen(false);
				};
				document.addEventListener("pointerdown", closeOutside);
				return () => document.removeEventListener("pointerdown", closeOutside);
			}, [open]);
			const current = state && state.current ? state.current : null;
			const groups = state && state.groups ? state.groups : [];
			const activeId = activeProvider || (current ? current.provider : null) || (groups[0] && groups[0].id) || null;
			const activeGroup = groups.find((g) => g.id === activeId) || null;
			const pick = (provider, model) => {
				if (selecting !== null || typeof selectModel !== "function") return;
				setSelecting(provider + "/" + model.id);
				Promise.resolve(selectModel(selectionFor(current, provider, model))).then((ok) => {
					setSelecting(null);
					if (ok) { setOpen(false); setPhase("models"); }
				}).catch(() => { setSelecting(null); });
			};
			const effort = effortLabel(groups, current);
			const label = current ? (activeGroup ? activeGroup.name : current.provider) + " / " + modelName(groups, current.provider, current.model) + (effort === void 0 ? "" : " · " + effort) : "模型";
			return jsxs("div", { ref: rootRef, className: styles.msRoot, children: [
				jsx("button", { type: "button", className: styles.msTrigger, onClick: () => { setOpen(!open); setPhase("models"); }, children: label }),
				open ? jsx("div", { className: styles.msPopover, children: phase === "models" ? [
					activeGroup && activeGroup.models.length > 0
						? jsx("div", { className: styles.msList, children: activeGroup.models.map((model) => {
							const active = !!current && current.provider === activeGroup.id && current.model === model.id;
							const busy = selecting === activeGroup.id + "/" + model.id;
							return jsx("button", {
								type: "button",
								className: styles.msRow + (active ? " " + styles.msActive : ""),
								disabled: selecting !== null,
								onClick: () => pick(activeGroup.id, model),
								children: [
									jsx("span", { className: styles.msModelName, children: model.name }),
									jsx("span", { className: styles.msModelId, children: model.id }),
									active ? jsx("span", { className: styles.msCheck, children: "✓" }) : (busy ? jsx("span", { className: styles.msCheck, children: "…" }) : null)
								]
							}, activeGroup.id + "/" + model.id);
						}) })
						: jsx("div", { className: styles.msEmpty, children: "暂无模型" }),
					groups.length > 0 ? jsx("button", { type: "button", className: styles.msSwitch, onClick: () => setPhase("providers"), children: "切换服务商 →" }) : null
				] : [
					jsx("button", { type: "button", className: styles.msBack, onClick: () => setPhase("models"), children: "← 返回" }),
					groups.length > 0 ? jsx("div", { className: styles.msPList, children: groups.map((group) => {
						const active = current && current.provider === group.id;
						return jsx("button", {
							type: "button",
							className: styles.msPRow + (active ? " " + styles.msPActive : ""),
							onClick: () => { setActiveProvider(group.id); setPhase("models"); },
							children: [jsx("span", { className: styles.msPName, children: group.name }), active ? jsx("span", { className: styles.msCheck, children: "✓" }) : null]
						}, group.id);
					}) }) : jsx("div", { className: styles.msEmpty, children: "暂无可用服务商" })
				] }) : null
			]});
		}
		/**
		 * Client plugin body: register the header action and the compact model
		 * selector for the input bar right side. The modelDirectories service
		 * owns the per-session directory both entries and the existing /model
		 * + composer-seat selectors share, so a switch is reflected everywhere.
		 * @param ctx - client cordis context.
		 */
		function apply(ctx) {
			ctx.inject(["slots", "modelDirectories", "connection", "remote"], (scope) => {
				const models = scope.modelDirectories;
				let sessions = null;
				let api = null;
				try { sessions = scope.sessions; } catch (e) { /* optional */ }
				api = remoteApi(scope);
				scope.slots.inject("conversation.session.header.actions", () => scope.slots.register({
					name: "conversation.session.header.actions",
					id: "model-switcher",
					order: 25,
					inject: (sessionId) => {
						const directory = models.directoryFor(sessionId);
						const available = !sessions || sessions.subagentAddress(sessionId) === void 0;
						return {
							available,
							loadDirectory: () => { if (available) directory.load().catch(() => {}); },
							selectModel: (selection) => available ? directory.select(selection).then(() => true, () => false) : Promise.resolve(false),
							subscribe: directory.store.subscribe,
							getSnapshot: directory.store.getSnapshot,
							loadUsable: () => usableProviders(api),
							api
						};
					},
				}, ModelSwitcherAction));
				scope.slots.inject("conversation.input.right", () => scope.slots.register({
					name: "conversation.input.right",
					id: "refined-model-select",
					order: 30,
					inject: (sessionId) => {
						const directory = models.directoryFor(sessionId);
						return {
							selectModel: (selection) => directory.select(selection).then(() => true, () => false),
							subscribe: directory.store.subscribe,
							getSnapshot: directory.store.getSnapshot
						};
					}
				}, RefinedModelSelect));
			});
		}
		exports.apply = apply;
		exports.inject = ["slots", "modelDirectories", "connection", "remote"];
		return module.exports;
	}
});
