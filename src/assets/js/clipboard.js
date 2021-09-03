import { popover } from "./popover";

/**
 * カットアップの結果をクリップボードにコピー
 */
const copyResult = () => {
  let text = document.getElementById("result").value;
  navigator.clipboard.writeText(text);
  popover("popover-copy", 2000);
};

document.addEventListener(
  "DOMContentLoaded",
  () => {
    document
      .getElementById("copy")
      .addEventListener("click", copyResult, false);
  },
  false
);
