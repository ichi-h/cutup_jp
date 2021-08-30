export const cutup = {
  srcText: "",
  splitPoint: { start: [""], end: [""], middle: [""] },
  lower: 0,
  upper: 0,

  init: function () {
    this.srcText = document.getElementById("src").value;
    this.splitPoint = {
      start: document.getElementById("start").value.split(","),
      end: document.getElementById("end").value.split(","),
      middle: document.getElementById("middle").value.split(","),
    };
    this.lower = parseInt(document.getElementById("lower").value);
    this.upper = parseInt(document.getElementById("upper").value);
  },

  manualInit: function (srcText, splitPoint, lower, upper) {
    this.srcText = srcText;
    this.splitPoint = splitPoint;
    this.lower = lower;
    this.upper = upper;
  },

  run: function () {
    if (this.lower > this.upper) {
      alert(
        "下限よりも上限の値の方が小さくなっています。\n上限の値の方が大きくなるよう設定してください。"
      );
      return;
    }
    console.log(this);
  },

  splitText: function () {},
};

window.cutup = function () {
  cutup.init();
  cutup.run();
};
