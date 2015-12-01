$(function(exports) {
    exports.quad = exports.quad || {};
    var module = exports.quad;

    /**
     * Ajax loader
     *
     * @constructor
     */
    module.AjaxLoader = function(){
        this.listeners = {};
    };
    //-------------------------------------
    // Extend 継承処理
    //-------------------------------------
    module.AjaxLoader.prototype = module.Inherit.inherit(module.EventDispatcher.prototype);
    module.AjaxLoader.constructor = module.AjaxLoader;

    //-------------------------------------
    // Header
    //-------------------------------------
    module.AjaxLoader.prototype["onLoadComplete"]   = onLoadComplete;
    module.AjaxLoader.prototype["load"]             = load;
    module.AjaxLoader.prototype["onLoadFail"]       = onLoadFail;

    /**
     * 読み込み実行
     * @param path
     */
    function load(path){
        var _this = this;
        $.ajax({
            url: path,
            method: 'GET',
            cache: false,
            type: 'json'
        }).done(function(data, textStatus, jqXHR){
            trace(jqXHR.status);
            _this.onLoadComplete(data);
        }).fail(function(data, textStatus, errorThrown){
            _this.onLoadFail(arguments);
        });
        return this;
    }

    /**
     * 読み込み完了
     *
     * @param data
     */
    function onLoadComplete(data){
        var e = new Event("onLoadComplete");
        this.dispatchEvent(e, data);
    }

    /**
     * 読み込み失敗
     *
     * @param data
     */
    function onLoadFail(data){
        var e = new Event("onLoadError");
        this.dispatchEvent(e, data);
    }
});