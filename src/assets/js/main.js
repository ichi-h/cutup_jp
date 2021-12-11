import { init, view } from "./mvu";
import { setOpenShareLinkHandler } from "./utils/share";

const main = () => {
  setOpenShareLinkHandler();

  view(init, Object.keys(init)); // viewの初期化
};

document.addEventListener("DOMContentLoaded", () => main(), false);
