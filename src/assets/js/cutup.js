import TinySegmenter from "tiny-segmenter";
import { pipe } from "./pipe";

export const cutup = {
  init: function (model) {
    this.src = model.src.replace(/\n/g, "");
    this.lower = model.lower;
    this.upper = model.upper;

    this.splitPoint = {};

    model.start.split(",").forEach((seg) => (this.splitPoint[seg] = 0));
    model.end.split(",").forEach((seg) => (this.splitPoint[seg] = 1));
    model.middle.split(",").forEach((seg, i) => (this.splitPoint[seg] = i + 2));
  },

  run: function () {
    if (this.lower > this.upper) {
      alert(
        "下限よりも上限の値の方が小さくなっています。\n上限の方が大きくなるよう設定してください。"
      );
      return;
    }

    if (this.src.length < this.lower) {
      alert("下限は入力された文章の文字数よりも小さくする必要があります。");
      return;
    }

    let sentences = this.splitText();
    let result = this.combineSentence(0, sentences, "");
    this.updateTextarea(result);
  },

  splitText: function () {
    const createSegments = () => {
      let segmenter = new TinySegmenter();
      return segmenter.segment(this.src);
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

  pickupSentence: function (target, sentences) {
    let selected = sentences.filter((sentence) => target === sentence.head);

    let i = Math.floor(Math.random() * selected.length);

    return selected[i];
  },

  combineSentence: function (target, sentences, result) {
    if (this.upper < result.length) {
      return this.combineSentence(0, sentences, "");
    }

    if (this.lower <= result.length && target === 0) {
      return result;
    }

    let sentence = this.pickupSentence(target, sentences);

    let newTarget = (target) => {
      if (target === 1) return 0;
      else return target;
    };

    return this.combineSentence(
      newTarget(sentence.tail),
      sentences,
      result + sentence.value
    );
  },

  updateTextarea: function (result) {
    let textarea = document.getElementById("result");
    textarea.value = result;
    return 0;
  },
};
