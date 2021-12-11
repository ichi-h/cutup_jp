/**
 * ポップオーバーの表示
 *
 * 指定した時間の間、対象のポップオーバーを表示する
 *
 * @param {String} target 表示するポップオーバーのid
 * @param {Number} time 表示時間 (ms)
 */
export const popover = (target, time) => {
  let elem = document.getElementById(target);
  elem.classList.add("is-show");
  setTimeout(() => elem.classList.remove("is-show"), time);
};
