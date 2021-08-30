const cutup = () => {
  let srcText = document.getElementById("src").value;
  let start = document.getElementById("start").value.split(",");
  let end = document.getElementById("end").value.split(",");
  let middle = document.getElementById("middle").value.split(",");
  let lower = parseInt(document.getElementById("lower").value);
  let upper = parseInt(document.getElementById("upper").value);

  if (lower > upper) {
    alert(
      "下限よりも上限の値の方が小さくなっています。\n上限の値の方が大きくなるよう設定してください。"
    );
    return;
  }

  console.log(srcText, start, end, middle, lower, upper);
};

window.cutup = cutup;
