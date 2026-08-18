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
		const css = "._ms_root{position:relative}._ms_trigger{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;border:1px solid transparent;background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);cursor:pointer}._ms_trigger:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_panel{position:fixed;z-index:1000;width:min(380px,calc(100vw - 32px));max-height:min(520px,calc(100vh - 120px));display:flex;flex-direction:column;gap:6px;padding:8px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:12px;background:var(--dsw-alias-bg-module-platform,#fff);box-shadow:0 8px 24px rgba(0,0,0,.12)}._ms_head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 2px}._ms_title{font-size:13px;font-weight:600;color:var(--dsw-alias-label-primary,#1f2329);line-height:20px}._ms_current{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary,#4e5969);padding:4px 8px;border-radius:8px;background:var(--dsw-alias-bg-module-field,#f7f8fa)}._ms_warn{font-size:12px;line-height:18px;color:#d4380d;padding:0 8px}._ms_err{font-size:12px;line-height:18px;color:#d4380d;padding:0 8px;white-space:pre-wrap}._ms_status{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#86909c);padding:0 8px}._ms_list{list-style:none;margin:0;padding:0;overflow-y:auto;display:flex;flex-direction:column;gap:8px}._ms_group{display:flex;flex-direction:column;gap:2px}._ms_groupName{font-size:12px;line-height:18px;font-weight:600;color:var(--dsw-alias-label-secondary,#4e5969);padding:2px 6px}._ms_groupHint{font-weight:400;color:var(--dsw-alias-label-tertiary,#86909c);font-size:11px}._ms_row{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;padding:6px 8px;border:1px solid transparent;border-radius:8px;background:transparent;color:var(--dsw-alias-label-primary,#1f2329);font-size:13px;line-height:20px;cursor:pointer;text-align:left}._ms_row:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_row:disabled{opacity:.55;cursor:default}._ms_active{border-color:var(--dsw-static-brand-blue-600,#3964fe);background:rgba(57,100,254,.06)}._ms_modelName{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_modelId{font-size:11px;color:var(--dsw-alias-label-tertiary,#86909c);max-width:45%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_check{color:var(--dsw-static-brand-blue-600,#3964fe);font-weight:700;flex:none}._ms_empty{padding:12px 8px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-tertiary,#86909c)}._ms_providerTag{flex:none;font-size:11px;line-height:16px;padding:1px 6px;border-radius:999px;background:var(--dsw-alias-bg-module-field,#f7f8fa);color:var(--dsw-alias-label-secondary,#4e5969);border:1px solid var(--dsw-alias-border-l2,#e5e6eb);max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_failSummary{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary,#86909c);padding:0 8px}._msRoot{display:inline-flex;position:relative}._msTrigger{font-size:12px;line-height:18px;padding:2px 8px;border-radius:6px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);cursor:pointer;white-space:nowrap;max-width:160px;overflow:hidden;text-overflow:ellipsis}._msTrigger:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._msDisabled{opacity:.5;cursor:default}._msPopover{position:absolute;bottom:calc(100% + 6px);right:0;z-index:1000;width:min(280px,calc(100vw - 32px));max-height:320px;overflow-y:auto;display:flex;flex-direction:column;gap:2px;padding:6px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:10px;background:var(--dsw-alias-bg-module-platform,#fff);box-shadow:0 8px 24px rgba(0,0,0,.12)}._msList{display:flex;flex-direction:column;gap:2px}._msRow{display:flex;align-items:center;gap:6px;width:100%;box-sizing:border-box;padding:5px 8px;border:1px solid transparent;border-radius:6px;background:transparent;color:var(--dsw-alias-label-primary,#1f2329);font-size:12px;line-height:18px;cursor:pointer;text-align:left}._msRow:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._msRow:disabled{opacity:.55;cursor:default}._msActive{border-color:var(--dsw-static-brand-blue-600,#3964fe);background:rgba(57,100,254,.06)}._msModelName{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._msModelId{font-size:11px;color:var(--dsw-alias-label-tertiary,#86909c);max-width:40%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._msCheck{color:var(--dsw-static-brand-blue-600,#3964fe);font-weight:700;flex:none;font-size:12px}._msEmpty{padding:8px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#86909c)}._msSwitch{font-size:12px;line-height:18px;padding:5px 8px;border:none;background:transparent;color:var(--dsw-static-brand-blue-600,#3964fe);cursor:pointer;text-align:left;border-radius:6px}._msSwitch:hover{background:rgba(57,100,254,.06)}._msBack{font-size:12px;line-height:18px;padding:5px 8px;border:none;background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);cursor:pointer;text-align:left;border-radius:6px;gap:4px;display:flex;align-items:center}._msBack:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._msPList{display:flex;flex-direction:column;gap:2px}._msPRow{display:flex;align-items:center;gap:6px;width:100%;box-sizing:border-box;padding:5px 8px;border:1px solid transparent;border-radius:6px;background:transparent;color:var(--dsw-alias-label-primary,#1f2329);font-size:12px;line-height:18px;cursor:pointer;text-align:left}._msPRow:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._msPActive{border-color:var(--dsw-static-brand-blue-600,#3964fe);background:rgba(57,100,254,.06)}._msPName{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._msGroupBody{display:flex;flex-direction:column;gap:6px}._ms_chips{display:flex;flex-wrap:wrap;gap:4px;padding:0 2px}._ms_chip{font-size:12px;line-height:18px;padding:2px 9px;border-radius:999px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);cursor:pointer}._ms_chip:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_chipActive{background:var(--dsw-static-brand-blue-600,#3964fe);border-color:var(--dsw-static-brand-blue-600,#3964fe);color:#fff}";
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
			"msPName": "_msPName"
		};
		//#endregion
		/** Display name of the current provider (catalog name when advertised). */
		function providerName(groups, provider) {
			for (const group of groups) {
				if (group.id === provider) return group.name;
			}
			return provider;
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
		 * Which provider routes are actually usable: registered AND, when the
		 * profile names an apiKeyEnv ref, that credential is configured (stored
		 * via the Models page or present in the environment). Routes with no key
		 * requirement (Ollama) count as usable. Null when the check is unavailable.
		 */
		async function usableProviders(api) {
			if (!api) return null;
			try {
				const [providersResponse, settingsResponse] = await Promise.all([api.llm.providers({}), api.settings.describe({})]);
				if (!providersResponse.result.ok || !settingsResponse.result.ok) return null;
				const namespaces = new Map(settingsResponse.result.value.namespaces.map((view) => [view.ns, view]));
				const rows = providersResponse.result.value.providers.map((entry) => {
					const namespace = namespaces.get(entry.settingsNs);
					let apiKeyEnv;
					try {
						const profile = getPath(namespace && namespace.value, entry.settingsPath);
						if (profile && typeof profile.apiKeyEnv === "string" && profile.apiKeyEnv.length > 0) apiKeyEnv = profile.apiKeyEnv;
					} catch (e) { /* keep undefined */ }
					return { provider: entry.provider, active: entry.active, apiKeyEnv };
				});
				const refs = [...new Set(rows.filter((row) => row.apiKeyEnv !== void 0).map((row) => row.apiKeyEnv))];
				let credentials = {};
				if (refs.length > 0) {
					const response = await api.credentials.describe({ refs });
					if (response.result.ok) credentials = response.result.value.credentials;
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
		 * Session-header action: one trigger + a fixed-position panel listing every
		 * configured provider group and its models. One click on a row submits the
		 * full provider/model selection through the shared ModelDirectory controller
		 * (the same one the /model popup and composer model seat use), so the host
		 * stays the single fact source and every surface shows the new selection.
		 */
		function ModelSwitcherAction({ available, loadDirectory, selectModel, subscribe, getSnapshot, loadUsable }) {
			// Defensive: the injected face is contractually present for session-scope
			// slots; render nothing if it is ever absent.
			if (!subscribe || !getSnapshot) return null;
			const [open, setOpen] = react.useState(false);
			const [selecting, setSelecting] = react.useState(null);
			const [panelPos, setPanelPos] = react.useState(null);
			const [usableMap, setUsableMap] = react.useState(null);
			const triggerRef = react.useRef(null);
			const rootRef = react.useRef(null);
			const state = react.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
			react.useEffect(() => {
				if (open && typeof loadDirectory === "function") loadDirectory();
				if (open && typeof loadUsable === "function") loadUsable().then(setUsableMap);
				// eslint-disable-next-line react-hooks/exhaustive-deps
			}, [open]);
			react.useEffect(() => {
				if (!open) return;
				const closeOutside = (event) => {
					if (event.target instanceof Node && !rootRef.current.contains(event.target)) setOpen(false);
				};
				document.addEventListener("pointerdown", closeOutside);
				return () => document.removeEventListener("pointerdown", closeOutside);
			}, [open]);
			const current = state && state.current ? state.current : null;
			const groups = state && state.groups ? state.groups : [];
			const visibleGroups = usableMap === null
				? groups
				: groups.filter((group) => usableMap[group.id] !== false);
			const [activeProvider, setActiveProvider] = react.useState(null);
			const activeId = visibleGroups.some((g) => g.id === activeProvider)
				? activeProvider
				: (current && visibleGroups.some((g) => g.id === current.provider)
					? current.provider
					: (visibleGroups.length > 0 ? visibleGroups[0].id : null));
			const activeGroup = visibleGroups.find((g) => g.id === activeId) || null;
			const pick = (provider, model) => {
				if (!available || selecting !== null || typeof selectModel !== "function") return;
				const key = provider + "/" + model;
				setSelecting(key);
				Promise.resolve(selectModel({ provider, model })).then((ok) => {
					setSelecting(null);
					if (ok) setOpen(false);
				}).catch(() => {
					setSelecting(null);
				});
			};
			const openPanel = () => {
				const rect = triggerRef.current ? triggerRef.current.getBoundingClientRect() : null;
				setPanelPos(rect ? { top: rect.bottom + 6, right: Math.max(8, window.innerWidth - rect.right) } : { top: 56, right: 24 });
				setOpen(true);
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
						jsx("div", { className: styles.current, children: current ? "当前：" + providerName(groups, current.provider) + " / " + current.model : "当前：未加载" }),
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
									disabled: !available || selecting !== null,
									onClick: () => pick(activeGroup.id, model.id),
									children: [
										jsx("span", { className: styles.modelName, children: model.name }),
										jsx("span", { className: styles.modelId, children: model.id }),
										active ? jsx("span", { className: styles.check, children: "✓" }) : (busy ? jsx("span", { className: styles.check, children: "…" }) : null)
									]
								}, activeGroup.id + "/" + model.id);
							}) }) : jsx("div", { className: styles.empty, children: "该服务商暂无模型" })
						] }) : (state && state.status !== "loading" ? jsx("div", { className: styles.empty, children: "暂无已配置可用的服务商——在「设置 → 模型」里给服务商填 key 后自动出现" }) : null),
						visibleGroups.length === 0 && state && state.failures && state.failures.length > 0 ? jsx("div", { className: styles.failSummary, children: "缺 key 的服务商：" + state.failures.map((f) => f.name).join("、") }) : null
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
		function RefinedModelSelect({ available, directory, load, select, useSession }) {
			if (!directory || !load || !select) return null;
			const [open, setOpen] = react.useState(false);
			const [selecting, setSelecting] = react.useState(null);
			const [phase, setPhase] = react.useState("models");
			const [activeProvider, setActiveProvider] = react.useState(null);
			const rootRef = react.useRef(null);
			const state = react.useSyncExternalStore(directory.subscribe, directory.getSnapshot, directory.getSnapshot);
			react.useEffect(() => { if (open) load(); }, [open]); // eslint-disable-line
			react.useEffect(() => {
				if (!open) return;
				const closeOutside = (event) => {
					if (event.target instanceof Node && !rootRef.current.contains(event.target)) setOpen(false);
				};
				document.addEventListener("pointerdown", closeOutside);
				return () => document.removeEventListener("pointerdown", closeOutside);
			}, [open]);
			const current = state && state.current ? state.current : null;
			const groups = state && state.groups ? state.groups : [];
			const activeId = activeProvider || (current ? current.provider : null) || (groups[0] && groups[0].id) || null;
			const activeGroup = groups.find((g) => g.id === activeId) || null;
			const pick = (provider, model) => {
				if (selecting !== null || !available) return;
				setSelecting(provider + "/" + model);
				Promise.resolve(select({ provider, model })).then((ok) => {
					setSelecting(null);
					if (ok) { setOpen(false); setPhase("models"); }
				}).catch(() => { setSelecting(null); });
			};
			const label = current ? (activeGroup ? activeGroup.name : current.provider) + " / " + current.model : "模型";
			return jsxs("div", { ref: rootRef, className: styles.msRoot, children: [
				jsx("button", { type: "button", className: styles.msTrigger + (!available ? " " + styles.msDisabled : ""), disabled: !available, onClick: () => { setOpen(!open); setPhase("models"); }, children: label }),
				open ? jsx("div", { className: styles.msPopover, children: phase === "models" ? [
					activeGroup && activeGroup.models.length > 0
						? jsx("div", { className: styles.msList, children: activeGroup.models.map((model) => {
							const active = !!current && current.provider === activeGroup.id && current.model === model.id;
							const busy = selecting === activeGroup.id + "/" + model.id;
							return jsx("button", {
								type: "button",
								className: styles.msRow + (active ? " " + styles.msActive : ""),
								disabled: !available || selecting !== null,
								onClick: () => pick(activeGroup.id, model.id),
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
			ctx.inject(["slots", "modelDirectories", "connection"], (scope) => {
				const models = scope.modelDirectories;
				let sessions = null;
				let api = null;
				try { sessions = scope.sessions; } catch (e) { /* optional */ }
				try { api = scope.get("connection").api; } catch (e) { /* optional */ }
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
							loadUsable: () => usableProviders(api)
						};
					},
				}, ModelSwitcherAction));
				scope.slots.inject("conversation.input.model", () => scope.slots.register({
					name: "conversation.input.model",
					id: "refined-model-select",
					order: 0,
					inject: (sessionId) => {
						const directory = models.directoryFor(sessionId);
						const available = !sessions || sessions.subagentAddress(sessionId) === void 0;
						return {
							available,
							directory: directory.store,
							load: () => { if (available) directory.load().catch(() => {}); },
							select: (selection) => available ? directory.select(selection).then(() => true, () => false) : Promise.resolve(false)
						};
					}
				}, RefinedModelSelect));
			});
		}
		exports.apply = apply;
		exports.inject = ["slots", "modelDirectories", "connection"];
		return module.exports;
	}
});
