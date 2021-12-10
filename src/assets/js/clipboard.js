import { popover } from "./popover";

/**
 * カットアップの結果をクリップボードにコピー
 */
export const copyResult = (value) => {
  navigator.clipboard.writeText(value);
  popover("popover-copy", 2000);
};
