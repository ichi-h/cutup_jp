# cutup_jp

[![Build and deploy](https://github.com/ippee/cutup_jp/actions/workflows/deploy.yml/badge.svg)](https://github.com/ippee/cutup_jp/actions/workflows/deploy.yml)

日本語の文章をカットアップする Web アプリケーション。

![cutup_jp](imgs/cutup_jp.jpg)

## カットアップとは？

カットアップとは、既存の文章をバラバラに組み替えて、新しい文章を生成する創作手法です。

## 使用技術

- HTML
- JavaScript
  - MVU Architecture
- SCSS
  - SMACSS
- Other tools
  - Jest
  - parcel
  - prettier etc.

### MVU Architecture

cutup_jp は、**MVU Architecture** を採用しています。

MVU とは、"Model, View, Update" の略称であり、それぞれ以下のような役割を担っています。

- Model
  - アプリケーションの状態（ステート）の保持
- View
  - Model を HTML に反映
- Update
  - Model の更新

MVU Architecture では、クライアント側の何らかのアクションに応じて Model を更新し（Update）、その Model を HTML に反映する（View）といったサイクルの上でアプリケーションを構築します。

cutup_jp ではこの仕組みを Vanilla JS で構築し、DOM 操作の簡易的な最適化まで行っています。  
詳細は、[/src/assets/js/main.js](https://github.com/ippee/cutup_jp/blob/main/src/assets/js/main.js) をご覧ください。

### SMACSS

CSS の設計手法として、**SMACSS (Scalable and Modular Architecture for CSS)** を採用しています。

SMACSS では、"Base, Layout, Module, State, Theme" という 5 つのカテゴリを用いてスタイルを構築します。

- Base
  - ページ全体に適用されるデフォルトのスタイル
- Layout
  - ページのレイアウトの決定（主要コンポーネントの構築）
- Module
  - ページ内の個別のコンポーネントの構築
- State
  - レイアウトやモジュールのスタイル拡張
- There
  - UI の見た目の上書き・変更

cutup_jp では Base で CSS のリセットや基本的なスタイルの決定、Layout で大まかなレイアウトの構築、Module で再利用可能なモジュールの作成、といったスタンスで設計しています。  
また、State は必要となった Module と同じファイルに記述しています。  
一方、現状では There は使用していません。

詳細は、[/src/assets/scss](https://github.com/ippee/cutup_jp/blob/main/src/assets/scss) の各ファイルをご覧ください。

## 参考

- [Making cutup software](https://www.12kai.com/cutup/cumaking01.html)
- [はじめに · An Introduction to Elm](https://guide.elm-lang.jp/)
- [Pragmatic MVU With React And TypeScript](https://thomasbandt.com/model-view-update-with-react-and-typescript)
- [フック API リファレンス – React](https://ja.reactjs.org/docs/hooks-reference.html#usereducer)
- [Ja - Scalable and Modular Architecture for CSS](http://smacss.com/ja)
