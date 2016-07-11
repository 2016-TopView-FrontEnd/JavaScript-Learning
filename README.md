# topview大前端暑假学习计划

标签 ： 计划

---


本文是翻译 !!本文是翻译!! 详细内容请查看原文!!!
按照[How to Learn JavaScript Properly][1]一文来正确地学习JavaScript.



### First of All

 - 遇到问题若解决不了，请在github上提交issue!!!!!!!!!
 - 每周之后，请把每周学习到的东西上传到本repo对应的文件夹. 例子请看week1文件夹.
 - 该学习路线将会花费4周的时间!

### Resource
整个学习路线会用到下面的资源:

 - [JavaScript高级程序设计(第3版)][2]
 - [free code camp][3]
 - [github][4]
 - [code school][5]




### Week 1 - Introduction, Data Types, Expressions and Operations

**第一周比较轻松~ 涉及的内容有JavaScript的介绍, 数据类型, 表达式以及运算。**

 1. 完成free code camp的*front-end development certification*部分的**HTML5&CSS**部分
 2. 阅读JavaScript高级程序设计的前言, 第一章和第二章.
 3. 完成free code camp的**Basic JavaScript**部分
 4. 阅读JavaScript高级程序设计的第3章, 第4章(可以跳过位操作符部分内容)
 5. 学会调试JavaScript。建议使用Chrome的DevTools(开发者工具).

### Week 1~2 - Objects, Arrays, Functions

**涉及的内容有对象，数组，函数，DOM以及jQuery**

 1. 阅读文章-[JavaScript Objects in Detail][6], 或者JavaScript高级程序设计的第6章.
 2. 完成free code camp的**Object Oriented and Functional Programming**部分
 3. 阅读JavaScript高级程序设计的第5章和第7章.

### Week 2~3 - DOM, jQuery, and the first project

 1. 阅读JavaScript高级程序设计的第8, 9, 10, 11, 13和14章.
 2. 完成codeschool的[try jQuery][7]课程. 视频观看以及翻译在[这里][8].
 3. 完成free code camp的**jQuery**部分
 4. **你的第一个项目 - A Dynamic Quiz**
 
   
    - 显示题号，题目，以及相关选项
    - 记录得分，并且在最后一页显示出来。
    - 添加'next'按钮，用于切换到下一题。添加'Skip'按钮，直接跳到下一题。
    - 动态地切换问题。也就是按'next'的时候，先把当前的问题删掉，接着切换新的问题。
       可以考虑这样来储存所有问题:
        
            var allQuestions = [{
              question:'What is JavaScript?',
              choices: [
                'A Programming Language',
                'A Food',
                'I Dont Know'
              ],
              correctAnswer:0
            }];
    
    - 写2个版本。一个原生JavaScript, 一个jQuery.

    

    - 用git来管理你们的quiz项目！ 学会git的分支管理，请利用GitHub的Projects Pages把你的quiz项目发布到网上。

### Week 3 - Ajax, Event, Regular Expressions, jQuery动画
    
**内容有Ajax, 正则表达式，window对象，事件，以及jQuery**
   

 1. 阅读JavaScript高级程序设计的第20章和23章。
 2. 完成free code camp的**JSON APIs and Ajax**部分
 2. 改进你的Quiz项目

    

 - 加入验证. 确保在'next'之前用户必须填写答案。
 - 加入'Back'按钮，使得可以回到任意地方修改答案。
 - 使用jQuery的添加动画效果。比如，旧问题的淡出和新问题的淡入。
 - 把问题存放在外部的JSON文件里。
 - 添加用户验证: 登陆登出，利用local storage.
 - 用cookie来记住用户，让用户返回首页，显示'欢迎，username'信息

### Week 4 - Module, MVC, Class, Inheritance

**涉及了模块化，类，继承**

 1. 阅读文章-[OOP in JavaScript: What you need to know][9]
 2. 阅读JavaScript高级程序设计的第6，16，22，24章。这也许是最有技术性的一次阅读了，如果没看懂没关系!!。
 3. 完成完成free code camp的**Basic Algorithm Scripting**部分
 4. 看[阮一峰的ES6][10]
 5. 再次优化你的Quiz项目

       
     - 添加你自己喜欢的功能。比如得分排行榜。
     - 重构你的代码

 
## Continue

作为前端工程师，作为走在技术前沿的人，我们要时刻保持对知识的饥饿感！！！
（我只是想说虽然集训快结束了，你还是要继续学习~）

1、服务端语言
    

 - [node.js][11]

2、MVC模式框架
    

 - [backbone.js][12]

3、流行js框架
   

 - [react.js][13]

4、CSS框架
    

 - sass
 - less

### 鸡汤

 - 看书看不懂的部分就跳过!! 总之要看快速看完一遍！
 - 遇到不懂的地方请google，或者问小伙伴，或者提issue，或者问师兄师姐
 - 加油哦，这将是你最无忧无虐地学习的一个假期~


  [1]: http://javascriptissexy.com/how-to-learn-javascript-properly/
  [2]: https://book.douban.com/subject/10546125/
  [3]: https://www.freecodecamp.com/
  [4]: https://github.com/
  [5]: http://try.jquery.com/
  [6]: http://javascriptissexy.com/javascript-objects-in-detail/
  [7]: http://try.jquery.com/
  [8]: http://blog.jobbole.com/37699/
  [9]: http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/
  [10]: http://es6.ruanyifeng.com/
  [11]: https://nodejs.org/en/
  [12]: http://backbonejs.org/
  [13]: https://facebook.github.io/react/
