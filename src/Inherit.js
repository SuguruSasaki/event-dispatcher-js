$(function(exports) {
    exports.quad = exports.quad || {};
    var module = exports.quad;

    /**
     * JavaScriptで継承を実現するためのクラス
     * 正確には親クラスオブジェクトを格納し、プロトタイプチェーンぽくみせる方法らしい
     * こちらが元記事
     * https://gist.github.com/yoshimuraYuu/3301790
     *
     * @date    2015.11.13
     *
     * 使いかたは以下の通り
     * function f () { } // 親クラス
     * function F () { } // 子クラス
     *
     * F.prototype = inherit(f.prototype);
     * F.prototype.constructor = F;
     *
     */
    module.Inherit = function(){

    };

    module.Inherit.inherit = function(subClass){
        if (Object.create) {
            return Object.create(subClass);
        }
        function f() {};
        f.prototype = subClass;
        return new f();
    }

});