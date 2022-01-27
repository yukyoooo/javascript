# サーバとAPI学習
[Library Application](./LibraryApplication)

## Http（HyperText Transfer Protocol）
- サーバとクライアント間でやりとりするための仕組み

## API（Application Programming Interface）
- 他のプログラムと繋がるプログラムの総称
- ほとんどのソフトウェアでは、プログラム間でデータを取得したり送信したりするために、APIを介して他のプログラムと通信する

## Web API
- APIにWebサービスを付与したもの。サービス提供者側でAPIを公開しておくことは、ソフトウェア開発者が提供側のソフトウェアやその機能を自社のアプリに組み込むことができるメリットがある

## JSON（JavaScript Object Notation）
- 人間でも読んだり、作成したりすることができるように考えられたデータフォーマットのことを指す
- key と value がセットになっていて、value の部分に文字列、数値、配列、連想配列（オブジェクト）などを含むことができる
```js
// JSONのドキュメンテーションを読みましょう。
// https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/JSON

// JSONはkeyとvalueによって構成されます。
const jsonString = `
    {
        "model": "Tesla X",
        "brand": "Tesla",
        "price": "$100k",
        "year": 2018
    }
`;

// JSON.parse()メソッドは文字列をJSONとして解析し、文字列によって記述されているJavaScriptの値やオブジェクトを構築します。
const car = JSON.parse(jsonString);

// carという変数とアクセス演算子を用いて、JSONのデータにアクセス
console.log(car.model);
console.log(car.year);
```

## fetch
- URL(リソース)とデータオブジェクト(初期データ)を受け取る非同期関数。関数が非同期であるということは、他の関数と同時に実行される
- 同期処理は上から下へ処理が行われるため、プログラムの途中にミスが有ると、以降の処理が止まってしまうリスクがある
- サーバ応答の間に他の関数を実行するため、fetch関数はPromiseオブジェクトというものを返す

## Promiseオブジェクト
- 非同期関数の処理が成功(resolved)または失敗(rejected)したことを知らせるオブジェクト
- 非同期関数の処理が成功すると、thenメソッドを使って、コールバック(入力として渡される関数)を取り込むことができる
- サーバからのレスポンスをJSONに変換するjsonメソッドがよく使われる
```js
const fetchPromiseRanInt = fetch('https://api.recursionist.io/random-integer');
// fetchが成功(resolved)か失敗(rejected)したか知らせる、Promiseオブジェクト
console.log(fetchPromiseRanInt);

// fetchに成功したら、then関数を実行
// コールバック関数にはresponseオブジェクトが渡されます。
const jsonResponse = fetchPromiseRanInt.then(function(response){
    // jsonメソッドはサーバーからのレスポンスをJSONに変換します。
    // jsonメソッドもpromiseオブジェクトを返します。(jsonに変換することに成功したか失敗したか)
    return response.json();
});

console.log(jsonResponse);

// データは自動的にこのPromiseに渡されます。
// このデータは、解析されたJSONデータです。
// JSONに変換されたら、then関数を実行
jsonResponse.then(function(data){
    console.log(data);
});
```

