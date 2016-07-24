## Execution Context Stack 执行上下文栈
1. (1) 当开始执行js时，首先会压入全局的执行上下文
|Execution Context Stack|
|-|
|Global Execution Context|
(2)每当有function(fun1)被执行时，就会产生一个新的上下文，这一上下文会被压入Js的上下文堆栈（context stack）中
|Execution Context Stack|
|-|
|Execution Context fun1|
|Global Execution Context|
(3)function执行结束后则被弹出
|Execution Context Stack|
|-|
|Global Execution Context|
2. Js解释器总是在栈顶上下文(active execution context)中执行。

## Execution context执行上下文
1. 执行上下文（简称上下文）决定了Js执行过程中可以获取哪些变量、函数、数据，一段程序可能被分割成许多不同的上下文。

2. EC主要有三个属性：
(1) 变量对象(variable object):存放变量，函数,声明和参数等信息
(vars,functions,declarations,arguments...)
(2) 作用域链(scope chain):变量对象(variable object)＋‘包含环境’的作用域(parent scopes） 


<br>
```
var x = 10;
function foo(x, y) {
    var z = 30;
    function bar() {}
}
foo(10, 20);
```

## 变量对象（Variable Object）

|Global VO||
|-|-|
|x|10|
|foo|function|

## 活动对象（Activation Object）
执行到foo(10, 20);
|Activation Object||
|-|-|
|x|10|
|y|20|
|arguments|{10,20}|
|z|30|
|bar|function|


## 作用域链 Scope Chain
1. 作用域链正是内部上下文所有变量对象（包括父变量对象）的列表。Scope chain = Activation object + [[Scope]]

## [[Scope]]
1. [[Scope]]是一个包含了所有上层变量对象(Variable Object)的分层链,它属于当前函数的上下文,在函数创建的时候,保存在函数中,并且只有函数创建的时候保存起来一次、并且一直都存在静态的(不变的),一直到函数销毁.
2. [Scope]]与Scope(作用域链)是不同的,前者是函数的属性,后者是上下文的属性.

## 函数的创建
1.函数创建的时候会获得一个[[scope]]属性
2. [[Scope]]是一个包含了所有上层变量对象(Variable Object)的分层链,它属于当前函数的上下文,在函数创建的时候,保存在函数中,并且只有函数创建的时候保存起来一次、并且一直都存在静态的(不变的),一直到函数销毁.
3. [Scope]]与Scope(作用域链)是不同的,前者是函数的属性,后者是上下文的属性.
```
var x = 10;
function a() {
  console.log(x);//10
}
function b () {
  var x = 5;
  a();
}
b(); 
```
a.[[scope]] = [globalContext.VO]
b.[[scope]] = [globalContext.VO]

## 函数被调用时
1. 在进入函数上下文,AO/VO创建之后,上下文的作用域链如此建立：
Scope = AO+[[Scope]]
AO会添加在作用域链的最前面

因此a()在执行时，它的作用域链为[aContext.AO,globalContext.VO]。


> http://dmitrysoshnikov.com/ecmascript/javascript-the-core/#execution-context

## ex
```
var x = 100;
function baz() {
  var x = 1;
  return {
    foo: function foo() { return ++x; },
    bar: function bar() { return --x; }
  };
}
 
var closures = baz();
 
console.log(closures.foo()); // 2
console.log(closures.bar()); // 1
```
foo()的作用域链为[fooContext.AO,bazContext.VO,globalContext.VO]<br>
bar()的作用域链为[barContext.AO,bazContext.VO,globalContext.VO]<br>
(在这里两人分享同一个bazContext.VO,因此x的值会变化)<br>

如果我们在function中定义新的function，同时将内层function作为值返回，那么内层function所包含的作用域链将会一起返回，即使内层function在其他上下文中执行，其内部的作用域链仍然保持着原有的数据，而当前的上下文可能无法获取原先外层function中的数据，使得function内部的作用域链被保护起来，从而形成“闭包”。
