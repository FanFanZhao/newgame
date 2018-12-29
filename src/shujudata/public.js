let Public = new Object();

// 加法
Public.Addition = function(a, b) {
    var a = a == '' ? 0 : a;
    var b = b == '' ? 0 : b;
    if(!isNaN(a)){
        a = String(a);
    };
    if(!isNaN(b)){
        b = String(b);
    };
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch(f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch(f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
};
// 减法
Public.Subtraction = function(a, b) {
    var a = a == '' ? 0 : a;
    var b = b == '' ? 0 : b;
    if(!isNaN(a)){
        a = String(a);
    };
    if(!isNaN(b)){
        b = String(b);
    };
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch(f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch(f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
};
// 乘法
Public.Multiplication = function(arg1, arg2) {
    if(arg1 && arg2){
        var arg1 = arg1 == '' ? 0 : arg1;
        var arg2 = arg2 == '' ? 0 : arg2;
        if(!isNaN(arg1)){
            arg1 = String(arg1);
        };
        if(!isNaN(arg2)){
            arg2 = String(arg2);
        };
        var r1, r2, m, n, q;
        if(parseInt(arg1) == arg1) {
            r1 = 0;
        } else {
            r1 = arg1.toString().split(".")[1].length;
        }
        if(parseInt(arg2) == arg2) {
            r2 = 0;
        } else {
            r2 = arg2.toString().split(".")[1].length;
        }
        m = Math.pow(10, r1);
        n = Math.pow(10, r2);
        q = m * n;
        var sum = (((arg1 * m) * (arg2 * n)) / q);
        return sum;
    }
};
// 除法
Public.Division = function(a, b) {
    if(a && b){
        var a = a == '' ? 0 : a;
        var b = b == '' ? 0 : b;
        if(!isNaN(a)){
            a = String(a);
        };
        if(!isNaN(b)){
            b = String(b);
        };
        var c, d, e = 0,
            f = 0;
        try {
            e = a.toString().split(".")[1].length;
        } catch(g) {}
        try {
            f = b.toString().split(".")[1].length;
        } catch(g) {}
        return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
    } else if (a == 0) {
        return 0; // 被除数等0
    } else {
        return false; // 除数等0 非法数据
    }
};

function mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

// 手机正则
Public.checkMobile = function(sMobile) {
    var phone = sMobile.trim();
    var reg = /^1\d{10}$/;
    return reg.test(phone);
};
//密码格式
Public.pwd = function(val) {
    val = val.trim();
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
    return reg.test(val);
};
//验证码格式验证
Public.code = function(val) {
    val = val.trim();
    var reg = /^\d{6}$/;
    return reg.test(val);
};

//验证码格式验证
Public.code = function(val) {
    val = val.trim();
    var reg = /^\d{6}$/;
    return reg.test(val);
};
//银行卡验证
Public.bank_car = function(val) {
    if(!isNaN(val) && val.length > 10 && val.length < 20) {
        return true;
    } else {
        return false;
    }

};
// 日期格式yyyy-MM-dd HH-mm-ss
Public.formatDateTime = function(inputTime) {
    if(inputTime){
        inputTime=inputTime.toString();
        if(inputTime.length < 13){
            inputTime = Number(inputTime) * 1000;
        };
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '/' + m + '/' + d+' '+h+':'+minute+':'+second;
    }else{
        return '';
    }
};


//
Public.wipedata = function(type) {
    for(var i in type){
        type[i] = "";
    };
};

Public.escapeHtml = function (str) {
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}



Public.toDecimal2 = function (x) { //强制保留2位小数
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }
//特殊符号验证
Public.patternvalidate = function(val) {
    val = val.trim();
    var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    return reg.test(val);
};

Public.codeImg = function(id) {
    // 生成验证码
    function yanzhenma(window, document) {
        var size = 4; //设置验证码长度
        function GVerify(options) { //创建一个图形验证码对象，接收options对象为参数
            this.options = { //默认options参数值
                id: "", //容器Id
                canvasId: "verifyCanvas", //canvas的ID
                width: "90", //默认canvas宽度
                height: "30", //默认canvas高度
                type: "number", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
                code: "",
            }
            if(Object.prototype.toString.call(options) == "[object Object]") { //判断传入参数类型
                for(var i in options) { //根据传入的参数，修改默认参数值
                    this.options[i] = options[i];
                }
            } else {
                this.options.id = options;
            }

            this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
            this.options.letterArr = getAllLetter();

            this._init();
            this.refresh();
        }

        GVerify.prototype = {
            /**版本号**/
            version: '1.0.0',

            /**初始化方法**/
            _init: function() {
                var con = document.getElementById(this.options.id);
                var canvas = document.createElement("canvas");
                this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "90";
                this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";
                canvas.id = this.options.canvasId;
                canvas.width = this.options.width;
                canvas.height = this.options.height;
                canvas.style.cursor = "pointer";
                canvas.innerHTML = "您的浏览器版本不支持canvas";
                con.appendChild(canvas);
                var parent = this;
                canvas.onclick = function() {
                    parent.refresh();
                }
            },

            /**生成验证码**/
            refresh: function() {
                this.options.code = "";
                var canvas = document.getElementById(this.options.canvasId);
                if(canvas.getContext) {
                    var ctx = canvas.getContext('2d');
                } else {
                    return;
                }
                ctx.textBaseline = "middle";
                ctx.fillStyle = randomColor(180, 240);
                ctx.fillRect(0, 0, this.options.width, this.options.height);

                if(this.options.type == "blend") { //判断验证码类型
                    var txtArr = this.options.numArr.concat(this.options.letterArr);
                } else if(this.options.type == "number") {
                    var txtArr = this.options.numArr;
                } else {
                    var txtArr = this.options.letterArr;
                }

                for(var i = 1; i <= size; i++) {
                    var txt = txtArr[randomNum(0, txtArr.length)];
                    this.options.code += txt;
                    ctx.font = randomNum(this.options.height, this.options.height) + 'px SimHei'; //随机生成字体大小
                    ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
                    ctx.shadowOffsetX = randomNum(-3, 3);
                    ctx.shadowOffsetY = randomNum(-3, 3);
                    ctx.shadowBlur = randomNum(-3, 3);
                    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
                    var x = this.options.width / (size + 1) * i;
                    var y = this.options.height / 2;
                    var deg = randomNum(-30, 30);
                    /**设置旋转角度和坐标原点**/
                    ctx.translate(x, y);
                    ctx.rotate(deg * Math.PI / 180);
                    ctx.fillText(txt, 0, 0);
                    /**恢复旋转角度和坐标原点**/
                    ctx.rotate(-deg * Math.PI / 180);
                    ctx.translate(-x, -y);
                }
                /**绘制干扰线**/
                for(var i = 0; i < 4; i++) {
                    ctx.strokeStyle = randomColor(40, 180);
                    ctx.beginPath();
                    ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
                    ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
                    ctx.stroke();
                }
                /**绘制干扰点**/
                for(var i = 0; i < this.options.width / 4; i++) {
                    ctx.fillStyle = randomColor(0, 255);
                    ctx.beginPath();
                    ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
                    ctx.fill();
                }
            },

            /**验证验证码**/
            validate: function(code) {
                var code = code.toLowerCase();
                var v_code = this.options.code.toLowerCase();
                if(code == v_code) {
                    return true;
                } else {
                    this.refresh();
                    return false;
                }
            }
        }
        /**生成字母数组**/
        function getAllLetter() {
            var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
            return letterStr.split(",");
        }
        /**生成一个随机数**/
        function randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        /**生成一个随机色**/
        function randomColor(min, max) {
            var r = randomNum(min, max);
            var g = randomNum(min, max);
            var b = randomNum(min, max);
            return "rgb(" + r + "," + g + "," + b + ")";
        }
        window.GVerify = GVerify;
    }
    yanzhenma(window, document);
    new GVerify(id);
}
// 随机字符
// 生成3-32位随机串：randomWord(true, 3, 32)
// 生成43位随机串：randomWord(false, 43)
Public.randomWord = function (randomFlag, min, max){
    var str = "",
        range = min,
        pos,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}



// url截取
Public.GetQueryString = function (name){
    var reg = new RegExp("(^|&|)" + name + "=([^&?]*)(&|$|)", "i");  
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";  
    if (r != null)  
        context = r[2];  
        reg = null;  
        r = null;  
        return context == null || context == "" || context == "undefined" ? "" : context;   
}
// 判断手机还是浏览器
Public.isMobile = function () {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag;
}

export default Public;






// WEBPACK FOOTER //
// ./src/shujudata/public.js