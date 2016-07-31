function deletedClass(obj,className){
    var a = obj.getAttribute("class").split(" ");
    for (var i = 0; i < a.length; i++) {
      if(a[i] == className) a.splice(i,1);
    }
    var classStr = a[0]?a[0]:"";
    for (var i = 1; i < a.length; i++) {
      classStr += " " + a[i];
    }
    obj.setAttribute("class",classStr);      	
 }

function addClass(obj,className){
   var a = obj.getAttribute("class").split(" ");
   a.push(className);
   var classStr = a[0]?a[0]:"";
   for (var i = 1; i < a.length; i++) {
     classStr += " " + a[i];
   }
   obj.setAttribute("class",classStr);
}