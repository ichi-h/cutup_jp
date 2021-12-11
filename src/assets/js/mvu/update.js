import { view } from "./view";
import { Cutup } from "../cutup";

/**
 * modelの更新
 *
 * メッセージというクライアントの操作内容を元にmodelを更新する。
 * メッセージには "type" という属性があり、そこに具体的な操作内容が記述されている。<br />
 * modelの更新後、view関数によってその変更をUIに反映し、その戻り値を返却する。
 *
 * @param {Object} model アプリケーションの状態
 * @param {Object} msg メッセージ
 * @returns {any} view関数の戻り値
 */
export const update = (model) => (msg) => {
  // 更新後のmodelとUI更新に関連するステート名の取得
  let [newModel, targets] = (() => {
    switch (msg.type) {
      case "Change":
        return [{ ...model, [msg.target]: msg.newValue }, []];

      case "Cutup":
        let cutup = Cutup.newInstanceFromModel(model);
        return [{ ...model, result: cutup.generateText() }, ["result"]];

      default:
        throw Error("Received an unknown message.");
    }
  })();

  return view(newModel, targets);
};
