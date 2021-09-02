export const popover = (target) => {
  let elem = document.getElementById(target);
  elem.classList.add("is-show");
  setTimeout(() => elem.classList.remove("is-show"), 2000);
};
