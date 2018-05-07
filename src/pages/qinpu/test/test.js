import React, {Component} from 'react';
import './test.less';

class Test extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
       // this.draws()
       // this.draw2()
       // this.draw3()
       // this.draw4()
       // this.draw5()
       this.draw6()
    }
    draws(){
        var width = 750, height=500;
        var canvas = document.getElementById('canvas');
        canvas.width = width;
        canvas.height = height;
        var spotArry = [];
        var path = 10;
        var arc_r = 10;
        var area = 500;
        var speed = 0.64;
        var allspot = 8;
        var current = "PLAY";
        var r = "";
        var g = "";
        var b = "";
        var color = "";
        window.allEnd = false,window.firstT = false, window.initColor = false;
        var ctx = canvas.getContext('2d');
        function initCanvas(){
            ctx.fillStyle="#000";
            ctx.fillRect(0,0,width,height);
        }
        initCanvas();
        function spot(x, y, r, color, _x, _y){
            this.x = x;
            this.y = y;
            this.index = spotArry.length;
            this.r = r;
            this._x = _x;
            this._y = _y;
            this.color = color;
            this.draw = function(){
                this.rebound();
                ctx.beginPath();
                ctx.arc(this.x,this.y,this.r,0,10*Math.PI);
                if(window.initColor ){
                    if(color == "" || color == "#009CFF"){
                        r = Number.parseInt(Math.random()*255);
                        g = Number.parseInt(Math.random()*255);
                        b = Number.parseInt(Math.random()*255);
                        color = "rgb("+r+","+g+","+b+")";
                    }
                    if(window.firstT){
                        r = Number.parseInt(Math.random()*255);
                        g = Number.parseInt(Math.random()*255);
                        b = Number.parseInt(Math.random()*255);
                        color = "rgb("+r+","+g+","+b+")";
                        if(window.allEnd){
                            window.firstT = false;
                            window.allEnd = false;
                        }
                    }


                }else{
                    color = "#009CFF"
                }
                // if(window.allEnd)
                //     window.firstT = !window.firstT



                ctx.fillStyle=color;
                ctx.fill();
                ctx.beginPath()
                ctx.arc(this.x,this.y,this.r+path,0,10*Math.PI);
                ctx.strokeStyle=color;
                ctx.stroke();
            }
            this.rebound = function(){
                if(this.x-arc_r-path <= 0 || this.x+arc_r+path >= width){
                    this._x = -this._x;
                }
                if(this.y-arc_r-path <= 0 || this.y+arc_r+path >= height){
                    this._y = -this._y;
                }
                this.x+=this._x;
                this.y+=this._y;
            }
        }
        function start(){
            for(var i = 0; i< allspot ;i++){
                initSpot();
                // spotArry[i].draw();
            }
            setTimeout(function(){
                play()
            }, 0)
        }
        function spotArryDraw(){
            var length = spotArry.length;
            spotArry.forEach(function(item){
                if(item.index == length-1 && window.firstT){
                    window.allEnd = true;
                }
                item.draw();
                for(var i = item.index; i < length; i++){
                    var spot = spotArry[i]
                    if(Math.pow(item.x - spot.x,2)+ Math.pow(item.y - spot.y,2)<= Math.pow(area,2)){
                        ctx.beginPath();
                        ctx.moveTo(item.x,item.y);
                        ctx.lineTo(spot.x,spot.y);
                        ctx.stroke()
                    }
                }
            })



        }
        function initSpot(){
            var x = Number.parseInt(Math.random()*(width-arc_r-path));
            var y = Number.parseInt(Math.random()*(height-arc_r-path));
            if(x < arc_r+path){
                x = arc_r+path+x;
            }
            if(y < arc_r+path){
                y = arc_r+path+y;
            }
            var _x = Number(Number.parseFloat(Math.random()*speed).toFixed(2));
            var _y = Number(Math.sqrt(speed*speed-_x*_x).toFixed(2));
            var mark = Math.random();
            if(mark>0 && mark<=0.25){
                _x = -_x;
                _y = _y;
            }
            if(mark>0.25 && mark<=0.5){
                _y = -_y;
                _x = _x;
            }
            if(mark>0.5 && mark<=0.75){
                _x = -_x;
                _y = -_y;
            }

            var color = "#009CFF"

            spotArry.push(new spot(x, y,arc_r, color, _x, _y));
        }
        start();
        function clear(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        function gameEngine() {
            switch (current) {
                case "PLAY":
                    clear();
                    initCanvas();
                    spotArryDraw();
                    break;

                    break;
            }

        }
        function play(){
            var allNumber = 10000;
            var indexaa = 0;
            var timer = requestAnimationFrame(function fn(){
                // if(indexaa < allNumber){
                gameEngine();
                // indexaa+=20;
                timer = requestAnimationFrame(fn);

                // }else{
                //     indexaa = 0;
                //     gameEngine();
                //     timer = requestAnimationFrame(fn);
                //     // cancelAnimationFrame(timer);
                // }
            });
        }
    }
    draw2(){
            //封装方法，压缩之后减少文件大小
            function get_attribute(node, attr, default_value) {
                return node.getAttribute(attr) || default_value;
            }
            //封装方法，压缩之后减少文件大小
            function get_by_tagname(name) {
                return document.getElementsByTagName(name);
            }
            //获取配置参数
            function get_config_option() {
                var scripts = get_by_tagname("script"),
                    script_len = scripts.length,
                    script = scripts[script_len - 1];                        //当前加载的script
                return {
                    l: script_len,                                           //长度，用于生成id用
                    z: get_attribute(script, "zIndex", 0),                 //z-index
                    o: get_attribute(script, "opacity", 0.9),                //opacity
                    c: get_attribute(script, "color", "0,100,150"),          //color
                    n: get_attribute(script, "count", 130)                   //count
                };
            }
            //设置canvas的高宽
            function set_canvas_size() {
                canvas_width = the_canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                    canvas_height = the_canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            }

            //绘制过程
            function draw_canvas() {
                context.clearRect(0, 0, canvas_width, canvas_height);
                //随机的线条和当前位置联合数组
                var all_array = [current_point].concat(random_lines);
                var e, i, d, x_dist, y_dist, dist;                          //临时节点
                //遍历处理每一个点
                random_lines.forEach(function(r) {
                    r.x += r.xa,
                        r.y += r.ya,                                            //移动
                        r.xa *= r.x > canvas_width || r.x < 0 ? -1 : 1,
                        r.ya *= r.y > canvas_height || r.y < 0 ? -1 : 1,        //碰到边界，反向反弹
                        context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1);           //绘制一个宽高为1的点
                    for (i = 0; i < all_array.length; i++) {
                        e = all_array[i];
                        //不是当前点
                        if (r !== e && null !== e.x && null !== e.y) {
                            x_dist = r.x - e.x,                         //x轴距离 l
                                y_dist = r.y - e.y,                         //y轴距离 n
                                dist = x_dist * x_dist + y_dist * y_dist;   //总距离, m
                            dist < e.max && (e === current_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //靠近的时候加速
                                d = (e.max - dist) / e.max,
                                context.beginPath(),
                                context.lineWidth = d / 2,
                                context.strokeStyle = "rgba(" + config.c + "," + (d + 0.2) + ")",
                                context.moveTo(r.x, r.y),
                                context.lineTo(e.x, e.y),
                                context.stroke());
                        }
                    }
                    all_array.splice(all_array.indexOf(r), 1);

                }), frame_func(draw_canvas);
            }
            //创建画布，并添加到body中
            var the_canvas = document.createElement("canvas"),                 //画布
            // var the_canvas = document.getElementById("canvas"),                 //画布
                config = get_config_option(),                                  //配置
                canvas_id = "c_n" + config.l,                                  //canvas id
                // canvas_id = "canvas" ,                                  //canvas id
                context = the_canvas.getContext("2d"), canvas_width, canvas_height,
                frame_func = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(func) {
                    window.setTimeout(func, 1000 / 45);
                }, random = Math.random,
                current_point = {
                    x: null,               //当前鼠标x
                    y: null,               //当前鼠标y
                    max: 20000
                };
            the_canvas.id = canvas_id;
            the_canvas.style.cssText = "position:fixed;top:0;left:0;z-index:" + config.z + ";opacity:" + config.o;
            get_by_tagname("body")[0].appendChild(the_canvas);

            //初始化画布大小
            set_canvas_size(), window.onresize = set_canvas_size;

            //当时鼠标位置存储，离开的时候，释放当前位置信息
            window.onmousemove = function(e) {
                e = e || window.event, current_point.x = e.clientX, current_point.y = e.clientY;
            }, window.onmouseout = function() {
                current_point.x = null, current_point.y = null;
            };

            //随机生成config.n条线位置信息
            for (var random_lines = [], i = 0; config.n > i; i++) {
                var x = random() * canvas_width,                     //随机位置
                    y = random() * canvas_height,
                    xa = 2 * random() - 1,                           //随机运动方向
                    ya = 2 * random() - 1;
                random_lines.push({
                    x: x,
                    y: y,
                    xa: xa,
                    ya: ya,
                    max: 6000                                        //沾附距离
                });
            }

            //0.1秒后绘制
            setTimeout(function() {
                draw_canvas();
            }, 100);


    }
    draw3(){
        var myCanvas = document.getElementById("canvas")
        var ctx = myCanvas.getContext("2d");
//定义一个构造方法创建小球对象
        var min = 1,max = 2;//记录小球的最小半径和最大半径
        function Ball () {
            //生成小球中心的坐标
            this.centerX = getRandom(max,myCanvas.width-max);
            this.centerY = getRandom(max,myCanvas.height-max);
            //生成小球的半径
            this.radius = getRandom(min,max);
            //生成小球的背景色
            this.color = getRandomColor();
            //小球运动的随机速度 ,正负号代表运动方向
            var speed1 = getRandom(1,2);
            this.speedX = getRandom(0,1) == 0 ? -speed1:speed1;
            var speed2 = getRandom(1,2);
            this.speedY = getRandom(0,1) == 0 ? -speed2:speed2;
        }
//为小球对象添加绘制的功能
        Ball.prototype.draw = function() {

            ctx.beginPath();
            ctx.arc(this.centerX,this.centerY,this.radius,0,Math.PI*2,false);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
//定义方法控制小球的移动
        Ball.prototype.move = function() {

            this.centerX  += this.speedX;
            this.centerY += this.speedY;
        }
//定义函数产生[min,max]范围的随机数
        function getRandom (min,max) {

            return Math.floor(Math.random()*(max-min+1)+min);

        }


//定义函数产生随机颜色
        function getRandomColor() {
            var red = getRandom(0,255);
            var green = getRandom(0,255);
            var blue = getRandom(0,255);
            return "rgb("+red+","+green+","+blue+")";
        }

        var count = 200;//记录当前canvas标签中小球的个数;
        var balls = [];//存储创建的新的小球;

        //利用循环实现小球的存储
        for(var i= 0;i<count;i++){
            var ball = new Ball();
            balls.push(ball);
        }
        //定义函数完成小球的移动
        function startAnimation () {
            ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
            for(var i = 0;i<balls.length;i++){
                balls[i].move();
                balls[i].draw();
            }
            //小球的碰壁检测
            adjustPBCollision();
            //小球的连线
            ballArea();
        }
        var timer = setInterval(startAnimation,20);
        //定义函数完成小球的碰壁检测
        function adjustPBCollision () {
            for(var i = 0;i<balls.length;i++){
                //说明和左右两个边界中的某一个边界碰撞
                if(balls[i].centerX <= balls[i].radius || balls[i].centerX >= myCanvas.width - balls[i].radius){
                    balls[i].speedX *= -1;
                }
                //说明和上下两个边界中的某一个边界碰撞
                if(balls[i].centerY <= balls[i].radius || balls[i].centerY >= myCanvas.height - balls[i].radius){
                    balls[i].speedY *= -1;
                }
            }
        }

        //定义函数实现两个小球的距离以及连线
        function ballArea() {
            for(var i=0;i<balls.length;i++){
                var disX1 = balls[i].centerX; //某一个小球的x坐标
                var disY1 = balls[i].centerY; //某一个小球的y坐标
                for(var j=0;j<balls.length;j++){
                    var disX2 = balls[j].centerX;  //剩余小球的x坐标
                    var disY2 = balls[j].centerY;  //剩余小球的y坐标
                    //计算两个小球之间的圆心的距离
                    var distance = Math.sqrt((disX1-disX2)*(disX1-disX2)+(disY1-disY2)*(disY1-disY2))
                    //判断距离实现连线功能
                    if(distance<=50){
                        ctx.beginPath();
                        ctx.moveTo(disX1,disY1);
                        ctx.lineTo(disX2,disY2);
                        ctx.lineWidth = 1;
                        ctx.strokeStyle ="white";
                        ctx.stroke();
                    }else if(distance>50&&distance<100){
                        ctx.beginPath();
                        ctx.moveTo(disX1,disY1);
                        ctx.lineTo(disX2,disY2);
                        ctx.lineWidth = 1;
                        ctx.strokeStyle ="gray";
                        ctx.opacity = 0.6
                        ctx.stroke();
                    }
                }
            };
        };

        //实现鼠标移动会出现线条相连
        $(document).on("mousemove",function(e){
            var even = e || event;
            //找到鼠标的中心点的位置
            var pointX = even.pageX - $(myCanvas).offset().left;
            var pointY = even.pageY - $(myCanvas).offset().top;
            for(var i=0;i<balls.length;i++){
                var disX3 = balls[i].centerX;
                var disY3 = balls[i].centerY;
                //计算鼠标中心点与小球的圆心之间的距离
                var distance1 = Math.sqrt((pointX-disX3)*(pointX-disX3)+(pointY-disY3)*(pointY-disY3))
                if(distance1<=100){
                    ctx.beginPath();
                    ctx.moveTo(pointX,pointY);
                    ctx.lineTo(disX3,disY3);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = getRandomColor();
                    ctx.stroke();
                }
            }
        });

    }
    draw4(){

// Configure
        var MAX_DISTANCE  = 200,
            PARTICLES     = 40,
            PARTICLE_SIZE = 5;

// No configure! :p
        Math.Tau = Math.PI * 2;
        Math.rand = function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        Math.map = function map(value, imin, imax, omin, omax) {
            return ((value - imin) * (omax - omin) / (imax - imin) + omin);
        };

        window.requestAnimFrame = (function(){
            return window.requestAnimationFrame    ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        window.addEventListener('load', function(event) {
            var canvas  = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            var width, height;
            var particleCounter = 0,
                hover = false,
                stats = new Stats(),
                mmon = new MousePositionMonitor(),
                is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

            stats.setMode(0); // Start off with FPS mode

            // Place the statistics at the bottom right.
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.right = '5px';
            stats.domElement.style.bottom = '5px';

            document.body.appendChild(stats.domElement);

            context.lineWidth = "hairline";

            var resize = function(event) {
                width  = canvas.width  = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }; resize();

            window.addEventListener('resize', resize);

            canvas.addEventListener('mouseenter', function() {
                hover = true;
            });

            canvas.addEventListener('mouseleave', function() {
                hover = false;
            });

            var Color = function Color(r, g, b, a) {
                this.r = Math.floor(r);
                this.g = Math.floor(g);
                this.b = Math.floor(b);
                this.a = Math.floor(a || 255);
            };

            Color.prototype.clone = function() {
                return new Color(this.r, this.g, this.b, this.a);
            };

            Color.prototype.toString = function() {
                if(this.a === 255) {
                    return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
                } else {
                    return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + (this.a / 255) + ')';
                }
            };

            var Particle = function Particle(x, y, size, color) {
                this.x  = x;
                this.y  = y;
                this.s  = size;
                this.r  = size / 2;
                this.vx = (Math.random() < 0.5 ? -1 : 1) * Math.rand(0.5, 2);
                this.vy = (Math.random() < 0.5 ? -1 : 1) * Math.rand(0.5, 2);
                this.id = particleCounter++;

                if(color instanceof Color) {
                    this.c = color;
                } else {
                    this.c = new Color(255, 255, 255, 255);
                }
            };

            Particle.prototype.distance = function(that) {
                if(that instanceof Particle) {
                    return Math.sqrt((this.x-that.x) * (this.x - that.x) + (this.y - that.y) * (this.y - that.y));
                }
            };

            Particle.prototype.step = function() {
                this.x = (this.x + this.vx);
                if(this.x < this.r) {
                    this.x = this.r;
                    this.vx *= -1;
                } else if(this.x > width - this.r) {
                    this.x = width - this.r;
                    this.vx *= -1;
                }

                this.y = (this.y + this.vy);
                if(this.y < this.r) {
                    this.y = this.r;
                    this.vy *= -1;
                } else if(this.y > height - this.r) {
                    this.y = height - this.r;
                    this.vy *= -1;
                }
            };

            Particle.prototype.render = function() {
                context.fillStyle = this.c.toString();
                context.beginPath();
                context.arc(this.x, this.y, Math.floor(this.s / 2), 0, Math.Tau, false);
                context.closePath();
                context.fill();
            };

            var particles = [];
            for(var i = 0; i < PARTICLES - 1; i++) {
                particles.push(
                    new Particle(
                        Math.random() * width,
                        Math.random() * height,
                        PARTICLE_SIZE,
                        new Color(
                            Math.random() * 255,
                            Math.random() * 255,
                            Math.random() * 255,
                            255)
                    )
                );
            }

            // this one is controllable by mouse movement.
            var mouseParticle = new Particle(
                Math.random() * width,
                Math.random() * height,
                PARTICLE_SIZE * 2,
                new Color(0, 200, 100, 255)
            );

            mouseParticle.imp = true;

            particles.push(mouseParticle);

            var render = function() {
                //context.clearRect(0, 0, width, height);
                context.fillStyle = 'rgba(0, 0, 0, 0.3)';
                context.fillRect(0, 0, width, height);

                // render all the particles and check distances
                var paired = {};
                var ipart  = PARTICLES;
                while(ipart--) {
                    var p1    = particles[ipart];
                    var jpart = ipart;

                    p1.step();
                    if(p1.imp && hover) {
                        var pos = mmon.getMousePosition();
                        p1.x = pos.x;
                        p1.y = pos.y;
                    }
                    p1.render();

                    while(jpart--) {
                        var p2 = particles[jpart];

                        if(p1 !== p2 && !paired[p1.id + '-' + p2.id] && !paired[p2.id + '-' + p1.id]) {
                            var distance = p1.distance(p2);
                            if(distance < MAX_DISTANCE) {
                                if(!is_firefox) {
                                    var grd = context.createLinearGradient(p1.x, p1.y, p2.x, p2.y),
                                        c1 = p1.c.clone(), c2 = p2.c.clone();

                                    c1.a = c2.a = Math.floor(Math.map(distance, MAX_DISTANCE, 0, 0, 255));

                                    grd.addColorStop(0, c1), grd.addColorStop(1, c2);

                                    context.strokeStyle = grd;
                                } else {
                                    var c = p1.c.clone();
                                    c.a = Math.floor(Math.map(distance, MAX_DISTANCE, 0, 0, 255));
                                    context.strokeStyle = c.toString();
                                }

                                context.beginPath();
                                context.moveTo(p1.x, p1.y);
                                context.lineTo(p2.x, p2.y);
                                context.closePath();
                                context.stroke();

                                paired[p1.id + '-' + p2.id] = paired[p2.id + '-' + p1.id] = true;
                            }
                        }
                    }
                }
            };

            var loop = function() {
                requestAnimFrame(loop);
                stats.begin();
                render();
                stats.end();
            }; loop();
        });
    }
    draw5(){
        function CanvasAnimate(Dom,options){
            options = options || {}
            this.Element = Dom
            this.cvs = Dom.getContext("2d")
            this.off_cvs = document.createElement("canvas")
            this.off_cvs.width = Dom.width
            this.off_cvs.height = Dom.height
            this.Dom = this.off_cvs.getContext("2d")
            this.width = Dom.width
            this.height = Dom.height
            this.length = options.length || 100
            this.RoundColor = options.RoundColor || "#999"
            this.RoundDiameter = options.RoundDiameter || 2
            this.LineColor = options.LineColor || "#ccc"
            this.LineWeight = options.LineWeight || 1
            this.clicked = options.clicked || false
            this.moveon = options.moveon || false
            this.list = []
            this.paused = true
        }
        CanvasAnimate.prototype.Run = function(){
            if( this.clicked ){
                this.Element.addEventListener( "click",this.Clicked.bind(this) )
            }
            if( this.moveon ){
                this.Element.addEventListener( "mousemove",this.moveXY.bind(this) )
                this.Element.addEventListener( "mouseout",this.moveoutXY.bind(this) )
            }
            this.Draw( this.getLength() )
        }
        CanvasAnimate.prototype.getLength=function(){
            let arr = []
            for(let i=0;i< this.length ;i++){
                let obj = {}
                obj.x = parseInt( Math.random() * this.width )
                obj.y = parseInt( Math.random() * this.height )
                obj.r = parseInt( Math.random()*10 )
                obj.controlX = parseInt( Math.random()*10 ) > 5 ? "left":"right"
                obj.controlY = parseInt( Math.random()*10 ) > 5 ? "bottom":"top"
                arr.push(obj)
            }
            return arr
        }
        CanvasAnimate.prototype.Draw = function(list){
            let new_arr = []
            let line_arr = []

            list.map((item,index)=>{
                let xy = this.ControlXY(item)
                let obj = this.ControlRound(xy)
                new_arr.push( obj )
            });

            new_arr.map((item1,index1)=>{
                new_arr.map((item2,index2)=>{
                    if(item1 !== item2){
                        let x = item1.x - item2.x
                        let y = item1.y - item2.y
                        if( Math.abs(x)< 100 && Math.abs(y)<100 ){
                            let obj = {
                                x1:item1.x,
                                y1:item1.y,
                                x2:item2.x,
                                y2:item2.y,
                            }
                            line_arr.push(obj)
                        }
                    }
                })
            })

            this.drawLine(line_arr)

            new_arr.map((item)=>{
                this.drawRound(item)
            })

            this.list = new_arr

            this.cvs.drawImage(this.off_cvs,0,0,this.width,this.height)

            setTimeout(()=>{
                if(this.paused){
                    this.next()
                }
            },50)
        }
        CanvasAnimate.prototype.next = function(){
            this.cvs.clearRect( 0,0,this.width,this.height )
            this.Dom.clearRect( 0,0,this.width,this.height )
            this.Draw( this.list )
        }
        CanvasAnimate.prototype.drawRound = function(obj){
            let {x,y,r} = obj
            this.Dom.beginPath()
            this.Dom.arc( x,y,r, 0, 2*Math.PI )
            this.Dom.fillStyle = this.RoundColor
            this.Dom.fill()
            this.Dom.closePath()
        }
        CanvasAnimate.prototype.drawLine = function(list){
            list.map( (item)=>{
                this.Dom.beginPath()
                this.Dom.moveTo( item.x1,item.y1 )
                this.Dom.lineTo( item.x2,item.y2 )
                this.Dom.lineWidth = this.LineWeight
                this.Dom.strokeStyle = this.LineColor
                this.Dom.stroke()
                this.Dom.closePath()
            })
        }
        CanvasAnimate.prototype.ControlXY = function(obj){
            if(obj.x >= (this.width - obj.r) ){
                obj.controlX = 'left'
            }else if( obj.x <= parseInt(obj.r/2)  ){
                obj.controlX = "right"
            }

            if( obj.y >= (this.height - obj.r) ){
                obj.controlY = "bottom"
            }else if( obj.y <= parseInt(obj.r/2) ){
                obj.controlY = "top"
            }
            return obj
        }
        CanvasAnimate.prototype.ControlRound = function(obj){
            switch(obj.controlX){
                case "right":
                    obj.x++;
                    break;
                case "left":
                    obj.x--;
                    break;
            }
            switch(obj.controlY){
                case "top":
                    obj.y++;
                    break;
                case "bottom":
                    obj.y--;
                    break;
            }
            return obj
        }
        CanvasAnimate.prototype.Clicked = function(event){
            let obj = {}
            obj.x = event.clientX
            obj.y = event.clientY
            obj.r = parseInt( Math.random()*10 )
            obj.controlX = parseInt( Math.random()*10 ) > 5 ? 'left' :'right'
            obj.controlY = parseInt( Math.random()*10 ) > 5 ? 'bottom' :'top'
            this.list.push(obj)
        }
        CanvasAnimate.prototype.moveXY = function(event){
            let obj = {}
            obj.x = event.clientX
            obj.y = event.clientY
            obj.r = 0
            obj.move = true
            if( this.list[0]["move"] ){
                this.list[0]["x"] = obj.x
                this.list[0]["y"] = obj.y
                this.list[0]["r"] = 1
            }else{
                this.list.unshift(obj)
            }
        }
        CanvasAnimate.prototype.moveoutXY = function(event){
            this.list.shift()
        }
        CanvasAnimate.prototype.pause = function(){
            this.paused = !this.paused
            if( this.paused){
                this.Draw(this.list)
            }
        }
        // var root = document.querySelector("#root")
        var root = document.getElementById("root")
        var a = new CanvasAnimate(root,{length:50,clicked:true,moveon:true})
        a.Run()
        var btn = document.querySelector("#pause1")
        // btn.addEventListener("click",function(){
        //     if( this.innerHTML === "暂停"){
        //         this.innerHTML = "开始"
        //     }else{
        //         this.innerHTML = "暂停"
        //     }
        //     a.pause()
        // })

}
    draw6(){


        var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            w = canvas.width = window.innerWidth,
            h = canvas.height = window.innerHeight,

            hue = 217,
            stars = [],
            count = 0,
            maxStars = 1400;

// Cache gradient
        var canvas2 = document.createElement('canvas'),
            ctx2 = canvas2.getContext('2d');
        canvas2.width = 100;
        canvas2.height = 100;
        var half = canvas2.width/2,
            gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, '#fff');
        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
        gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
        gradient2.addColorStop(1, 'transparent');

        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();

// End cache

        function random(min, max) {
            if (arguments.length < 2) {
                max = min;
                min = 0;
            }

            if (min > max) {
                var hold = max;
                max = min;
                min = hold;
            }

            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var Star = function() {

            this.orbitRadius = random(w / 2 - 50);
            this.radius = random(100, this.orbitRadius) / 10;
            this.orbitX = w / 2;
            this.orbitY = h / 2;
            this.timePassed = random(0, maxStars);
            this.speed = random(this.orbitRadius) / 100000;
            this.alpha = random(2, 10) / 10;

            count++;
            stars[count] = this;
        }

        Star.prototype.draw = function() {
            var x = Math.sin(this.timePassed + 1) * this.orbitRadius + this.orbitX,
                y = Math.cos(this.timePassed) * this.orbitRadius/2 + this.orbitY,
                twinkle = random(10);

            if (twinkle === 1 && this.alpha > 0) {
                this.alpha -= 0.05;
            } else if (twinkle === 2 && this.alpha < 1) {
                this.alpha += 0.05;
            }

            ctx.globalAlpha = this.alpha;
            ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
            this.timePassed += this.speed;
        }

        for (var i = 0; i < maxStars; i++) {
            new Star();
        }

        function animation() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
            ctx.fillRect(0, 0, w, h)

            ctx.globalCompositeOperation = 'lighter';
            for (var i = 1, l = stars.length; i < l; i++) {
                stars[i].draw();
            };

            window.requestAnimationFrame(animation);
        }

        animation();
    }

    render() {
        return (
            <div className='test'>
                <canvas id='canvas' >

                </canvas>
                {/*<canvas id='root' >*/}

                {/*</canvas>*/}
            </div>
        )
    }
}

export default Test

