;(function(factory){
if(typeof define == 'function' && define.amd){
    //seajs or requirejs environment
    define(['jquery', 'dialog'], factory);
}else if(typeof module === 'object' && typeof module.exports == 'object'){
    module.exports = factory(
        require('jquery'),
        require('dialog')
    );
}else{
    window.jQuery.alert = factory(window.jQuery, window.jQuery.fn.dialog);
}
})(function($, Dialog){
var Alert = function(content, callback, manualClose, o){
    var options;

    if(typeof callback == 'object'){
        options = callback;
        callback = manualClose;
        unclose = o;
    }else{
        options = {};
    }

    return new Dialog($.extend({
        content: content + (options.extra ? '<p class="ui3-alert-extra">' + options.extra + '</p>' : ''),
        width: 400,
        autoOpen: true,
        className: 'ui3-alert',
        buttons: {
            '确定': function(){
                callback && callback();
                !manualClose && this.destroy();
            }
        }
    }, options || {}));
};


return Alert;

return $.alert = {
    alert: alert,

    warn: function(content, callback, unclose, opt){
        return this.alert('<div class="ui2-alert-warn">' + content + '</div>', callback, unclose, opt);
    },

    error: function(content, callback, unclose, opt){
        return this.alert('<div class="ui2-alert-error">' + content + '</div>', callback, unclose, $.extend({
            title: '错误'
        }, opt || {}));
    },

    success: function(content, callback, unclose, opt){
        return this.alert('<div class="ui2-alert-success">' + content + '</div>', callback, unclose, $.extend({
            title: '操作成功'
        }, opt || {}));
    },
    /**
     * 同浏览器默认的confirm 
     * content：显示内容
     * callback：确认后执行的函数
     * unclose：点击确认后不关闭
     * 
     * 当unclose为true时 可手动执行close或者destory方法关闭弹窗
     */
    confirm: function(content, callback, unclose, opt){
        return new Dialog($.extend({
            title: '提示',
            width: 400,
            content: '<div class="ui2-alert">' + content + '</div>',
            autoOpen: true,
            buttons: {
                '确定': {
                    events: {
                        click: function(){
                            callback();
                            !unclose && this.destroy();
                        }
                    },

                    className: 'ui2-alert-button-confirm'
                },

                '取消': {
                    events: {
                        click: function(){
                            this.destroy();
                        }
                    },

                    className: 'ui2-alert-button-cancel'
                }
            }
        }, opt || {}));
    }
};

});