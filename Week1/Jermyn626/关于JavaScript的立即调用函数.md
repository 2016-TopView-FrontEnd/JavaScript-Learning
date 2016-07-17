标签： JavaScriptLearning 

# 关于JavaScript的立即调用函数 


## 为什么分享
- 《高设》181页的Demo & 185-186模仿块级作用域
- 觉得讲得不够透彻

## 首先

`函数声明` `匿名函数` `函数表达式`

## 一看 Demo
```
// 1
(function() {
    console.log('A fn');
})(); // A fn


// 2
(function() {
    console.log('A fn');
}()); // A fn


// 3
function() {
    console.log('A fn');
}(); // 报错！
```
###**why？**
要将函数声明转换成 **函数表达式** 才能立即调用。


## 二看 Demo
```
// 1：使用 ! 运算符
!function() {
    console.log('A fn');
}(); // A fn


// 2：使用 + 运算符
+function() {
    console.log('A fn');
}(); // A fn


// 3：使用 - 运算符
-function() {
    console.log('A fn');
}(); // A fn


// 4:使用 = 运算符
var f = function() {
    console.log('A fn');
}(); // A fn


// 5：使用 () 运算符
(function() {
    console.log('A fn');
}()); // A fn

(function() {
    console.log('A fn');
})(); // A fn
```
### 以上的函数定义后都能立即调用，**why again？**

因为它们都被转换成了 **函数表达式**

###**Hint：**
使用 () 是最安全的做法，因为！、+、- 等运算符还会和 **函数的返回值** 进行运算，有时造成不必要的麻烦。

## 有什么用
- JavasScript中没用 **私有作用域** 的概念
- **模仿私有作用域** 便于团队开发 等好处
- 防止在团队开发过程中，在全局或局部声明一些变量被其他人声明的相同标识符变量覆盖掉
