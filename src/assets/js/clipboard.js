import { popover } from "./popover";

// Copyボタンクリック時の挙動を追加
document.getElementById("copy").addEventListener(
  "click",
  () => {
    let text = document.getElementById("result").value;
    navigator.clipboard.writeText(text);
    popover("popover-copy", 2000);
  },
  false
);
