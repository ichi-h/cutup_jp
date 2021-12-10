import TinySegmenter from "tiny-segmenter";

/**
 * 日本語のカットアップを行うクラス
 */
export class Cutup {
  /**
   * Cutupインスタンスの生成
   *
   * @param {String} src 入力された文章
   * @param {Object} splitPoint 区切り文字
   * @param {Object} limits 文章の上限/下限
   */
  constructor(src, splitPoint, limits) {
    this.src = src;
    this.splitPoint = splitPoint;
    this.limit = limits;
  }

  /**
   * modelからCutupインスタンスを生成
   *
   * @param {Object} model アプリケーションの状態
   * @return {Cutup} Cutupインスタンス
   */
  static newInstanceFromModel(model) {
    let src = model.src.replace(/\n/g, "");
    let limits = {
      lower: model.lower,
      upper: model.upper,
    };

    let start = model.start
      .split(",")
      .reduce((acc, seg) => ({ ...acc, [seg]: 0 }), {});
    let end = model.end
      .split(",")
      .reduce((acc, seg) => ({ ...acc, [seg]: 1 }), {});
    let middle = model.middle
      .split(",")
      .reduce((acc, seg, i) => ({ ...acc, [seg]: i + 2 }), {});

    let splitPoint = { ...start, ...end, ...middle };

    return new Cutup(src, splitPoint, limits);
  }

  /**
   * 文章の生成
   *
   * @return {String} カットアップされた文章
   */
  generateText() {
    this.checkProps();
    let sentences = this.splitText();
    return this.combineSentences(sentences);
  }

  /**
   * フィールド変数のチェック
   *
   * フィールド変数に適切な値が設定されていることを確認する。<br />
   * 不正な値が存在する場合、例外を送出する。
   */
  checkProps() {
    if (this.limit.upper < this.limit.lower) {
      throw Error(
        "下限よりも上限の値の方が小さくなっています。\n上限の方が大きくなるよう設定してください。"
      );
    }
  }

  /**
   * 入力された文章の分解
   *
   * 入力された文章をランダムに組み合わせられる形に変換する。
   *
   * はじめに文章はTinySegmenterによって分かち書きした後、
   * 区切り文字から次の区切り文字までを結合し、sentenceとして保存される
   * （詳しくは./cutup.test.jsの「文章の分割」を参照）。<br />
   *
   * sentenceにはvalue、head、tailの3つの情報が格納される。<br />
   * valueは結合された文字列、headはその文字列の先頭にあたる区切り文字の番号、
   * tailは次のsentenceに繋がる区切り文字の番号が格納される。
   *
   * @return {Array<Object>} sentenceの集合
   */
  splitText() {
    const createSegments = () => {
      let segmenter = new TinySegmenter();
      return segmenter.segment(this.src);
    };

    const createSentences = (
      segs,
      acc = [],
      curValue = "",
      curHead = 0,
      i = 0
    ) => {
      if (i === segs.length - 1) {
        return acc.concat({
          value: curValue + segs[i],
          head: curHead,
          tail: 0,
        });
      }

      if (!this.splitPoint[segs[i]]) {
        return createSentences(segs, acc, curValue + segs[i], curHead, i + 1);
      }

      if (this.splitPoint[segs[i]] === 1) {
        let newList = acc.concat({
          value: curValue + segs[i],
          head: curHead,
          tail: 0,
        });
        return createSentences(segs, newList, segs[i + 1], 0, i + 2);
      }

      let newList = acc.concat({
        value: curValue,
        head: curHead,
        tail: this.splitPoint[segs[i]],
      });
      return createSentences(
        segs,
        newList,
        segs[i],
        this.splitPoint[segs[i]],
        i + 1
      );
    };

    let segs = createSegments();
    return createSentences(segs);
  }

  /**
   * 指定されたheadを持つsentenceをランダムに選択する
   *
   * @param {Number} head 文頭の区切り文字
   * @param {Array<Object>} sents sentenceの集合
   * @return {Object} sentence
   */
  pickupSentence(sents, head) {
    let selected = sents.filter((sentence) => head === sentence.head);
    let i = Math.floor(Math.random() * selected.length);
    return selected[i];
  }

  /**
   * 複数のsentenceの値をランダムに組み合わせる
   *
   * headがprevTailと同じ値を持つsentenceを取得し、
   * そのvalueをresultに結合する操作を、下限を超えるまで繰り返す。<br />
   * 上限を超えた場合は、最初から試行をやり直す。
   *
   * @param {Array<Object>} sents sentenceの集合
   * @param {Number} prevTail 直前のセンテンスのtail
   * @param {String} result 生成された文章
   * @return {String} カットアップの生成結果
   */
  combineSentences(sents, prevTail = 0, result = "") {
    if (this.limit.upper < result.length) {
      return this.combineSentences(sents, 0, "");
    }

    if (this.limit.lower <= result.length && prevTail === 0) {
      return result;
    }

    let newSent = this.pickupSentence(sents, prevTail);
    let curTail = newSent.tail === 1 ? 0 : newSent.tail;
    return this.combineSentences(sents, curTail, result + newSent.value);
  }
}
