import { popover } from "./popover";

document.getElementById("copy").addEventListener(
  "click",
  () => {
    let text = document.getElementById("result").value;
    navigator.clipboard.writeText(text);
    popover("popover-copy");
  },
  false
);
