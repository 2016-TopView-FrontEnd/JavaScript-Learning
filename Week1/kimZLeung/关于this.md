## this
> this的四种绑定方法分别是：
- 默认绑定 (纯粹的函数调用)
- 隐式绑定 (作为对象方法的调用)
- 显式绑定 (apply(),call()调用，bind())
- new绑定 (作为构造函数调用)

> 默认绑定：这个是最简单的绑定,最常用的调用类型：独立函数调用
```
function foo() {
    console.log( this.a );
}
var a = 2;
foo();     // 2
```
> 但在严格模式下,默认绑定不起作用
```
function foo() {
    "use strict";
    console.log( this.a );
}
var a = 2;
foo(); // TypeError: `this` is `undefined`
```

---

> 隐式绑定：show code
```
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
obj.foo(); // 2
```
> this指向了obj,因为foo执行时的call-site（可以理解为调用时所在作用域）在obj上面。注意是运行的时候，和在哪里声明的没有关系。其实this只是指向了它的call-site。

> 关于call-site：call-site姑且理解为调用域，call-stack为调用栈。如下代码可以辅助我们理解
```
function baz() {
    // call-stack is: `baz`
    // so, our call-site is in the global scope
    console.log( "baz" );
    bar(); // <-- call-site for `bar`
}
```
> 在baz()中调用bar(),所以bar的调用域是baz，此时bar的调用栈只有baz；而baz本身暴露在全局作用域中，所以它的调用域则也在全局作用域中。(其实我还是不大懂，大概是如果是函数嵌套的情况就是默认调用嘛..里面多少层的调用域都可以认为是全局)。

> 隐式丢失：
```
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // function reference/alias!
var a = "oops, global"; // `a` also property on global object
bar(); // "oops, global"
```
> 全局调用bar()，相当于全局调用foo，这个时候打印出的是全局的a，也就是"oops, global"。所谓的隐式丢失也就是调用对象的方法时本质上变成了全局调用对象的方法，所以回到了全局调用函数的情况，变成了默认绑定，所以this此时指向全局。


---

> 显式绑定：显式绑定用到了call()和apply()方法，因为可以直接指定this的绑定对象，因此称之为显式绑定。
```
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2
};
foo.call( obj ); // 2
```
> ...把foo函数强行丢到obj的作用域下面执行。this指向obj

> 硬绑定：也属于显式绑定。
```
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2
};
var bar = function() {
    foo.bind( obj );
};
bar(); // 2
setTimeout( bar, 100 ); // 2
// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
bar.call( window ); // 2
```
> 因为我们强制把foo的this绑定到了obj,无论之后如何调用bar,之后的操作并不会覆盖之前的，它总会在obj上调用foo。

---

> new绑定：使用new来调用foo()时，我们会构造一个新对象并把它绑定到foo()调用中的this上。
```
function foo(n) {
    this.studentNum = n;
    this.name = 'cnio'
}
var bar =  new foo(1)
console.log(bar) // foo {studentNum: 1, name: "cnio"}
```
调用构造函数new出一个对象时，构造函数里面的this因为这个new绑定机制，此时的this指向构造出来的实例对象。

```
var x = 2;
function test(){
　　this.x = 1;
}
var o = new test();
alert(x); //2
```

---

> 优先级：new绑定 > 显式绑定 > 隐式绑定

```
function foo() {
    console.log( this.a );
}

var obj1 = {
    a: 2,
    foo: foo
};

var obj2 = {
    a: 3,
    foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```
> 调用obj1.foo()和obj2.foo()分别将foo()中的this隐式绑定到了两个对象，然后下面再用使用call方法obj1的foo()方法显式绑定到obj2上，发现输出的是obj2的a值，所以显式绑定比隐式绑定优先级高


```
function foo(something) {
    this.a = something;
}

var obj1 = {
    foo: foo
};

var obj2 = {};

obj1.foo( 2 );
console.log( obj1.a ); // 2

obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3

var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4
```
> 最后用new并用了隐式绑定构造了bar对象。bar对象的a值时4，证明new绑定比隐式绑定优先级高。

> 那显式绑定和new绑定：
```
function foo(something) {
    this.a = something;
}
var obj1 = {};
var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2

var baz = new bar( 3 );
console.log( obj1.a ); // 2
console.log( baz.a ); // 3
```
> 用bind把foo函数硬绑定在了obj1对象下执行并用bar指向这个构造函数。然后再用调用这个东西构造一个baz，this指向了baz表明用了new绑定。

> 优先级：new绑定 > 显式绑定 > 隐式绑定

- [隐式绑定](https://segmentfault.com/a/1190000004460913)
- [默认绑定，显式绑定，new绑定，优先级](https://segmentfault.com/a/1190000004515649)