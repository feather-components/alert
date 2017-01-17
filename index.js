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
function override(callback){
    return function(){
        var args = Array.prototype.slice.call(arguments);

        if(typeof args[1] != 'object'){
            args.splice(1, 0, {});
        }else if(!args[1]){
            args[1] = {};
        }

        return callback.apply(window, args);
    };
}

function alert(content, options, callback, manualClose){
    options.className = 'ui3-alert ' + (options.className || '');

    if(options.title){
        options.className += ' ui3-alert-hast';
    }

    return new Dialog($.extend({
        content: '<i class="ui3-alert-icon"></i>' + content + (options.extra ? '<p class="ui3-alert-extra">' + options.extra + '</p>' : ''),
        width: 400,
        autoOpen: true,
        className: 'ui3-alert',
        buttons: {
            '确定': function(){
                callback && callback();
                !manualClose && this.destroy();
            }
        }
    }, options));
}

var Alert = override(alert);

$.each(['error', 'success'], function(i, type){
    Alert[type] = override(function(content, options, callback, manualClose){
        options.className = 'ui3-alert-' + type;
        return alert(content, options, callback, manualClose);
    });
});

Alert.confirm = override(function(content, options, callback, manualClose){
    options.className = 'ui3-alert-confirm';
    options.buttons = {
        '确定': {
            events: {
                click: function(){
                    callback && callback();
                    !manualClose && this.destroy();
                }
            },

            className: 'ui3-alert-button-confirm'
        },

        '取消': {
            events: {
                click: function(){
                    this.destroy();
                }
            },

            className: 'ui3-alert-button-cancel'
        }
    };

    return alert(content, options, callback, manualClose);
});

return Alert;
});