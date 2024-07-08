<div align="center">
  <img src="public/title/suparhero-logo.png" width="480px">
</div>

<h1 align="center">⭐️ suparhero ⭐️</h1>

<div align="center">
  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</div>

<br>

<div align="center" style="display: flex; justify-content: center; gap: 16px">
  <img src="documents/images/sample-1.png" width="160px">
  <img src="documents/images/sample-2.png" width="160px">
  <img src="documents/images/sample-3.png" width="160px">
</div>

## 🎉 Overview

「**SUPARHERO**」は、[TextAlive App API](https://developer.textalive.jp/)を利用したリリックWebアプリケーションです。

「**[初音ミク「マジカルミライ 2024」プログラミング・コンテスト](https://magicalmirai.com/2024/procon)**」への応募作品であり、楽曲にはめろくる様の「[SUPERHERO](https://youtu.be/EWGe3KRc144?si=NThdqauxb9UbFPFJ)」を使用しています。

以下のリンクから、ぜひ本アプリケーションを試遊してみてください!!

- https://suparhero.vercel.app

## 📚 Concept

「SUPERHERO」における"**HERO**"は、レンくんが憧れた「[HERO](https://youtu.be/o4AxMk3SGUY?si=xZ5qTrWbCSxOxb3L)」に登場するような頼もしく心強い印象のヒーローとは異なり、自身の心の弱さや恐怖に立ち向かい、成長していく過程の中で見つかる"**HERO**"です。そのような楽曲の印象をそのまま感じれるようなWebアプリケーションにしようと考えました。

"**HERO**"になりたい意気込みが先行する心配性な部分を「リリックのタイプミス」で表現し、ユーザはレンくんが"**HERO**"なるためのサポートをするような立ち位置でアプリケーションをデザインしています。

レンくんが**本当のHERO**"(SUPERHERO)になれるよう、本アプリケーションを通じてお手伝いをしていだだけると幸いです!!

> [!NOTE]
> 楽曲の解釈などはあくまで個人の見解です。

## 📱 System requirements

MacOS、Windows、iOS、AndroidいずれのOSでも動作することを確認しています(iPadやタブレットなど端末でも動作することを確認しています)。

また、Chrome、Safari、Firefoxなどのブラウザごとの差異もありません。

## 🚀 Build & Deploy

以下のコマンドで、モジュールのインストールとビルドを行います。

```
$ npm install
$ npm run build
```

プロジェクトルートに生成される`out`ディレクトリを、静的ホスティングサービスにアップロードすることで、本Webアプリケーションをホストすることができます。

> [!NOTE]
> 以下のコマンドを実行することで、ローカル環境で直接Webアプリケーションを実行することもできます。
>
> ```
> $ npm run start
> ```

## 😤 Appeal Point

- 誤回答のパターンを数多く用意しており、ゲームが始まる度にレンくんが間違える単語や語彙がランダムに変わります。

- 「SUPERHERO」特有の日本語と英語が混じったリリックを、独自のパーサによってユーザが視認しやすくなるように改善しています。

- **Tailwind CSS**と**twMerge**によって、CSS管理の煩雑さを改善しつつ、場面によって容易にスタイルを変更できる柔軟さを持ち合わせたコンポーネント設計を行なっています。

- リリックの情報や画面遷移などを、propsを介さずグローバルに使えるようにするため、**Tanstack Query**と**useContext**を使用した状態管理を行なっています。

- **Framer Motion**でゲーム全般のアニメーションを制御しています。コンポーネント側にアニメーションの実装を移すことで、データ処理やレイアウトなどの関心事をなるべく分離しています。

## 🎨 Design

本アプリケーションのデザインやコンポーネントはFigmaで作成されています。

<div align="center">
  <img src="documents/images/figma-1.png" width="480px">
</div>

<br>

<div align="center">
  <img src="documents/images/figma-2.png" width="480px">
</div>

- 「SUPERHERO」の公式MVと雰囲気を統一するために、アメコミ調のUIを採用しています。

- フォントにはGoogle Fontsの`Rocknroll One`を使用しています。

## 🙇‍♂️ Special thanks

本アプリケーションは、以下の方々のご協力の元作成されています。本当にありがとうございました!!

- [**Kanon様**](https://x.com/kanonnot_)

  - とても可愛いリンちゃんとレンくんのイラストを書き下ろしていただきました!!

- [**OKUMONO様**](https://sozaino.site)

  - アメコミ調の背景や吹き出しなどの素材をお借りさせていただきました!!

また、このようなプログラミングコンテストの機会を下さったクリプトン・フューチャー・メディア株式会社様、および「SUPERHERO」の作曲者であるめろくる様にも、心より感謝いたします。
