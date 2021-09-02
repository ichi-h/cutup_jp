document.getElementById("copy").addEventListener(
  "click",
  () => {
    let textarea = document.getElementById("result");
    textarea.select();
    document.execCommand("copy");
  },
  false
);
