import { init, view } from "./mvu";
import { openShareLink } from "./utils/share";

const main = () => {
  view(init, Object.keys(init)); // viewの初期化

  ["twitter", "facebook", "pocket"].forEach((target) => {
    document
      .getElementById(`share-${target}`)
      .addEventListener("click", () => openShareLink(target), false);
  });
};

document.addEventListener("DOMContentLoaded", () => main(), false);
