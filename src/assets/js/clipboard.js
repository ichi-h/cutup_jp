import { popover } from "./popover";

document.getElementById("copy").addEventListener(
  "click",
  () => {
    let textarea = document.getElementById("result");
    textarea.select();
    document.execCommand("copy");
    popover("popover-copy");
  },
  false
);
