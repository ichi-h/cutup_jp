import { update } from "./update";
import { copyResult } from "../clipboard";

/**
 * modelをUIに反映
 *
 * targetsで指定されたステートと、modelが関連するイベントハンドラをUIに反映する。
 *
 * @param {Object} model アプリケーションの状態
 * @param {Array<String>} targets 対象のステート名
 */
export const view = (model, targets) => {
  // 各ステートの反映
  targets.forEach((stateName) => {
    document.querySelectorAll(`[state="${stateName}"]`).forEach((elem) => {
      switch (elem.tagName) {
        case "INPUT":
        case "TEXTAREA":
          elem.value = model[stateName];
        default:
          elem.innerText = model[stateName];
      }
    });
  });

  // イベントハンドラの登録
  const dispatch = update(model, view); // クライアント側の操作内容を発信する関数

  ["src", "start", "end", "middle", "lower", "upper"].forEach((stateName) => {
    document.getElementById(`form-${stateName}`).addEventListener(
      "input",
      (e) => {
        dispatch({
          type: "Change",
          target: stateName,
          newValue: e.currentTarget.value,
        });
      },
      false
    );
  });

  document.getElementById("form").onsubmit = () => {
    try {
      dispatch({ type: "Cutup" });
    } catch (e) {
      alert(e);
    }
    return false;
  };

  if (targets.includes("result")) {
    document
      .getElementById("copy")
      .addEventListener("click", () => copyResult(model.result), false);
  }
};
