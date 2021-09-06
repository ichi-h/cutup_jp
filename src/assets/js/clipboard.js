import { useStateValue } from "./main";
import { popover } from "./popover";

/**
 * カットアップの結果をクリップボードにコピー
 */
const copyResult = () => {
  const result = useStateValue("result");
  navigator.clipboard.writeText(result);
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
