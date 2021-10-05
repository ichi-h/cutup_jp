# cutup_jp

[![Build and deploy](https://github.com/ippee/cutup_jp/actions/workflows/deploy.yml/badge.svg)](https://github.com/ippee/cutup_jp/actions/workflows/deploy.yml)

日本語の文章をカットアップする Web アプリケーション。

![cutup_jp](imgs/cutup_jp.jpg)

## カットアップとは？

カットアップとは、既存の文章をバラバラに組み替えて、新しい文章を生成する創作手法です。

## 使用技術

- HTML
- JavaScript
- Other tools
  - Jest
  - parcel
  - prettier etc.

## 使い方

- 入力
  - カットアップする文章。
- 出力
  - カットアップの結果を表示。
- Cutup!
  - 入力された文章をカットアップする。
- Copy
  - 出力結果をクリップボードに保存する。
- 詳細設定
  - 文頭
    - カットアップによって生成される文章の文頭として用いる文字・記号。
  - 文末
    - カットアップによって生成される文章の文末として用いる文字・記号。
    - 文末で指定した文字・記号の次にある文字は、自動的に文頭として設定される。
  - 文中
    - カットアップをする際の区切り文字となるポイント。
  - 文の長さ
    - 下限
      - 生成される文章の最小の長さ。
    - 上限
      - 生成される文章の最大の長さ。
      - 下限よりも小さい値を指定することはできない。
      - 下限と上限の幅が狭い場合、文章が生成されない場合がある。

## 参考

- [Making cutup software](https://www.12kai.com/cutup/cumaking01.html)
- [はじめに · An Introduction to Elm](https://guide.elm-lang.jp/)
- [Pragmatic MVU With React And TypeScript](https://thomasbandt.com/model-view-update-with-react-and-typescript)
- [フック API リファレンス – React](https://ja.reactjs.org/docs/hooks-reference.html#usereducer)
- [Ja - Scalable and Modular Architecture for CSS](http://smacss.com/ja)
