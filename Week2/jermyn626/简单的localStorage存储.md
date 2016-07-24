标签： JavaScriptLearning 

# 简单的localStorage存储 

## localStorage
- window对象
- key / value 对
  key : localStorage的属性
  value : 每个key对应的值（一个字符串）
 ```
 var str = '12345';
 window.localStorage.k='123';
 ```
 
- localStorage的使用
```
localStorage.a = 3; // 设置a为'3'
localStorage['a'] = 'sfsf'; // 设置a为'sfsf'，覆盖上面的值
localStorage.setItem('b','isaac'); // 设置b为'isaac'
var a1 = localStorage['a']; // 获取a的值
var a2 = localStorage.a; // 获取a的值
var b = localStorage.getItem('b'); // 获取b的值
localStorage.removeItem('c'); // 清除c的值
```
 
这里最推荐使用的自然是 `getItem()` 和 `setItem()`，清除键值对使用 `removeItem()` 。如果希望一次性清除所有的键值对，可以使用 `clear()` 。另外，HTML5还提供了一个 `key()` 方法，可以在不知道有哪些键值的时候使用，如下：

```
var storage = window.localStorage;
function showStorage(){
  for(var i = 0; i < storage.length; i++){
  // key(i)获得相应的键，再用getItem()方法获得对应的值
  storage.getItem(storage.key(i));
 }
}
```
## JSON
- JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。它基于ECMAScript的一个子集。

- JSON值
数字（整数或浮点数）
字符串（在双引号中）
逻辑值（true 或 false）
数组（在方括号中）
对象（在花括号中）
null

```
// 手动创建JSON对象
var JSONObject= {
'name':'Bill Gates',
'street':'Fifth Avenue New York 666',
'age':56,
'phone':'555 1234567'};

console.log(JSONObject.name); // Bill Gates
console.log(JSONObject.street); // Fifth Avenue New York 666
```

- JSON使用
JSON.stringify() // 转成JSON字符串
JSON.parse() // 将JSON字符串转成JSON对象

- JSON对象 与 JSON字符串
