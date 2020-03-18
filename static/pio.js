/* ----

# Pio Plugin
# By: Dreamer-Paul
# Last Update: 2019.12.10

一个支持更换 Live2D 模型的 Typecho 插件。

本代码为奇趣保罗原创，并遵守 GPL 2.0 开源协议。欢迎访问我的博客：https://paugram.com

---- */

var Paul_Pio = function (prop) {
    this.prop = prop;
    var current = {
        idol: 0,
        menu: document.querySelector(".pio-container .pio-action"),
        canvas: document.getElementById("pio"),
        body: document.getElementsByClassName("pio-container")[0],
        root: document.location.protocol +'//' + document.location.hostname +'/'
    };

    /* - 方法 */
    var modules = {
        // 更换模型
        idol: function () {
            current.idol < (prop.model.length - 1) ? current.idol++ : current.idol = 0;
            return current.idol;
        },
        // 创建内容
        create: function (tag, prop) {
            var e = document.createElement(tag);
            if(prop.class) e.className = prop.class;
            return e;
        },
        // 随机内容
        rand: function (arr) {
            return arr[Math.floor(Math.random() * arr.length + 1) - 1];
        },
        // 创建对话框方法
        render: function (text) {
            if(text.constructor === Array){
                dialog.innerText = modules.rand(text);
            }
            else if(text.constructor === String){
                dialog.innerText = text;
            }
            else{
                dialog.innerText = "输入内容出现问题了 X_X";
            }

            dialog.classList.add("active");

            clearTimeout(this.t);
            this.t = setTimeout(function () {
                dialog.classList.remove("active");
            }, 2500);
        },
        // 移除方法
        destroy: function () {
            current.body.parentNode.removeChild(current.body);
            document.cookie = "posterGirl=false;" + "path=/";
        }
    };

    var elements = {
        home: modules.create("span", {class: "pio-home"}),
        comments: modules.create("span", {class: "pio-comments"}),
        skin: modules.create("span", {class: "pio-skin"}),
        camera: modules.create("span", {class: "pio-camera"}),
        info: modules.create("span", {class: "pio-info"}),
        rss: modules.create("span", {class: "pio-rss"}),
        night: modules.create("span", {class: "pio-night"}),
        close: modules.create("span", {class: "pio-close"})
    };

    var dialog = modules.create("div", {class: "pio-dialog"});
    current.body.appendChild(dialog);

    //检测复制
    $(document).on('copy',function(){
        modules.render("你都复制了些什么呀，转载要记得加上出处哦");
    });

    //查看控制台 		
    var devtools = () => {};
    console.log("%c", devtools);
    devtools.toString = () => {
        modules.render("哈哈，你打开了控制台，是想要看看我的小秘密吗？");
    };

    // 切回页面提示
    window.addEventListener("visibilitychange", () => {
        if (!document.hidden) modules.render("哇，你终于回来了～");
    });

    //查看源码提示
    document.onmousedown = click;  //绑定禁用鼠标右键事件
    document.onkeydown = ctrl_key; //绑定禁用键盘事件
    function click() {
    if (event.button == 2)      //单击的鼠标键为右键
    {
    modules.render('亲爱的在干啥呢！');
    return false;
    }
    }

    function ctrl_key() {
        if (event.keyCode == 123) {                         //禁用F12查看源代码
        modules.render(['F12键失灵了哦！','控制台有什么好看的？','你想看我的小秘密吗？']);
        return false;
        }
    }

    /* - 提示操作 */
    var action = {
        // 欢迎
        welcome: function () {
            var text;
            var SiteIndexUrl = window.location.protocol+'//'+window.location.hostname+'/';
            if(window.location.href == SiteIndexUrl && prop.tips){
                var now = (new Date()).getHours();
                if(now>23||now<=5){
                    text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
                }else if(now>5&&now<=7){
                    text = '早上好！一日之计在于晨，美好的一天就要开始了';
                }else if(now>7&&now<=11){
                    text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
                }else if(now>11&&now<=14){
                    text = '中午了，工作了一个上午，现在是午餐时间！';
                }else if(now>14&&now<=17){
                    text = '午后很容易犯困呢，今天的运动目标完成了吗？';
                }else if(now>17&&now<=19){
                    text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
                }else if(now>19&&now<=21){
                    text = '晚上好，今天过得怎么样？';
                }else if(now>21&&now<=23){
                    text = '已经这么晚了呀，早点休息吧，晚安~';
                }else{
                    text = '嗨~ 快来逗我玩吧！';
                }
            }else{
                if(document.referrer!==''){
                    var referrer = document.createElement('a');
                    referrer.href = document.referrer;
                    var domain = referrer.hostname.split('.')[1];
                    if(window.location.hostname==referrer.hostname){
                        text = '欢迎阅读『'+document.title.split(' - ')[0]+'』';
                    }else if(domain=='baidu') {
                        text = 'Hello! 来自 百度搜索 的朋友,你是搜索『'+referrer.search.split('&wd=')[1].split('&')[0]+'』找到的我吗？';
                    }else if(domain=='so') {
                        text = 'Hello! 来自 360搜索 的朋友,你是搜索『'+referrer.search.split('&q=')[1].split('&')[0]+'』找到的我吗？';
                    }else if(domain=='google') {
                        text = 'Hello! 来自 谷歌搜索 的朋友,欢迎阅读『'+document.title.split(' - ')[0]+'』';
                    }else{
                        text = 'Hello! 来自『'+referrer.hostname+'』的朋友';
                    }
                }else{
                    text = '欢迎阅读『'+document.title.split(' - ')[0]+'』';
                }
            }
            modules.render(text);
        },
        // 触摸
        touch: function () {
            current.canvas.onclick = function () {
                modules.render(prop.content.touch || ["你在干什么？", "再摸我就报警了！", "HENTAI!", "不可以这样欺负我啦！"]);
            };
        },
        // 右侧按钮
        buttons: function () {
            // 返回首页
            elements.home.onclick = function () {
                location.href = current.root;
            };
            elements.home.onmouseover = function () {
                modules.render(prop.content.home || "点击这里回到首页！");
            };
            current.menu.appendChild(elements.home);

            // 对话
            elements.comments.onclick = function () {
                $.get("https://v1.hitokoto.cn/?encode=text",function(result){
                    modules.render(result);
                })
            };
            elements.comments.onmouseover = function () {
                modules.render(prop.content.comments || "想和我对话吗？");
            };
            current.menu.appendChild(elements.comments);

            // 更换模型
            elements.skin.onclick = function () {
                loadlive2d("pio", prop.model[modules.idol()]);
                prop.content.skin && prop.content.skin[1] ? modules.render(prop.content.skin[1]) : modules.render("新衣服真漂亮~");
            };
            elements.skin.onmouseover = function () {
                prop.content.skin && prop.content.skin[0] ? modules.render(prop.content.skin[0]) : modules.render("想看看我的新衣服吗？");
            };
            if(prop.model.length > 1) current.menu.appendChild(elements.skin);

            // 照相
            elements.camera.onclick = function () {
                modules.render("照好了嘛，是不是很可爱呢？");
                window.Live2D.captureName = 'pic.png';
                window.Live2D.captureFrame = true;
            };
            elements.camera.onmouseover = function () {
                modules.render(prop.content.camera || "想为我拍张美美的照片吗？");
            };
            current.menu.appendChild(elements.camera);

            // RSS
            elements.rss.onclick = function () {
                window.open("https://www.leeyiding.com/feed");
            };
            elements.rss.onmouseover = function () {
                modules.render("喜欢我的文章就订阅我吧！");
            };
            current.menu.appendChild(elements.rss);

            // 关于我
            elements.info.onclick = function () {
                window.open(prop.content.link || "https://www.leeyiding.com/about.html");
            };
            elements.info.onmouseover = function () {
                modules.render("想了解更多关于我的信息吗？");
            };
            current.menu.appendChild(elements.info);

            // 夜间模式
            if(prop.night){
                elements.night.onclick = function () {
                    eval(prop.night);
                };
                elements.night.onmouseover = function () {
                    modules.render("夜间点击这里可以保护眼睛呢");
                };
                current.menu.appendChild(elements.night);
            }

            // 关闭看板娘
            elements.close.onclick = function () {
                modules.destroy();
            };
            elements.close.onmouseover = function () {
                modules.render(prop.content.close || "QWQ 下次再见吧~");
            };
            current.menu.appendChild(elements.close);
        },

        custom: function () {
            prop.content.custom.forEach(function (t) {
                if(!t.type) t.type = "default";
                var e = document.querySelectorAll(t.selector);

                if(e.length){
                    for(var j = 0; j < e.length; j++){
                        if(t.type === "read"){
                            e[j].onmouseover = function () {
                                modules.render("想阅读 %t 吗？".replace(/%t/, "“" + this.innerText + "”"));
                            }
                        }
                        else if(t.type === "link"){
                            e[j].onmouseover = function () {
                                modules.render("想去拜访一下 %t 的家吗？".replace(/%t/, "“" + this.innerText + "”"));
                            }
                        }
                        else if(t.text){
                            e[j].onmouseover = function () {
                                modules.render(t.text);
                            }
                        }
                    }
                }
            });
        }
    };

    /* - 运行 */
    var begin = {
        static: function () {
            current.body.classList.add("static");
        },
        fixed: function () {
            action.touch(); action.buttons();
        },
        draggable: function () {
            action.touch(); action.buttons();

            var body = current.body;
            body.onmousedown = function () {
                var location = {
                    x: event.clientX - this.offsetLeft,
                    y: event.clientY - this.offsetTop
                };

                function move(e) {
                    body.classList.add("active");
                    body.classList.remove("right");
                    body.style.left = (event.clientX - location.x) + 'px';
                    body.style.top  = (event.clientY - location.y) + 'px';
                }

                document.addEventListener("mousemove", move);
                document.addEventListener("mouseup", function () {
                    body.classList.remove("active");
                    document.removeEventListener("mousemove", move);
                });
            };
        }
    };

    // 运行
    this.init = function (onlyText) {
        if(prop.hidden === true && window.innerWidth < 400){
            current.body.classList.add("hidden");
        }
        else{
            if(!onlyText){
                action.welcome();
                loadlive2d("pio", prop.model[0]);
            }

            switch (prop.mode){
                case "static": begin.static(); break;
                case "fixed":  begin.fixed(); break;
                case "draggable": begin.draggable(); break;
            }

            if(prop.content.custom) action.custom();
        }
    };
    this.init();
};

// 请保留版权说明
if (window.console && window.console.log) {
    console.log("%c Pio %c https://paugram.com ","color: #fff; margin: 1em 0; padding: 5px 0; background: #673ab7;","margin: 1em 0; padding: 5px 0; background: #efefef;");
}