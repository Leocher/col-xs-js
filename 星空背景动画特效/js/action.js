var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');
var min = 1;
var max = 3;
myCanvas.width = document.documentElement.clientWidth;
myCanvas.height = document.documentElement.clientHeight;
function Ball() {
    this.centerX = getRandom(max, myCanvas.width - max);
    this.centerY = getRandom(max, myCanvas.height - max);
    this.radius = getRandom(1, 3);
    this.color = getRandomColor();
    var speed1 = getRandom(1, 3);
    this.speedX = getRandom(0, 1) ? -speed1 : speed1;
    var speed2 = getRandom(1, 3);
    this.speedY = getRandom(0, 1) ? -speed2 : speed2;
}
Ball.prototype.move = function() {
    this.centerX += this.speedX;
    this.centerY += this.speedY;
}
Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomColor() {
    var red = getRandom(0, 255);
    var green = getRandom(0, 255);
    var blue = getRandom(0, 255);
    return "rgb(" + red + "," + green + "," + blue + ")";
}
var count = 1000;
var balls = [];
for(i = 0; i < count; i++) {
    var ball = new Ball();
    balls.push(ball);
}
console.log(balls);
function startAnimation() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.font = "100px STKaiTi";
    ctx.strokeStyle = "white"
    ctx.strokeText("Laravel", myCanvas.width/2.5, myCanvas.height/2,500);
    for(i = 0; i < balls.length; i++) {
        balls[i].move();
        balls[i].draw();
    }
    adjustPB();
    ligature();
}
var timer = setInterval("startAnimation()", 50)
//碰壁反弹
function adjustPB() {
    for(i = 0; i < balls.length; i++) {
        if(balls[i].centerX <= balls[i].radius || balls[i].centerX >= myCanvas.width - balls[i].radius) {
            balls[i].speedX *= (-1);
        }
        if(balls[i].centerY <= balls[i].radius || balls[i].centerY >= myCanvas.height - balls[i].radius) {
            balls[i].speedY *= (-1);
        }
    }
}
//连线
var X1 = myCanvas.width / 2;
var Y1 = myCanvas.height / 2;
function ligature() {
    $(document).ready(function() {
        ctx.beginPath();
        ctx.arc(X1, Y1, 200, 0, Math.PI * 2, false);
        var arc = [];
        for(i = 0; i < balls.length; i++) {
            var disX1 = X1 - balls[i].centerX;
            var disY1 = Y1 - balls[i].centerY;
            if(Math.sqrt(disX1 * disX1 + disY1 * disY1) <= 200) {
                arc.push(balls[i]);
            }
        }
        for(i = 0; i < arc.length; i++) {
            for(j = 0; j < arc.length; j++) {
                if(i != j) {
                    var dixX1 = arc[i].centerX - arc[j].centerX;
                    var dixY1 = arc[i].centerY - arc[j].centerY;
                    if(Math.sqrt(dixX1 * dixX1 + dixY1 * dixY1) <= 50) {
                        ctx.beginPath();
                        ctx.moveTo(arc[i].centerX, arc[i].centerY);
                        ctx.lineTo(arc[j].centerX, arc[j].centerY);
                        ctx.closePath();
                        ctx.strokeStyle = getRandomColor();
                        ctx.stroke();
                    }
                }
            }
        }
    })
}
$('#myCanvas').mouseenter(function(){
    $('#myCanvas').mousemove(function(e){
        X1 = e.pageX;
        Y1 = e.pageY;
        //检测移动是否到达到极值
        if(X1 < 200 ){
            X1 =200;
        }
        if(Y1 < 200){
            Y1 = 200;
        }
        if(X1 > myCanvas.width - 200){
            X1 =  myCanvas.width - 200;
        }
        if(Y1 > myCanvas.height -200){
            Y1 = myCanvas.height - 200;
        }
    })
})
$('#myCanvas').mouseleave(function(e){
    X1 = myCanvas.width / 2;
    Y1 = myCanvas.height / 2;
})
