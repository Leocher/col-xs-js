var text = "白日依山尽，黄河入海流。欲穷千里目，更上一层楼。";
var Length = text.length;
document.write("<div id='a' style='font-size:40px;'>" + text + "</div>");
var colorsets = new Array("#FFCC00","#3333FF","#CC00FF","#FF0000","#CC33FF");
var count = 0;
function color(){
    var String = "";
    for( i=0;i<Length;i++ ){
        String += "<font color=" + colorsets[count++] + ">" + text.substring(i,i+1) + "</font>";
        if(count == colorsets.length){
            count = 0;
        }
    }
    a.innerHTML = String;
    setTimeout("color()",500);
}
color();

/*
* stringObject.substring(start,stop)
* setTimeout( ) 是属于 window 的 method, 但我们都是略去 window 这顶层物件名称, 这是用来设定一个时间, 时间到了, 就会执行一个指定的 method。
* */