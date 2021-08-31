import TinySegmenter from "tiny-segmenter";

export class Cutup {
  constructor(model) {
    this.src = model.src.replace(/\n/g, "");
    this.lower = model.lower;
    this.upper = model.upper;

    this.splitPoint = {};

    model.start.split(",").forEach((seg) => (this.splitPoint[seg] = 0));
    model.end.split(",").forEach((seg) => (this.splitPoint[seg] = 1));
    model.middle.split(",").forEach((seg, i) => (this.splitPoint[seg] = i + 2));
  }

  generateText() {
    this.checkProps();
    let sentences = this.splitText();
    return this.combineSentences(sentences)(0, "");
  }

  checkProps() {
    if (this.upper < this.lower) {
      throw Error(
        "下限よりも上限の値の方が小さくなっています。\n上限の方が大きくなるよう設定してください。"
      );
    }

    if (this.src.length < this.lower) {
      throw Error(
        "下限は入力された文章の文字数よりも小さくする必要があります。"
      );
    }
  }

  splitText() {
    const createSegments = () => {
      let segmenter = new TinySegmenter();
      return segmenter.segment(this.src);
    };

    const createSentences = (segs) => (acc, value, head, i) => {
      const create = createSentences(segs);

      if (i === segs.length - 1) {
        return acc.concat({
          value: value + segs[i],
          head: head,
          tail: 1,
        });
      }

      if (!this.splitPoint[segs[i]]) {
        return create(acc, value + segs[i], head, i + 1);
      }

      if (this.splitPoint[segs[i]] === 1) {
        return create(
          acc.concat({
            value: value + segs[i],
            head: head,
            tail: 1,
          }),
          segs[i + 1],
          0,
          i + 2
        );
      }

      return create(
        acc.concat({
          value: value,
          head: head,
          tail: this.splitPoint[segs[i]],
        }),
        segs[i],
        this.splitPoint[segs[i]],
        i + 1
      );
    };

    let segs = createSegments();
    return createSentences(segs)([], "", 0, 0);
  }

  pickupSentences(target, sentences) {
    let selected = sentences.filter((sentence) => target === sentence.head);
    let i = Math.floor(Math.random() * selected.length);
    return selected[i];
  }

  combineSentences(sentences) {
    return (target, result) => {
      const combine = this.combineSentences(sentences);

      if (this.upper < result.length) {
        return combine(0, "");
      }

      if (this.lower <= result.length && target === 0) {
        return result;
      }

      let sentence = this.pickupSentences(target, sentences);
      let newTarget = (target) => {
        if (target === 1) return 0;
        else return target;
      };

      return combine(newTarget(sentence.tail), result + sentence.value);
    };
  }
}
