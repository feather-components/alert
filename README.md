Alert组件
=============================

###使用

Alert(content, [options/*额外参数，同dialog*/, ]callback, manualClose/*是否手动关闭*/)：同window.alert

Alert.confirm(content[, options], callback, manualClose): 同window.confirm

Alert.error()：失败

Alert.success()：成功

###Options

* extra： 额外需要对大家讲的话

```js
$.alert('hello', {
    extra: 'my name is jim green!',
    title: 'nice to meet you!'
})
```

###Event 同dialog组件

###Api 同dialog组件
 
###Example

```js
var alert = Alert('确定删除该微博么？', function(){
    console.log('点击了确认按钮');
}, true);

console.log(alert) //dialog对象

alert.getButton('确定').click(function(){
         console.log('直接在jquery上绑定的click事件触发了');
});

alert.on('close', function(){console.log('alert关闭了')});
```