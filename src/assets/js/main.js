import TinySegmenter from "tiny-segmenter";
import { pipe } from "./pipe";

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

  splitText: function () {
    const createSegments = () => {
      let segmenter = new TinySegmenter();
      return segmenter.segment(this.srcText);
    };

    const createSentenceList = (i, value, head, list) => (segs) => {
      if (i === segs.length - 1) {
        return list.concat({
          value: value + segs[i],
          head: head,
          tail: 1,
        });
      }

      if (!this.splitPoint[segs[i]]) {
        return createSentenceList(i + 1, value + segs[i], head, list)(segs);
      }

      if (this.splitPoint[segs[i]] === 1) {
        return createSentenceList(
          i + 2,
          segs[i + 1],
          0,
          list.concat({
            value: value + segs[i],
            head: head,
            tail: 1,
          })
        )(segs);
      }

      return createSentenceList(
        i + 1,
        segs[i],
        this.splitPoint[segs[i]],
        list.concat({
          value: value,
          head: head,
          tail: this.splitPoint[segs[i]],
        })
      )(segs);
    };

    return pipe()(createSegments, createSentenceList(0, "", 0, []));
  },
};

window.cutup = function () {
  cutup.init();
  cutup.run();
};
