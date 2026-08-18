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
		const css = "._ms_root{position:relative}._ms_trigger{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;border:1px solid transparent;background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);cursor:pointer}._ms_trigger:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_panel{position:fixed;z-index:1000;width:min(380px,calc(100vw - 32px));max-height:min(520px,calc(100vh - 120px));display:flex;flex-direction:column;gap:6px;padding:8px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:12px;background:var(--dsw-alias-bg-module-platform,#fff);box-shadow:0 8px 24px rgba(0,0,0,.12)}._ms_head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 2px}._ms_title{font-size:13px;font-weight:600;color:var(--dsw-alias-label-primary,#1f2329);line-height:20px}._ms_current{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary,#4e5969);padding:4px 8px;border-radius:8px;background:var(--dsw-alias-bg-module-field,#f7f8fa)}._ms_warn{font-size:12px;line-height:18px;color:#d4380d;padding:0 8px}._ms_err{font-size:12px;line-height:18px;color:#d4380d;padding:0 8px;white-space:pre-wrap}._ms_status{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#86909c);padding:0 8px}._ms_list{list-style:none;margin:0;padding:0;overflow-y:auto;display:flex;flex-direction:column;gap:8px}._ms_group{display:flex;flex-direction:column;gap:2px}._ms_groupName{font-size:12px;line-height:18px;font-weight:600;color:var(--dsw-alias-label-secondary,#4e5969);padding:2px 6px}._ms_groupHint{font-weight:400;color:var(--dsw-alias-label-tertiary,#86909c);font-size:11px}._ms_row{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;padding:6px 8px;border:1px solid transparent;border-radius:8px;background:transparent;color:var(--dsw-alias-label-primary,#1f2329);font-size:13px;line-height:20px;cursor:pointer;text-align:left}._ms_row:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_row:disabled{opacity:.55;cursor:default}._ms_active{border-color:var(--dsw-static-brand-blue-600,#3964fe);background:rgba(57,100,254,.06)}._ms_modelName{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_modelId{font-size:11px;color:var(--dsw-alias-label-tertiary,#86909c);max-width:45%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_check{color:var(--dsw-static-brand-blue-600,#3964fe);font-weight:700;flex:none}._ms_empty{padding:12px 8px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-tertiary,#86909c)}._ms_providerTag{flex:none;font-size:11px;line-height:16px;padding:1px 6px;border-radius:999px;background:var(--dsw-alias-bg-module-field,#f7f8fa);color:var(--dsw-alias-label-secondary,#4e5969);border:1px solid var(--dsw-alias-border-l2,#e5e6eb);max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_failSummary{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary,#86909c);padding:0 8px}";
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
			"failSummary": "_ms_failSummary"
		};
		//#endregion
		/** Display name of the current provider (catalog name when advertised). */
		function providerName(groups, provider) {
			for (const group of groups) {
				if (group.id === provider) return group.name;
			}
			return provider;
		}
		/**
		 * Session-header action: one trigger + a fixed-position panel listing every
		 * configured provider group and its models. One click on a row submits the
		 * full provider/model selection through the shared ModelDirectory controller
		 * (the same one the /model popup and composer model seat use), so the host
		 * stays the single fact source and every surface shows the new selection.
		 */
		function ModelSwitcherAction({ available, loadDirectory, selectModel, subscribe, getSnapshot }) {
			// Defensive: the injected face is contractually present for session-scope
			// slots; render nothing if it is ever absent.
			if (!subscribe || !getSnapshot) return null;
			const [open, setOpen] = react.useState(false);
			const [selecting, setSelecting] = react.useState(null);
			const [panelPos, setPanelPos] = react.useState(null);
			const triggerRef = react.useRef(null);
			const rootRef = react.useRef(null);
			const state = react.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
			react.useEffect(() => {
				if (open && typeof loadDirectory === "function") loadDirectory();
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
						groups.length > 0 ? jsx("div", { className: styles.list, children: groups.flatMap((group) => group.models.map((model) => {
							const active = !!current && current.provider === group.id && current.model === model.id;
							const busy = selecting === group.id + "/" + model.id;
							return jsx("button", {
								type: "button",
								className: styles.row + (active ? " " + styles.active : ""),
								disabled: !available || selecting !== null,
								onClick: () => pick(group.id, model.id),
								children: [
									jsx("span", { className: styles.providerTag, children: group.name }),
									jsx("span", { className: styles.modelName, children: model.name }),
									jsx("span", { className: styles.modelId, children: model.id }),
									active ? jsx("span", { className: styles.check, children: "✓" }) : (busy ? jsx("span", { className: styles.check, children: "…" }) : null)
								]
							}, group.id + "/" + model.id);
						})) }) : (state && state.status !== "loading" ? jsx("div", { className: styles.empty, children: "暂无可用模型——请先在 设置 → 模型 中配置服务商" }) : null),
						state && state.failures && state.failures.length > 0 ? jsx("div", { className: styles.failSummary, children: state.failures.length + " 个服务商暂不可用（" + state.failures.map((f) => f.name).join("、") + "）——在「设置 → 模型」补 key 后自动亮起" }) : null
					] }) : null
			]
		});
		}
		/**
		 * Client plugin body: register the header action. The modelDirectories
		 * service owns the per-session directory both this entry and the existing
		 * /model + composer-seat selectors share, so a switch here is reflected
		 * everywhere and vice versa.
		 * @param ctx - client cordis context.
		 */
		function apply(ctx) {
			ctx.inject(["slots", "modelDirectories"], (scope) => {
				const models = scope.modelDirectories;
				let sessions = null;
				try { sessions = scope.sessions; } catch (e) { /* optional */ }
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
							getSnapshot: directory.store.getSnapshot
						};
					},
				}, ModelSwitcherAction));
			});
		}
		exports.apply = apply;
		exports.inject = ["slots", "modelDirectories"];
		return module.exports;
	}
});
