# call(),apply()和bind()

标签（空格分隔）： this 显示绑定

---

        func.call(this, arg1, arg2);
        func.apply(this, [arg1, arg2])

> 这是call()和apply()接受参数的区别，也是他们唯一的区别 其中 this 是你想指定的上下文，他可以是任何一个 JavaScript 对象(JavaScript 中一切皆对象)，call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里。

> JavaScript 中，某个函数的参数数量是不固定的，因此要说适用条件的话，当你的参数是明确知道数量时用 call 。
>而不确定的时候用 apply，然后把参数 push 进数组传递进去。当参数数量不确定时，函数内部也可以通过 arguments 这个数组来遍历所有的参数。

    var array1 = [12 , "foo" , {name "Joe"} , -2458]; 
    var array2 = ["Doe" , 555 , 100]; 
    Array.prototype.push.apply(array1, array2); 
    // 数组追加

    var  numbers = [5, 458 , 120 , -215 ]; 
    var maxInNumbers = Math.max.apply(Math, numbers),   //获取数组中的数值
    maxInNumbers = Math.max.call(Math,5, 458 , 120 , -215); //


----------


> 对call()和apply()的了解：面试题，定义一个log方法代替console.log()方法

    function log(msg)　{
        console.log(msg);
    }
    log(1);    //1
    log(1,2);    //如果传入不定个参数会有不好的情况发生

    function log(){
        console.log.apply(console, arguments);
    };
    log(1);    //
    log(1,2);    //
    
    //这样就比较好地解决了不定参数的问题
    //接下来的要求是给每一个 log 消息添加一个"(app)"的前辍，比如：
    log("hello world");    //(app)hello world
    
    //这个时候需要想到arguments参数是个伪数组
> js中的伪(类)数组：arguments和调用 getElementsByTagName , document.childNodes 之类的，它们返回NodeList对象都属于伪数组。不能应用 Array下的 push , pop 等方法。

> 伪数组的特征：1，具有length属性。2，按索引方式存储数据。
3，不具有数组的push,pop等方法

> 将伪数组转化为数组:通过 Array.prototype.slice.call或apply 转化为标准数组

    function log(){
        var args = Array.prototype.slice.call(arguments);
        args.unshift('(app)');
        console.log.apply(console, args);
    }//把伪数组转化为数组后再调用unshift()方法把(app)加到数组前面


----------


> bind() 方法：bind()方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入 bind()方法的第一个参数作为 this，传入 bind() 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。

    var bar = function(){
        console.log(this.x);
    }
    var foo = {
        x:3
    }
    bar(); 
    var func = bar.bind(foo);
    func(); // 这里我们创建了一个新的函数 func，当使用 bind() 创建一个绑定函数之后，它被执行的时候，它的 this 会被设置成 foo ， 而不是像我们调用 bar() 时的全局作用域。
    


----------


> 如果连续对同一个函数调用bind()方法的话

    var bar = function(){
        console.log(this.x);
    }
    var foo = {
        x:3
    }
    var sed = {
        x:4
    }
    var func = bar.bind(foo).bind(sed);
    func(); //?
  
    var fiv = {
        x:5
    }
    var func = bar.bind(foo).bind(sed).bind(fiv);
    func(); //?

> 答案是每一个都是3。多次 bind() 是无效的。更深层次的原因， bind() 的实现，相当于使用函数在内部包了一个 call / apply ，第二次 bind() 相当于再包住第一次 bind() ,故第二次以后的 bind 是无法生效的。


----------


> call() & apply()和bind()的区别是，当你希望改变上下文环境之后并非立即执行，而是回调执行的时候，使用 bind() 方法。而 apply/call 则会立即执行函数。


----------
> 改变默认绑定

    var a = '1';
    b.a = '2';
    function b() {
        console.log(this.a)
    }
    b.call(b);
    b();
    
    