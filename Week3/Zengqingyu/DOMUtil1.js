
/**
 * 选择器，class、id、tagName
 * @param  {string} selector class、id、tagName
 * @param  {object} el       parent
 * @return {node/nodelist}   
 */
function $(selector, el) {
  if (!el) {
    el = document;
  }else if(typeof el == 'string'){
    el = $(el);
  }
  if (el.querySelector) {
   // console.log(1);
    var nodelist = el.querySelectorAll(selector);
    return (selector[0] == '#') ? nodelist[0] : nodelist;
  } else {
  //  console.log(3);
    if (selector[0] == '#') {
      return document.getElementById(selector.slice(1));
    } else if (selector[0] == '.') {
      var className = selector.slice(1);
      if (el.getElementsByClassName) {
        return el.getElementsByClassName(className);
      } else {
        var aResult = [];
        var aEle = el.getElementsByTagName('*');
        for (var i = 0; i < aEle.length; i++) {
          if (aEle[i].className == className) {
            aResult.push(aEle[i]);
          }
        }
        return aResult;
      }
    } else {
      return el.getElementsByTagName(selector);
    }
  }
}


/**
 * 物体运动(如果有transition就用transition,否则用JS)
 * @param  {object} obj      运动物体
 * @param  {json} json     运动目标
 * @param  {function} nextMove 运动完执行
 * @return {[type]}          [description]
 */
function goMove(obj, json, nextMove) {
  var transTime = getStyle(obj, 'transition-duration');
  if (transTime == '0s') {
    console.log('js');
    clearInterval(obj.timer);
    obj.timer = setInterval(function() { // 在多物体运动时，每个物体各有计时器
      var hasStop = true; //多值的情况，先假设所有值都已经变化完了

      for (var attr in json) {
        var cur = 0;

        if (attr == 'opacity') //如果要更改的属性是 透明度 的情况
        {
          cur = Math.round(parseFloat(getStyle(obj, attr)) * 100); // 原来的透明度 再四舍五入
        } else {
          cur = parseInt(getStyle(obj, attr));
        }

        var speed = (json[attr] - cur) / 6; // 缓冲直至到达属性到达点
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); // 取整

        if (cur != json[attr])
          hasStop = false; // 如果还没变化完，计时器不关闭

        if (attr == 'opacity') {
          obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
          obj.style.opacity = (cur + speed) / 100;
        } else {
          obj.style[attr] = cur + speed + 'px';
        }
      }

      if (hasStop) {
        clearInterval(obj.timer);
        if (nextMove) {
          setTimeout(nextMove,160);
        };
      }
    }, 30);
  } else {
    console.log('transition')
    for (var attr in json) {
      if (attr == 'opacity') {
        obj.style.filter = 'alpha(opacity:' + json[attr] + ')';
        obj.style.opacity = json[attr] / 100;
      }else if(attr == 'transform'){
        obj.style.transform = json[attr];
      }else {
        obj.style[attr] = json[attr] + 'px';
      }
    }
    if (nextMove) {
      setTimeout(nextMove,parseFloat(transTime)*1000);
    }
  }
}

/*获取非行间样式*/
function getStyle(obj, name) {
  if (obj.currentStyle) {
    return obj.currentStyle[name];
  } else {
    return getComputedStyle(obj, false)[name];
  }
}

/**
 * remove className(s)
 * @param  {object} obj         [description]
 * @param  {string} classRemove className to remeove
 * @return {[type]}             [description]
 */
function removeClass(obj, classRemove) {
  var classRemove = classRemove.split(/\s+/);

  if (obj.classList) { // ff3.6+  、chrome
    var classList = obj.classList;
    for (var i = 0, len = classRemove.length; i < len; i++) {
      if (classList.contains(classRemove[i])) {
        classList.remove(classRemove[i]);
      }
    }
  } else {
    var className = obj.className.split(/\s+/);
    var pos = -1;
    for (var j = 0, lenRemove = classRemove.length; j < lenRemove; j++) {
      pos = className.indexOf(classRemove[j]);
      if (pos > -1) {
        className.splice(pos, 1);
      }
    }
    obj.className = className.join(" ");
  }
}

/**
 * add className(s) 
 * @param {object} obj      [description]
 * @param {string} classAdd className to add
 */
function addClass(obj, classAdd) {
  var classToAdd = classAdd.split(/\s+/);
  if (obj.classList) {
    var classList = obj.classList;
    for (var i = 0, len = classToAdd.length; i < len; i++) {
      if (!classList.contains(classToAdd[i])) {
        classList.add(classToAdd[i]);
      }
    }
  } else {
    var className = obj.className.split(/\s+/);
    for (var j = 0, lenRemove = classToAdd.length; j < lenRemove; j++) {
      if (className.indexOf(classToAdd[j]) < 0) {
        className.pop(classToAdd[j]);
      }
    }
    obj.className = className.join(" ");
  }
}


function hasClass(obj,classSearch){
  if(obj.classList){
    var classList = obj.classList;
    if(classList.contains(classSearch)){
      return true;
    }else{
      return false;
    }
  }else{
    var classNames = obj.className.split(/\s+/);
    if(classNames.indexOf(classSearch) < 0){
      return true;
    }else{
      return false;
    }
  }
}

/*判断输入是否为空*/
function isEmpty(string){
	return string.trim().length == 0 ;
}

/*延迟执行*/
/*fnc: 执行的函数*/
/*time： 延迟时间（如 0.1s）*/
function delayFnc(fnc1,fnc2,time){
  fnc1();
  time = parseFloat(time)*1000;
  setTimeout(fnc,time);
}

/**
 * randomNumber from min to max
 * @param  {number} min the min
 * @param  {number} max the max
 * @return {num}     the random num
 */
function randomSelect(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

function getText(element){
  return (typeof element.textContent == 'string')?element.textContent:element.innerText;
} 

function setText(element,text){
  if(typeof element.textContent == 'string'){
    element.textContent = text;
  }else{
    element.innerText = text;
  }
}

/*转换为带特点位数的小数*/
/*num：    要转换的数字*/
/*digits：位数*/
function toFixedNum(num,digits){
  return parseFloat(num.toFixed(digits));
}

/*删除父级元素*/
function delParent(son,animation){
  var parent = son.parentNode;
  if(animation){
    var pt = parseInt(getStyle(parent,'paddingTop'));
    var pb = parseInt(getStyle(parent,'paddingBottom'));
    var mt = parseInt(getStyle(parent,'marginTop'));
    var mb = parseInt(getStyle(parent,'marginBottom'));
    parent.style.height = (parent.offsetHeight-pt-pb-mt-mb)+'px';
    // console.log(parent.offsetHeight);
    // parent.style.width = parent.offsetWidth+'px';
    goMove(parent,animation,function(){
      parent.parentNode.removeChild(parent);
    });  
  }else{
    parent.parentNode.removeChild(parent);
  }
}

/*增加首个子级元素*/
/*oParent ：父级元素*/
/*oSon ： 要添加的子级*/
function addFirstChild(oParent,oSon){
  if (oParent.children.length > 0) {
     oParent.insertBefore(oSon, oParent.children[0]);
  } else {
    oParent.appendChild(oSon);
  }
}