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
		const css = "._ms_root{position:relative}._ms_trigger{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;border:1px solid transparent;background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);cursor:pointer}._ms_trigger:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_panel{position:fixed;z-index:1000;width:min(380px,calc(100vw - 32px));max-height:min(520px,calc(100vh - 120px));display:flex;flex-direction:column;gap:6px;padding:8px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:12px;background:var(--dsw-alias-bg-module-platform,#fff);box-shadow:0 8px 24px rgba(0,0,0,.12)}._ms_head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 2px}._ms_title{font-size:13px;font-weight:600;color:var(--dsw-alias-label-primary,#1f2329);line-height:20px}._ms_current{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary,#4e5969);padding:4px 8px;border-radius:8px;background:var(--dsw-alias-bg-module-field,#f7f8fa)}._ms_warn{font-size:12px;line-height:18px;color:#d4380d;padding:0 8px}._ms_err{font-size:12px;line-height:18px;color:#d4380d;padding:0 8px;white-space:pre-wrap}._ms_status{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#86909c);padding:0 8px}._ms_list{list-style:none;margin:0;padding:0;overflow-y:auto;display:flex;flex-direction:column;gap:8px}._ms_group{display:flex;flex-direction:column;gap:2px}._ms_groupName{font-size:12px;line-height:18px;font-weight:600;color:var(--dsw-alias-label-secondary,#4e5969);padding:2px 6px}._ms_groupHint{font-weight:400;color:var(--dsw-alias-label-tertiary,#86909c);font-size:11px}._ms_row{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;padding:6px 8px;border:1px solid transparent;border-radius:8px;background:transparent;color:var(--dsw-alias-label-primary,#1f2329);font-size:13px;line-height:20px;cursor:pointer;text-align:left}._ms_row:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_row:disabled{opacity:.55;cursor:default}._ms_active{border-color:var(--dsw-static-brand-blue-600,#3964fe);background:rgba(57,100,254,.06)}._ms_modelName{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_modelId{font-size:11px;color:var(--dsw-alias-label-tertiary,#86909c);max-width:45%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_check{color:var(--dsw-static-brand-blue-600,#3964fe);font-weight:700;flex:none}._ms_empty{padding:12px 8px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-tertiary,#86909c)}._ms_providerTag{flex:none;font-size:11px;line-height:16px;padding:1px 6px;border-radius:999px;background:var(--dsw-alias-bg-module-field,#f7f8fa);color:var(--dsw-alias-label-secondary,#4e5969);border:1px solid var(--dsw-alias-border-l2,#e5e6eb);max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_failSummary{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary,#86909c);padding:0 8px}._msRoot{display:inline-flex;position:relative}._msTrigger{font-size:12px;line-height:18px;padding:2px 8px;border-radius:6px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);cursor:pointer;white-space:nowrap;max-width:160px;overflow:hidden;text-overflow:ellipsis}._msTrigger:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._msDisabled{opacity:.5;cursor:default}._msPopover{position:absolute;bottom:calc(100% + 6px);right:0;z-index:1000;width:min(280px,calc(100vw - 32px));max-height:320px;overflow-y:auto;display:flex;flex-direction:column;gap:2px;padding:6px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:10px;background:var(--dsw-alias-bg-module-platform,#fff);box-shadow:0 8px 24px rgba(0,0,0,.12)}._msList{display:flex;flex-direction:column;gap:2px}._msRow{display:flex;align-items:center;gap:6px;width:100%;box-sizing:border-box;padding:5px 8px;border:1px solid transparent;border-radius:6px;background:transparent;color:var(--dsw-alias-label-primary,#1f2329);font-size:12px;line-height:18px;cursor:pointer;text-align:left}._msRow:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._msRow:disabled{opacity:.55;cursor:default}._msActive{border-color:var(--dsw-static-brand-blue-600,#3964fe);background:rgba(57,100,254,.06)}._msModelName{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._msModelId{font-size:11px;color:var(--dsw-alias-label-tertiary,#86909c);max-width:40%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._msCheck{color:var(--dsw-static-brand-blue-600,#3964fe);font-weight:700;flex:none;font-size:12px}._msEmpty{padding:8px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#86909c)}._msSwitch{font-size:12px;line-height:18px;padding:5px 8px;border:none;background:transparent;color:var(--dsw-static-brand-blue-600,#3964fe);cursor:pointer;text-align:left;border-radius:6px}._msSwitch:hover{background:rgba(57,100,254,.06)}._msBack{font-size:12px;line-height:18px;padding:5px 8px;border:none;background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);cursor:pointer;text-align:left;border-radius:6px;gap:4px;display:flex;align-items:center}._msBack:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._msPList{display:flex;flex-direction:column;gap:2px}._msPRow{display:flex;align-items:center;gap:6px;width:100%;box-sizing:border-box;padding:5px 8px;border:1px solid transparent;border-radius:6px;background:transparent;color:var(--dsw-alias-label-primary,#1f2329);font-size:12px;line-height:18px;cursor:pointer;text-align:left}._msPRow:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._msPActive{border-color:var(--dsw-static-brand-blue-600,#3964fe);background:rgba(57,100,254,.06)}._msPName{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._msGroupBody{display:flex;flex-direction:column;gap:6px}._ms_chips{display:flex;flex-wrap:wrap;gap:4px;padding:0 2px}._ms_chip{font-size:12px;line-height:18px;padding:2px 9px;border-radius:999px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);cursor:pointer}._ms_chip:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_chipActive{background:var(--dsw-static-brand-blue-600,#3964fe);border-color:var(--dsw-static-brand-blue-600,#3964fe);color:#fff}._ms_searchBadge{display:inline-flex;align-items:center;justify-content:flex-start;gap:5px;height:26px;min-width:82px;padding:0 9px;box-sizing:border-box;border-radius:8px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);font-family:inherit;font-size:12px;font-weight:500;line-height:18px;white-space:nowrap;cursor:pointer;transition:background-color .15s ease,border-color .15s ease,color .15s ease}._ms_searchBadge:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_searchBadge:active{transform:translateY(.5px)}._ms_searchBadge:focus-visible{outline:2px solid var(--dsw-static-brand-blue-600,#3964fe);outline-offset:1px}._ms_searchBadgeOn{border-color:var(--dsw-static-brand-blue-600,#3964fe);background:var(--dsw-static-brand-blue-600,#3964fe);color:#fff}._ms_searchBadgeOn:hover{background:#2f55e0;border-color:#2f55e0}._ms_searchBadgeFollow{border-color:var(--dsw-static-brand-blue-600,#3964fe);color:var(--dsw-static-brand-blue-600,#3964fe);background:transparent}._ms_searchBadgeFollow:hover{background:rgba(57,100,254,.08)}._ms_searchBadgeOff{color:var(--dsw-alias-label-tertiary,#86909c)}._ms_badgeIcon{flex:none;display:block;width:16px;height:16px}._ms_rowWrap{display:flex;align-items:center;gap:4px;border-radius:8px}._ms_rowWrap>._ms_row{flex:1 1 auto;min-width:0}._ms_rowWrap._ms_active{border:1px solid var(--dsw-static-brand-blue-600,#3964fe);background:rgba(57,100,254,.06)}._ms_rowWrap._ms_active>._ms_row{border-color:transparent;background:transparent}._ms_rowDelete{flex:none;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;padding:0;border:1px solid transparent;border-radius:8px;background:transparent;color:var(--dsw-alias-label-tertiary,#86909c);cursor:pointer;transition:background-color .15s ease,color .15s ease,border-color .15s ease}._ms_rowDelete:hover{color:#d4380d;border-color:#ffbb96;background:rgba(212,56,13,.06)}._ms_rowDelete:focus-visible{outline:2px solid #d4380d;outline-offset:1px}._ms_rowDelete>svg{width:16px;height:16px}._ms_rowDelete:disabled{opacity:.4;cursor:default}._ms_rowDelete:disabled:hover{color:var(--dsw-alias-label-tertiary,#86909c);border-color:transparent;background:transparent}._ms_tools{display:flex;gap:8px;padding:2px 2px 0}._ms_toolBtn{display:inline-flex;align-items:center;gap:5px;height:26px;padding:0 9px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);font-family:inherit;font-size:12px;font-weight:500;line-height:18px;white-space:nowrap;cursor:pointer;transition:background-color .15s ease,border-color .15s ease,color .15s ease}._ms_toolBtn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_toolBtn:focus-visible{outline:2px solid var(--dsw-static-brand-blue-600,#3964fe);outline-offset:1px}._ms_toolBtn:disabled{opacity:.55;cursor:default}._ms_toolBtnOn{border-color:var(--dsw-static-brand-blue-600,#3964fe);color:var(--dsw-static-brand-blue-600,#3964fe);background:rgba(57,100,254,.08)}._ms_toolIcon{flex:none;display:block;width:14px;height:14px}._ms_noticeOk{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary,#4e5969);padding:0 6px}._ms_noticeErr{font-size:12px;line-height:18px;color:#d4380d;padding:0 6px;white-space:pre-wrap}._ms_picker{display:flex;flex-direction:column;gap:6px;padding:8px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:10px;background:var(--dsw-alias-bg-module-field,#f7f8fa)}._ms_pickerHead{display:flex;align-items:baseline;justify-content:space-between;gap:8px}._ms_pickerTitle{font-size:12px;font-weight:600;color:var(--dsw-alias-label-primary,#1f2329)}._ms_pickerCount{font-size:11px;color:var(--dsw-alias-label-tertiary,#86909c)}._ms_pickerEmpty{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#86909c)}._ms_pickerSearch{width:100%;box-sizing:border-box;height:28px;padding:0 8px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:8px;background:var(--dsw-alias-bg-module-platform,#fff);color:var(--dsw-alias-label-primary,#1f2329);font-family:inherit;font-size:12px;line-height:18px}._ms_pickerSearch:focus{outline:2px solid var(--dsw-static-brand-blue-600,#3964fe);outline-offset:-1px}._ms_pickerList{max-height:180px;overflow-y:auto;display:flex;flex-direction:column;gap:2px}._ms_pickerRow{display:flex;align-items:center;gap:6px;padding:4px 6px;border-radius:6px;cursor:pointer}._ms_pickerRow:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_pickerRowOn{background:rgba(57,100,254,.08)}._ms_pickerBox{flex:none;margin:0;accent-color:var(--dsw-static-brand-blue-600,#3964fe);cursor:pointer}._ms_pickerName{flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;color:var(--dsw-alias-label-primary,#1f2329)}._ms_pickerId{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;color:var(--dsw-alias-label-tertiary,#86909c);text-align:right;padding-left:6px}._ms_pickerTag{flex:none;font-size:10px;line-height:14px;padding:0 5px;border-radius:999px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);color:var(--dsw-alias-label-tertiary,#86909c)}._ms_pickerCustomRow{display:flex;gap:6px;align-items:center}._ms_pickerAdd{flex:none;height:28px;padding:0 10px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);font-family:inherit;font-size:12px;cursor:pointer}._ms_pickerAdd:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_pickerAdd:disabled{opacity:.5;cursor:default}._ms_pickerChips{display:flex;flex-wrap:wrap;gap:4px}._ms_pickerChip{display:inline-flex;align-items:center;gap:4px;padding:1px 6px;border-radius:999px;border:1px solid var(--dsw-static-brand-blue-600,#3964fe);background:rgba(57,100,254,.08);color:var(--dsw-static-brand-blue-600,#3964fe);font-family:inherit;font-size:11px;line-height:16px;cursor:pointer}._ms_pickerChipCustom{border-style:dashed}._ms_pickerChipX{font-size:12px;line-height:14px}._ms_pickerActions{display:flex;justify-content:flex-end;gap:8px;padding-top:2px}._ms_pickerCommit{border-color:var(--dsw-static-brand-blue-600,#3964fe);background:var(--dsw-static-brand-blue-600,#3964fe);color:#fff}._ms_pickerCommit:hover:not(:disabled){background:#2f55e0;border-color:#2f55e0}._ms_manageBtn{flex:none;display:inline-flex;align-items:center;gap:5px;height:26px;padding:0 9px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);font-family:inherit;font-size:12px;font-weight:500;line-height:18px;cursor:pointer;white-space:nowrap;transition:background-color .15s ease,border-color .15s ease}._ms_manageBtn:hover{border-color:var(--dsw-static-brand-blue-600,#3964fe);color:var(--dsw-static-brand-blue-600,#3964fe)}._ms_managePanel{position:fixed;z-index:1001;width:min(420px,calc(100vw - 32px));max-height:min(560px,calc(100vh - 120px));display:flex;flex-direction:column;gap:8px;padding:10px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:12px;background:var(--dsw-alias-bg-module-platform,#fff);box-shadow:0 8px 24px rgba(0,0,0,.12);overflow-y:auto}._ms_field{display:flex;flex-direction:column;gap:3px}._ms_fieldLabel{font-size:12px;line-height:18px;font-weight:600;color:var(--dsw-alias-label-primary,#1f2329)}._ms_fieldInput{box-sizing:border-box;width:100%;padding:5px 8px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:8px;background:var(--dsw-alias-bg-module-field,#f7f8fa);color:var(--dsw-alias-label-primary,#1f2329);font-size:13px;line-height:20px}._ms_fieldInput:focus{outline:none;border-color:var(--dsw-static-brand-blue-600,#3964fe)}._ms_fieldHint{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary,#86909c)}._ms_confirm{margin-top:2px;padding:6px 8px;border-radius:8px;background:rgba(255,77,79,.06);color:#d4380d;font-size:12px;line-height:18px}._ms_confirmText{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#86909c)}._ms_btn{min-width:0;flex:none;padding:4px 12px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:8px;background:var(--dsw-alias-bg-module-field,#f7f8fa);color:var(--dsw-alias-label-primary,#1f2329);font-size:13px;line-height:20px;cursor:pointer}._ms_btn:hover{border-color:var(--dsw-static-brand-blue-600,#3964fe);color:var(--dsw-static-brand-blue-600,#3964fe)}._ms_btnPrimary{background:var(--dsw-static-brand-blue-600,#3964fe);border-color:var(--dsw-static-brand-blue-600,#3964fe);color:#fff}._ms_btnPrimary:hover{background:var(--dsw-static-brand-blue-500,#2e54c6);color:#fff}._ms_btn[disabled]{opacity:.6;cursor:not-allowed}._ms_presetList{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}._ms_presetRow{display:flex;align-items:center;gap:8px;padding:6px 8px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:8px;background:transparent}._ms_presetName{font-size:13px;line-height:20px;font-weight:600;color:var(--dsw-alias-label-primary,#1f2329);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_presetUrl{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary,#86909c);flex:none;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._ms_footer{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 0 2px;border-top:1px solid var(--dsw-alias-border-l1,#f0f1f3)}._ms_footer._ms_manageBtn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))}._ms_manageBtn:focus-visible{outline:2px solid var(--dsw-static-brand-blue-600,#3964fe);outline-offset:1px}";
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
			"searchBadgeOn": "_ms_searchBadgeOn",
			"searchBadgeFollow": "_ms_searchBadgeFollow",
			"searchBadgeOff": "_ms_searchBadgeOff",
			"badgeIcon": "_ms_badgeIcon",
			"rowWrap": "_ms_rowWrap",
			"rowDelete": "_ms_rowDelete",
			"tools": "_ms_tools",
			"toolBtn": "_ms_toolBtn",
			"toolBtnOn": "_ms_toolBtnOn",
			"toolIcon": "_ms_toolIcon",
			"noticeOk": "_ms_noticeOk",
			"noticeErr": "_ms_noticeErr",
			"picker": "_ms_picker",
			"pickerHead": "_ms_pickerHead",
			"pickerTitle": "_ms_pickerTitle",
			"pickerCount": "_ms_pickerCount",
			"pickerEmpty": "_ms_pickerEmpty",
			"pickerSearch": "_ms_pickerSearch",
			"pickerList": "_ms_pickerList",
			"pickerRow": "_ms_pickerRow",
			"pickerRowOn": "_ms_pickerRowOn",
			"pickerBox": "_ms_pickerBox",
			"pickerName": "_ms_pickerName",
			"pickerId": "_ms_pickerId",
			"pickerTag": "_ms_pickerTag",
			"pickerCustomRow": "_ms_pickerCustomRow",
			"pickerAdd": "_ms_pickerAdd",
			"pickerChips": "_ms_pickerChips",
			"pickerChip": "_ms_pickerChip",
			"pickerChipCustom": "_ms_pickerChipCustom",
			"pickerChipX": "_ms_pickerChipX",
			"pickerActions": "_ms_pickerActions",
			"pickerCommit": "_ms_pickerCommit",
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
		 * Call one Remote method that different DSH builds expose in two shapes:
		 * positionally (`mutate(ns, ops, rev)`, what the generated 0.2.x
		 * descriptors use) or as a single object (`mutate({ ns, ops })`).
		 *
		 * The shape is chosen from the callee's declared arity, never by
		 * trial: a positional call against a named-parameter method is not
		 * refused, it is silently accepted with the first argument read as the
		 * whole request, so a probe would write the wrong thing and report
		 * success. A single-declared parameter means the named shape; anything
		 * wider is the positional one.
		 */
		async function callRemote(fn, positional, named) {
			if (typeof fn !== "function") throw new Error("当前运行时不提供该接口");
			const arity = fn.length;
			const useNamed = named !== void 0 && arity <= 1;
			return useNamed ? fn(named) : fn.apply(null, positional);
		}
		/** Settings namespace every provider route this plugin edits lives in. */
		var LLM_NS = "llm-pi-ai";
		/**
		 * The writable provider table: `settings.describe()` resolves defaults,
		 * the composition base, and the user layer into one redacted value, so
		 * `value.providers.<key>.models` is the list the Host actually runs.
		 * Returns an empty object when the namespace is absent or read-only,
		 * which callers read as "this provider cannot be edited here".
		 */
		async function readProviderTable(api) {
			if (!api || !api.settings || typeof api.settings.describe !== "function") return {};
			const response = await api.settings.describe();
			if (!response || !response.ok || !response.value) return {};
			const namespaces = Array.isArray(response.value.namespaces) ? response.value.namespaces : [];
			const view = namespaces.find((entry) => entry && entry.ns === LLM_NS);
			if (!view || view.writable === false) return {};
			const providers = view.value && view.value.providers && typeof view.value.providers === "object" ? view.value.providers : {};
			const table = {};
			for (const key of Object.keys(providers)) {
				const profile = providers[key];
				if (!profile || typeof profile !== "object") continue;
				table[key] = {
					displayName: typeof profile.displayName === "string" ? profile.displayName : key,
					apiKeyEnv: typeof profile.apiKeyEnv === "string" ? profile.apiKeyEnv : void 0,
					models: Array.isArray(profile.models) ? profile.models : []
				};
			}
			return table;
		}
		/**
		 * Rewrite one provider's model list through a single path-addressed
		 * `set`. The whole array travels because the wire has no array-index
		 * `unset`: removing a middle row by index would leave a hole the
		 * schema then rejects. Every other field of the profile stays
		 * untouched, since the op names only `models`.
		 */
		async function writeProviderModels(api, providerKey, models) {
			const ops = [{ op: "set", path: ["providers", providerKey, "models"], value: models }];
			const response = await callRemote(api.settings.mutate, [LLM_NS, ops], { ns: LLM_NS, ops });
			if (!response || !response.ok) {
				const message = response && response.error && response.error.message ? String(response.error.message) : "写入模型列表失败";
				throw new Error(message);
			}
			return response;
		}
		/**
		 * The models a provider's endpoint currently advertises. `provider` alone
		 * is enough: the Host resolves the stored base URL, protocol, and
		 * credential for a configured route, so no secret ever rides the call.
		 * The result is a bare array in the generated descriptor; the older
		 * `{ models }` envelope is accepted too.
		 */
		async function fetchProviderCatalog(api, providerKey) {
			const request = { provider: providerKey };
			const response = await callRemote(api.llm.discoverModels, [LLM_NS, request], { settingsNs: LLM_NS, ...request });
			if (!response || !response.ok) {
				const message = response && response.error && response.error.message ? String(response.error.message) : "拉取模型列表失败";
				throw new Error(message);
			}
			const value = response.value;
			const list = Array.isArray(value) ? value : (value && Array.isArray(value.models) ? value.models : []);
			return list.filter((entry) => entry && typeof entry.id === "string" && entry.id.length > 0).map((entry) => ({
				id: entry.id,
				...(typeof entry.name === "string" && entry.name.length > 0 ? { name: entry.name } : {}),
				...(Array.isArray(entry.inputModalities) && entry.inputModalities.length > 0 ? { inputModalities: entry.inputModalities } : {})
			}));
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
		/** Short label for the search chip ("on" | "off" | "follow"). */
		function searchPrefLabel(pref) {
			return pref === "on" ? "联网" : pref === "follow" ? "沿用上次" : "未联网";
		}
		/** Full sentence for the chip's tooltip and accessible name: current state plus what the next click does. */
		function searchPrefHint(pref) {
			return pref === "on"
				? "联网搜索：开。点击切换为「沿用上次」。"
				: pref === "follow"
					? "联网搜索：沿用上次。点击切换为「离线」。"
					: "联网搜索：离线。点击切换为「开」。";
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
		 * Candidate checklist for one provider's model list. Shows what the
		 * endpoint advertises, pre-ticks the ids this profile lacks, and lets
		 * the user type an id the endpoint never mentions (relays routinely
		 * serve aliases that discovery omits). Nothing is written until the
		 * confirm button is pressed.
		 */
		function ModelPicker({ picker, query, custom, busy, onQuery, onCustom, onAddCustom, onUnpick, onToggle, onCommit, onCancel }) {
			const needle = query.trim().toLowerCase();
			const rows = picker.candidates.filter((entry) => {
				if (needle.length === 0) return true;
				return entry.id.toLowerCase().includes(needle) || (entry.name && entry.name.toLowerCase().includes(needle));
			});
			const knownIds = new Set(picker.existing.map((entry) => entry && entry.id));
			const pickedCount = picker.picked.length;
			return jsxs("div", { className: styles.picker, children: [
				jsxs("div", { className: styles.pickerHead, children: [
					jsx("span", { className: styles.pickerTitle, children: "选择要加入的模型" }),
					jsx("span", { className: styles.pickerCount, children: "已选 " + String(pickedCount) + " / 候选 " + String(picker.candidates.length) })
				] }),
				picker.empty ? jsx("div", { className: styles.pickerEmpty, children: "接口没有返回模型，可在下面手动填入 id。" }) : null,
				picker.candidates.length > 0 ? jsx("input", {
					type: "search",
					className: styles.pickerSearch,
					value: query,
					placeholder: "筛选候选模型…",
					"aria-label": "筛选候选模型",
					onChange: (event) => onQuery(event.target.value)
				}) : null,
				rows.length > 0 ? jsx("div", { className: styles.pickerList, children: rows.map((entry) => {
					const checked = picker.picked.includes(entry.id);
					const already = knownIds.has(entry.id);
					return jsx("label", {
						className: styles.pickerRow + (checked ? " " + styles.pickerRowOn : ""),
						title: already ? "已在列表里，勾选不会重复添加" : entry.id,
						children: [
							jsx("input", {
								type: "checkbox",
								className: styles.pickerBox,
								checked: checked,
								disabled: busy,
								onChange: () => onToggle(entry.id)
							}, "box"),
							jsx("span", { className: styles.pickerName, children: entry.name || entry.id }, "name"),
							jsx("span", { className: styles.pickerId, children: entry.id }, "id"),
							already ? jsx("span", { className: styles.pickerTag, children: "已有" }, "tag") : null
						]
					}, entry.id);
				}) }) : (picker.candidates.length > 0 ? jsx("div", { className: styles.pickerEmpty, children: "没有匹配的候选模型。" }) : null),
				jsxs("div", { className: styles.pickerCustomRow, children: [
					jsx("input", {
						type: "text",
						className: styles.pickerSearch,
						value: custom,
						placeholder: "或手动填入模型 id，例如 kimi-k2.6",
						"aria-label": "手动填入模型 id",
						disabled: busy,
						onChange: (event) => onCustom(event.target.value),
						onKeyDown: (event) => {
							if (event.key !== "Enter") return;
							event.preventDefault();
							onAddCustom();
						}
					}),
					jsx("button", {
						type: "button",
						className: styles.pickerAdd,
						disabled: busy || custom.trim().length === 0,
						onClick: onAddCustom,
						children: "添加"
					})
				] }),
				picker.picked.length > 0 ? jsx("div", { className: styles.pickerChips, children: picker.picked.map((id) => {
					const typed = picker.custom.includes(id);
					return jsx("button", {
						type: "button",
						className: styles.pickerChip + (typed ? " " + styles.pickerChipCustom : ""),
						disabled: busy,
						title: "移除",
						onClick: () => onUnpick(id),
						children: [jsx("span", { children: id }, "text"), jsx("span", { className: styles.pickerChipX, children: "×" }, "x")]
					}, "chip-" + id);
				}) }) : null,
				jsxs("div", { className: styles.pickerActions, children: [
					jsx("button", {
						type: "button",
						className: styles.toolBtn,
						disabled: busy,
						onClick: onCancel,
						children: "取消"
					}),
					jsx("button", {
						type: "button",
						className: styles.toolBtn + " " + styles.pickerCommit,
						disabled: busy || picker.picked.length === 0,
						onClick: onCommit,
						children: busy ? "写入中…" : "确认加入 " + String(picker.picked.length)
					})
				] })
			] });
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
			// Per-provider model maintenance. `editing` is the provider key whose
			// rows show delete affordances; `maintaining` is the provider key with
			// an update in flight; `notice` carries the last maintenance outcome
			// so a silent no-op never looks like success.
			const [editing, setEditing] = react.useState(null);
			const [maintaining, setMaintaining] = react.useState(null);
			const [notice, setNotice] = react.useState(null);
			// Two-stage model picking for the "update" action: the endpoint's
			// catalog is fetched first and shown as a checklist, so nothing is
			// written until the user confirms which ids to adopt. `picker` holds
			// the provider key, the fetched candidates, the chosen ids, and the
			// hand-typed ids the endpoint does not advertise.
			const [picker, setPicker] = react.useState(null);
			const [pickerQuery, setPickerQuery] = react.useState("");
			const [pickerCustom, setPickerCustom] = react.useState("");
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
			/** Reload the model directory after a settings write so the rows match what the Host now runs. */
			const refreshDirectory = () => {
				if (typeof loadDirectory === "function") {
					try { loadDirectory(); } catch (e) { /* directory reload is best-effort */ }
				}
			};
			/**
			 * Drop one model from a provider's stored list. The remaining rows
			 * are written as a whole array, so no index hole is left behind and
			 * the panel keeps every other field of that provider untouched.
			 */
			const removeModel = (providerKey, modelId) => {
				if (maintaining !== null) return;
				setMaintaining(providerKey);
				setNotice(null);
				Promise.resolve()
					.then(() => readProviderTable(api))
					.then((table) => {
						const profile = table[providerKey];
						if (!profile) throw new Error("该服务商不在可写的模型配置里");
						const remaining = profile.models.filter((entry) => entry && entry.id !== modelId);
						if (remaining.length === 0) throw new Error("不能删掉最后一个模型，请先在「设置 → 模型」里补一个");
						return writeProviderModels(api, providerKey, remaining);
					})
					.then(() => {
						setNotice({ tone: "ok", text: "已删除 " + modelId });
						refreshDirectory();
					})
					.catch((error) => {
						setNotice({ tone: "err", text: error && error.message ? String(error.message) : "删除失败" });
					})
					.then(() => { setMaintaining(null); });
			};
			/**
			 * Stage one of the update: ask the provider's endpoint what it serves
			 * and open a checklist of the ids this profile does NOT have yet.
			 * Nothing is written here; the user decides which ids to adopt, and
			 * can hand-type ids the endpoint does not advertise.
			 */
			const openPicker = (providerKey) => {
				if (maintaining !== null) return;
				setMaintaining(providerKey);
				setNotice(null);
				Promise.resolve()
					.then(() => Promise.all([fetchProviderCatalog(api, providerKey), readProviderTable(api)]))
					.then(([catalog, table]) => {
						const profile = table[providerKey];
						if (!profile) throw new Error("该服务商不在可写的模型配置里");
						const known = new Set(profile.models.map((entry) => entry && entry.id));
						const fresh = catalog.filter((entry) => !known.has(entry.id));
						setPickerQuery("");
						setPickerCustom("");
						setPicker({
							provider: providerKey,
							existing: profile.models,
							candidates: catalog,
							// Pre-tick everything new: the common case is "adopt what
							// the endpoint reports", and unticking is cheaper than
							// hunting for each new id.
							picked: fresh.map((entry) => entry.id),
							custom: [],
							empty: catalog.length === 0
						});
						if (catalog.length === 0) setNotice({ tone: "err", text: "接口没有返回任何模型，可手动填入模型 id" });
					})
					.catch((error) => {
						// A discovery refusal must not dead-end the action: open the
						// picker empty so the user can still type ids by hand.
						setPicker({ provider: providerKey, existing: [], candidates: [], picked: [], custom: [], empty: true });
						setNotice({ tone: "err", text: error && error.message ? String(error.message) : "拉取模型列表失败" });
					})
					.then(() => { setMaintaining(null); });
			};
			/** Add a hand-typed id to the picker (deduplicated against candidates). */
			const addCustomId = () => {
				const id = pickerCustom.trim();
				if (id.length === 0 || !picker) return;
				if (picker.picked.includes(id)) { setPickerCustom(""); return; }
				const isCandidate = picker.candidates.some((entry) => entry.id === id);
				if (isCandidate) {
					setPicker(Object.assign({}, picker, { picked: [...picker.picked, id] }));
				} else {
					setPicker(Object.assign({}, picker, { custom: [...picker.custom, id], picked: [...picker.picked, id] }));
				}
				setPickerCustom("");
			};
			/** Drop one id from the picker, whether it came from the catalog or was typed. */
			const unpick = (id) => {
				if (!picker) return;
				setPicker(Object.assign({}, picker, {
					picked: picker.picked.filter((entry) => entry !== id),
					custom: picker.custom.filter((entry) => entry !== id)
				}));
			};
			/**
			 * Stage two: append the chosen ids to the stored list and write it.
			 * Existing rows keep their order and their other fields, so this is
			 * purely additive; the only rewrite is the array the op names.
			 */
			const commitPicker = () => {
				if (!picker || maintaining !== null) return;
				const providerKey = picker.provider;
				const ids = picker.picked;
				if (ids.length === 0) {
					setNotice({ tone: "err", text: "至少选一个模型" });
					return;
				}
				setMaintaining(providerKey);
				setNotice(null);
				Promise.resolve()
					.then(() => readProviderTable(api))
					.then((table) => {
						const profile = table[providerKey];
						if (!profile) throw new Error("该服务商不在可写的模型配置里");
						const known = new Set(profile.models.map((entry) => entry && entry.id));
						const additions = ids.filter((id) => !known.has(id)).map((id) => {
							const hit = picker.candidates.find((entry) => entry.id === id);
							return hit ? hit : { id };
						});
						if (additions.length === 0) {
							setNotice({ tone: "ok", text: "选中的模型都已在列表里" });
							setPicker(null);
							return void 0;
						}
						return writeProviderModels(api, providerKey, [...profile.models, ...additions]).then(() => {
							setNotice({ tone: "ok", text: "已加入 " + String(additions.length) + " 个模型" });
							setPicker(null);
							refreshDirectory();
						});
					})
					.catch((error) => {
						setNotice({ tone: "err", text: error && error.message ? String(error.message) : "写入失败" });
					})
					.then(() => { setMaintaining(null); });
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
							activeGroup ? jsx("div", { className: styles.tools, children: [
								jsx("button", {
									type: "button",
									className: styles.toolBtn + (editing === activeGroup.id ? " " + styles.toolBtnOn : ""),
									"aria-pressed": editing === activeGroup.id,
									title: editing === activeGroup.id ? "退出删除模式" : "显示删除按钮，从该服务商里移除模型",
									onClick: () => {
										setNotice(null);
										setEditing(editing === activeGroup.id ? null : activeGroup.id);
									},
									children: [jsx("svg", { className: styles.toolIcon, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", "aria-hidden": "true", children: [jsx("line", { x1: 3.2, y1: 8, x2: 12.8, y2: 8 }, "bar")] }, "icon"), jsx("span", { children: editing === activeGroup.id ? "完成" : "删除模型" }, "label")]
								}),
								jsx("button", {
									type: "button",
									className: styles.toolBtn + (picker && picker.provider === activeGroup.id ? " " + styles.toolBtnOn : ""),
									disabled: maintaining !== null,
									title: "列出该服务商接口提供的模型，由你挑选后再写入",
									onClick: () => openPicker(activeGroup.id),
									children: [jsx("svg", { className: styles.toolIcon, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [jsx("path", { d: "M13.2 8a5.2 5.2 0 1 1-1.9-4" }, "arc"), jsx("path", { d: "M13.4 2.6v3.4h-3.4" }, "arrow")] }, "icon"), jsx("span", { children: maintaining === activeGroup.id ? "拉取中…" : "一键更新" }, "label")]
								})
							] }) : null,
							notice ? jsx("div", { className: notice.tone === "err" ? styles.noticeErr : styles.noticeOk, children: notice.text }) : null,
							picker && picker.provider === activeGroup.id ? jsx(ModelPicker, {
								picker,
								query: pickerQuery,
								custom: pickerCustom,
								busy: maintaining !== null,
								onQuery: setPickerQuery,
								onCustom: setPickerCustom,
								onAddCustom: addCustomId,
								onUnpick: unpick,
								onToggle: (id) => {
									if (picker.picked.includes(id)) unpick(id);
									else setPicker(Object.assign({}, picker, { picked: [...picker.picked, id] }));
								},
								onCommit: commitPicker,
								onCancel: () => { setPicker(null); setNotice(null); }
							}) : null,
							activeGroup && activeGroup.models.length > 0 ? jsx("div", { className: styles.list, children: activeGroup.models.map((model) => {
								const active = !!current && current.provider === activeGroup.id && current.model === model.id;
								const busy = selecting === activeGroup.id + "/" + model.id;
								const rowBusy = maintaining === activeGroup.id;
								const showDelete = editing === activeGroup.id;
								return jsx("div", {
									className: styles.rowWrap,
									children: [
										jsx("button", {
											type: "button",
											className: styles.row + (active ? " " + styles.active : ""),
											disabled: selecting !== null || rowBusy,
											onClick: () => pick(activeGroup.id, model),
											children: [
												jsx("span", { className: styles.modelName, children: model.name }),
												jsx("span", { className: styles.modelId, children: model.id }),
												active ? jsx("span", { className: styles.check, children: "✓" }) : (busy ? jsx("span", { className: styles.check, children: "…" }) : null)
											]
										}, activeGroup.id + "/" + model.id),
										showDelete ? jsx("button", {
											type: "button",
											className: styles.rowDelete,
											disabled: active || rowBusy || maintaining !== null,
											"aria-label": "删除模型 " + model.id,
											title: active ? "该模型正在使用，不能删除" : "从该服务商的模型列表里删除",
											onClick: () => removeModel(activeGroup.id, model.id),
											children: [jsx("svg", { viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", "aria-hidden": "true", children: [jsx("line", { x1: 3.2, y1: 8, x2: 12.8, y2: 8 }, "bar")] }, "icon")]
										}, "del-" + model.id) : null
									]
								}, activeGroup.id + "/" + model.id);
							}) }) : jsx("div", { className: styles.empty, children: "该服务商暂无模型" })
						] }) : (state && state.status !== "loading" ? jsx("div", { className: styles.empty, children: "暂无已配置可用的服务商——在「设置 → 模型」里给服务商填 key 后自动出现" }) : null),
						visibleGroups.length === 0 && state && state.failures && state.failures.length > 0 ? jsx("div", { className: styles.failSummary, children: "缺 key 的服务商：" + state.failures.map((f) => f.name).join("、") }) : null,
						jsx("div", { className: styles.footer, children: [
							jsx("button", {
								type: "button",
								className: styles.searchBadge + (searchMode === "on" ? " " + styles.searchBadgeOn : searchMode === "follow" ? " " + styles.searchBadgeFollow : " " + styles.searchBadgeOff),
								onClick: cycleSearch,
								"aria-pressed": searchMode !== "off", "aria-label": searchPrefHint(searchMode),
								title: searchPrefHint(searchMode),
								children: [jsx("svg", { className: styles.badgeIcon, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [jsx("circle", { cx: 8, cy: 8, r: 6.3 }, "globe"), jsx("ellipse", { cx: 8, cy: 8, rx: 3.1, ry: 6.3 }, "meridian"), jsx("line", { x1: 1.7, y1: 8, x2: 14.3, y2: 8 }, "equator")] }, "icon"), jsx("span", { children: searchPrefLabel(searchMode) }, "label")]
							}),
							jsx("button", {
								type: "button",
								className: styles.manageBtn,
								onClick: () => setManageOpen(!manageOpen),
								"aria-expanded": manageOpen,
								children: [jsx("svg", { className: styles.badgeIcon, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", "aria-hidden": "true", children: [jsx("line", { x1: 8, y1: 3.2, x2: 8, y2: 12.8 }, "v"), jsx("line", { x1: 3.2, y1: 8, x2: 12.8, y2: 8 }, "h")] }, "plus"), jsx("span", { children: "自定义接口预设" }, "label")]
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
