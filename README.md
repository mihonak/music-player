## node.js

バージョン v18.0.0

## テスト

[Jest](https://jestjs.io/ja/)を利用しています。\
コマンドラインから下記を実行するとテスト結果が返されます。

```
npm run test
```

（VSCodeでpackage.jsonを開き、"scripts"の直前に表示される「デバッグ」をクリックすることでも実行可）


## ドキュメント生成

[JSDoc](https://jsdoc.app/)を利用しています。\
コマンドラインから下記を実行すると、現在のソースコードを元にしたドキュメントが更新されます。

```
jsdoc src README.md -d docs
```
