$(function(exports) {
    exports.quad = exports.quad || {};
    var module = exports.quad;

    /**
     * イベント機能をサブクラスに実装する
     *
     * @constructor
     */
    module.EventDispatcher = function(){
        this.listeners = {};
    };
    //---------------------------------------------
    // Header
    //---------------------------------------------
    module.EventDispatcher.prototype["addEventListener"]    = addEventListener;
    module.EventDispatcher.prototype["removeEventListener"] = removeEventListener;
    module.EventDispatcher.prototype["dispatchEvent"]       = dispatchEvent;

    /**
     * リスナー登録
     *
     * @param state
     * @param callback
     * @param isCapture
     */
    function addEventListener(state, callback, isCapture){
        if(!this.listeners[state]) this.listeners[state] = [];
        this.listeners[state].push(callback);
    }

    /**
     * リスナー削除。
     * TODO: 同じものが複数登録されている場合は、うまくいかない。
     */
    function removeEventListener(state, callback){
        if(!this.listeners[state]) return;
        var self = this;
        this.listeners[state].some(function(v, i){
            if(v == callback) self.listeners.splice(i, 1);
        });
    }

    /**
     * イベントの通知
     *
     * @param e
     * @param data
     */
    function dispatchEvent(e, data){
        var observers = this.listeners[e.type];
        for(var i = 0; i < observers.length; ++i){
            observers[i](data);
        }
    }

});
