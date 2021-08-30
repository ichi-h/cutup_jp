import { cutup } from "./main";

test("文章の分割", () => {
  let srcText = "隣の客はよく柿食う客だ";
  let splitPoint = {
    "「": 0,
    "（": 0,
    "。": 1,
    "」": 1,
    "）": 1,
    "？": 1,
    は: 2,
    へ: 3,
    を: 4,
    の: 5,
    で: 6,
    から: 7,
    に: 8,
    て: 9,
    が: 10,
    も: 11,
    "、": 12,
  };

  cutup.manualInit(srcText, splitPoint, 20, 30);

  let expected = [
    {
      value: "隣",
      head: 0,
      tail: 5,
    },
    {
      value: "の客",
      head: 5,
      tail: 2,
    },
    {
      value: "はよく柿食う客だ",
      head: 2,
      tail: 1,
    },
  ];

  expect(cutup.splitText()).toStrictEqual(expected);
});
