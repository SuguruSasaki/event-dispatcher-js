カスタムイベント配信機能 自作EventDispatcherクラスを作る

### なぜ作るのか
自作クラスに実装する方法がわからなかったので、自作しました。最低限の実装ですが、ある程度使えるかなとおもいます。これがないとイベント処理は面倒なので個人的には必須な処理です。

### 今回のゴール
今回は、自作のクラスにイベント配信機能をつけるために、親クラスとしてEventDispatcherを用意します。
そして、小クラスで継承して使うところまで紹介します。

コードはGithub上にあります、[こちらをご参照ください](https://github.com/SuguruSasaki/event-dispatcher-js)。


### EventDispatcherを作る

必要な処理は、3つあります。「リスナーの登録」「イベントの発火」「リスナーの削除」。最低限これだけあればとりあえず大丈夫です。メソッド名は以下の通りです。

+ addEventLister
+ dispatchEvent
+ removeEventListener

実際に各実装を見ましょう
リスナーの登録処理です。プロパティの「listeners」は連想配列です。stateがイベント名です。イベント名をキーにして配列に登録します。

```EventDispatcher.js
// isCaptureはとりあえず用意しただけです。
function addEventListener(state, callback, isCapture){
   if(!this.listeners[state]) this.listeners[state] = [];
   this.listeners[state].push(callback);
}
```

次にリスナー削除です。
Array.some関数を使っていますが、このままでは重複したものが削除できないバグがあるようです。
[こちらを参照](http://qiita.com/_shimizu/items/b8eac14f399e20599818)ください。とりあえずはこのまま。

```EventDispatcher.js
function removeEventListener(state, callback){
   if(!this.listeners[state]) return;
     var self = this;
     this.listeners[state].some(function(v, i){
         if(v == callback) self.listeners.splice(i, 1);
     });
}
```

最後にイベントの発火処理、eはEventインスタンスです。dataはリスナーに渡す引数です。


```EventDispatcher.js

function dispatchEvent(e, data){
    var observers = this.listeners[e.type];
    for(var i = 0; i < observers.length; ++i){
        observers[i](data);
    }
}
```

これで完了です。

### 継承
今回は[Ajax通信するクラス](https://github.com/SuguruSasaki/event-dispatcher-js/blob/master/src/AjaxLoader.js)をサンプルで用意しています。
このAjaxLoaderはEventDispatcherを継承しています。
今回はこちらの情報を元に継承を実現しています。[参考サイト](https://gist.github.com/yoshimuraYuu/3301790)

```AjaxLoader.js
module.AjaxLoader.prototype = module.Inherit.inherit(module.EventDispatcher.prototype);
module.AjaxLoader.constructor = module.AjaxLoader;
```

イベントの発火処理は、下記のようにカスタムイベントを作成し実行します。

```AjaxLoader.js
var e = new Event("onLoadComplete");
this.dispatchEvent(e, data);
```


### サンプル
実際に使う場合は、以下のように使えます。<b>onLoadComplete</b>と<b>onLoadError</b>が今回発火させるカスタムイベントです。

```javascript
var loader = new module.AjaxLoader();
loader.addEventListener('onLoadComplete', onLoadComplete, false);
loader.addEventListener('onLoadError', onLoadError, false);
loader.load("ここにパスを渡します。");

// 読み込み完了時のコールバック
function onLoadComplete(data){
   console.log(data);
}

// 失敗時のコールバック
function onLoadError(){
   console.log(arguments);
}
```

