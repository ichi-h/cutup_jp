export const cutup = {
  init: function (props = undefined) {
    if (props !== undefined) {
      this.srcText = props.srcText;
      this.splitPoint = props.splitPoint;
      this.lower = props.lower;
      this.upper = props.upper;
      return;
    }

    this.srcText = document.getElementById("src").value;
    this.lower = parseInt(document.getElementById("lower").value);
    this.upper = parseInt(document.getElementById("upper").value);

    let start = document.getElementById("start").value.split(",");
    let end = document.getElementById("end").value.split(",");
    let middle = document.getElementById("middle").value.split(",");

    this.splitPoint = {};

    start.forEach((seg) => (this.splitPoint[seg] = 0));
    end.forEach((seg) => (this.splitPoint[seg] = 1));
    middle.forEach((seg, i) => (this.splitPoint[seg] = i + 2));
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
