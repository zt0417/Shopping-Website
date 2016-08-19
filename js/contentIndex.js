$(function(){
    $(".list_item li").hover(function(e){
        e.preventDefault();
        var ihoverClass=$(this).find("i").attr("class")+"-hover",
            index = $(this).index();   
        
        $(".list_item li").removeClass('block');
        $(this).addClass('block');     
        $(this).find("i").attr("class",ihoverClass);
        $(this).find("s").attr("class","");        
        if($(".displayArea:eq("+index+")").length != 0){
            $(".nav_grid").addClass('block');
        }        
        $(".displayArea,.ad-img").removeClass('block');
        $(".displayArea:eq("+index+")").addClass('block');
        $(".displayArea:eq("+index+")").find(".ad-img").addClass('block');
    },function(e){                    
        if("undefined" != typeof $(e.relatedTarget).attr("class") && $(e.relatedTarget).attr("class").indexOf("displayArea") >= 0){            
            return false
        }        
        $(".nav_grid").removeClass('block');
        $(".list_item li").removeClass('block');   
        /* 
        var iClassname=$(this).find("i").attr("class").replace("-hover","");
        $(this).find("i").attr("class",iClassname);
        $(this).find("s").attr("class","icon-arrow");
        */         
    });

    $(".nav_grid").hover(function(e){        
        e.preventDefault();
        $(".nav_grid").addClass('block');    
    },function(e){        
        var index =$("> .block",this).index(),
            length = index+1;        
        $("i",".list_item li:eq("+index+")").attr("class","icon-tag"+length);  
        $("s",".list_item li:eq("+index+")").attr("class","icon-arrow");      
        $(".nav_grid,.displayArea").removeClass('block');  
        $(".list_item li").removeClass('block');      
    });

    $(".top_PicSwitch").slide({
        css: {"width": 627, "height": 250},
        config: {"time": 5000, "type": "left", "speed": 600,"button":true,"butArr":".top_PicSwitch .ui_post_a li"},
        completes:function(o){//åˆå§‹åŒ–å®Œæˆæ‰§è¡ŒåŠ¨ä½œ
          $(".top_PicSwitch").hover(function(){
               $(".J_ui_butPost_a,.J_ui_butPost_b").show();
          },function(){
               $(".J_ui_butPost_a,.J_ui_butPost_b").hide();
          });
        }
    });
    
    $(".js_block_list,.youhui_list,.banner_block_list").find("li").hover(function(){
        $(this).addClass('on');
        $(this).css('z-index',10);
    },function(){
        $(this).removeClass('on');
        $(this).css('z-index',1); 
    });

    //ä»Šæ—¥ç‰¹ä»·å›¾ç‰‡æ—¥æœŸç‰¹æ•ˆ
    var month= $(".tejia").attr("data-month"),day = $(".tejia").attr("data-day");
    var monthnum,daynum;
    if(month < 10){
        monthnum = '<span class="icon-'+month+'"></span>';
    }else{
        monthnum = '<span class="icon-'+month.slice(0,1)+'"></span><span class="icon-'+month.slice(1)+'"></span>';
    }

    if(day < 10){
        daynum = '<span class="icon-'+day+'"></span>';
    }else{
        daynum = '<span class="icon-'+day.slice(0,1)+'"></span><span class="icon-'+day.slice(1)+'"></span>';
    }

    var ele = '<ul>\
                    <li>'+monthnum+'</li>\
                    <li><span class="icon-month"></span></li>\
                    <li>'+daynum+'</li>\
                    <li><span class="icon-day"></span></li>\
                </ul>';

    $(".timewrap").append(ele);

    goodsList.init();
    everyDay.init();
    tagsListJsong.init();
});

var goodsList = {
    list:0,
    all:$("#good-ul").find("ul").length-1,
    init:function(){
        this.bindFun();
    },
    bindFun:function(){
        var left = 627,
            that = this;
        $(".prev").click(function(){
            if(that.list>0){
              that.list--; 
               $("#good-ul").animate({
                    left:-that.list*left
                },500); 
                if(that.list == 0){
                    $(this).css("opacity",0.5);
                }
                if(that.list <= that.all){
                    $(".next").css("opacity",1);
                }
            }
        });

        $(".next").click(function(){
            if(that.list<that.all){
               that.list++;
                $("#good-ul").animate({
                    left:-that.list*left
                },500); 
                if(that.list == that.all){
                    $(this).css("opacity",0.5);
                }

                if(that.list > 0){
                    $(".prev").css("opacity",1);
                }
            } 
        });
    }
}

var everyDay = {
    leftObj:849,
    init:function(){
        this.bindFun();
        $("#everyUl").css({
            width:$("#everyUl li:first").outerWidth() * $("#everyUl li").length
        });
    },
    bindFun:function(){
        var list = 0,
            allList = $("#everyUl li").length,
            that= this,
            animateLoding = false;
        $(".every-day .r-fade").click(function(){
              if(animateLoding){
                  return false;
              }
              animateLoding = true;
              if(-allList+1 < list){
                  list--;
                  $("#everyUl").animate({
                       left:that.leftObj * list
                  },500,function(){
                      animateLoding = false;
                  });
              }else{
                  list--;
                  $("#everyUl li:first").css("left",$("#everyUl").width());
                  $("#everyUl").animate({
                       left:that.leftObj * list
                  },500,function(){
                      list  = 0;
                      $("#everyUl li:first,#everyUl").css("left",0);
                      animateLoding = false;
                  });
              }
        });

        $(".every-day .l-fade").click(function(){
              if(animateLoding){
                  return false;
              }
              animateLoding = true;
              if(list == 0){
                  list++;
                  $("#everyUl li:last").css("left",-$("#everyUl").width());
                  $("#everyUl").animate({
                       left:that.leftObj * list
                  },500,function(){
                      list  = -($("#everyUl li").length - 1);
                      $("#everyUl li:last").css("left",0);
                      $("#everyUl").css("left",-($("#everyUl").width()-$("#everyUl li:last").width()));
                      animateLoding = false;
                  });
              }else{
                  list++;
                  $("#everyUl").animate({
                       left:that.leftObj * list
                  },500,function(){
                      animateLoding = false;
                  });
              }
        });
    }
}

var tagsListJsong = {
     init:function(){
         this.bindFun();
         $(".js_tag_list_a").each(function(){
              $(this).find("a:last s").remove();
               $(this).find("a").eq(0).click();
         });
     },
     bindFun:function(){
        var that = this;
        $(".js_tag_list_a a").click(function(){
               var obj1 = $(this).parents(".title").find(".fonts").html(),
                   obj2 = $(this).find("span").html(),
                   _this = $(this);
                _this.addClass('on');
                _this.siblings().removeClass("on");
                _this.siblings().find("s").css("display","inline-block");
                _this.prev().find("s").hide();
                _this.find("s").hide();

                if(_this.data("dataList")){
                     _this.parents(".area-list").find(".banner_block_list").html(_this.data("dataList"));
                }else{
                    $.post("http://www.shihuo.cn/haitao/getinforbyname",{typeone:obj1,typetwo:obj2},function(data){
                         var str = '';
                         for(var i=0;i<data.info.length;i++){
                            if(data.info[i]["type"] != 'undefined'){
                                 url='http://www.shihuo.cn/haitao/buy/'+data.info[i].id+'-'+data.info[i].goods_id+'.html';
                             }else{
                                 url='http://www.shihuo.cn/haitao/youhui/'+data.info[i].id+'.html';
                             }
                                str+='<li>\
                                        <div class="imgs">\
                                            <a href="'+(url)+'#qk='+obj1+'&root='+obj2+'&good='+(i+1)+'" target="_blank">\
                                                <img width="156" src="'+data.info[i].img_path+'" alt="'+data.info[i].title+'">\
                                            </a>\
                                        </div>\
                                        <div class="tit"><a href="'+(url)+'#qk='+obj1+'&root='+obj2+'&good='+(i+1)+'" target="_blank">'+data.info[i].title+'</a></div>\
                                        <div class="price">\
                                                <div class="t1">\
                                                    åˆ°æ‰‹ä»·<i>Â¥ </i><span>'+that.getNumStr(data.info[i].price)+'</span>\
                                                </div>\
                                             <div class="t2">\
                                                äººæ°”ï¼š<span>'+data.info[i].hits+'</span>\
                                            </div>\
                                        </div>\
                                    </li>';
                        }; 
                        _this.data("dataList",str);
                        _this.parents(".area-list").find(".banner_block_list").html(_this.data("dataList"));
                    },"json");
                }
        });
   },
   getNumStr:function(num){
       if($.browser.msie){
          return num;
       }else{
          var str = num,
           qw = [];
          for(var n = 0;n<str.length;n++){
             qw[n] = str[n];
          }
          if(qw.indexOf(".") != -1){
              if(qw.length > 6 && qw[qw.length-2] != "."){
                  str = str.substr(0,6);
              }else{
                  str = str.substr(0,5)
              }
          }
          return str;
       }
   }
}

/*å›¾ç‰‡åˆ‡æ¢æ•ˆæžœ*/
!(function($) {
    var picScroll = function() {
        var arg = arguments,
        defaults = {// css{ç›’å­çš„å®½é«˜};config{æ¯æ¬¡æ»‘åŠ¨/æ·¡è¿›æ·¡å‡ºé—´éš”æ—¶é—´timeã€æ»‘åŠ¨ç±»åž‹("top/left/fade")ã€æ»‘åŠ¨/æ·¡è¿›æ·¡å‡ºçš„é€Ÿåº¦speedã€æ˜¯å¦åŠ è½½å·¦å³æŒ‰é’®button}ã€‚æ³¨ï¼šå¦‚ä¸è‡ªå®šä¹‰å‚æ•°åˆ™é‡‡ç”¨é»˜è®¤å€¼
            css: {"width": 627, "height": 250},
            config: {"time": 3000, "type": "fade", "speed": 800, "button": false,"butArr":".top_PicSwitch .ui_post_a li"},
            before:function(data){//å›¾ç‰‡åˆ‡æ¢å‰æ‰§è¡ŒåŠ¨ä½œ
            },
            after:function(data){//å›¾ç‰‡åˆ‡æ¢å®Œæˆæ‰§è¡ŒåŠ¨ä½œ
            }
        };
        return this.each(function() {
            var $this = $(this),
            $$ = function(a) {
                return $this.find(a)
            },
            animates = {
                list: 0,//å½“å‰ç¬¬å‡ å¼ 
                options: ["top", "left", "fade"],//åŠ¨ç”»ç±»åž‹
                animated:false,
                init: function() {
                    this.arrays = [];//é¢„ç•™å‚æ•°ä½ç½®ä»¥å¤‡ç”¨
                    this.arrays[0] = $.extend(true,{}, defaults, arguments[0] || {});//åˆå¹¶è‡ªå®šä¹‰å‚æ•°å’Œé»˜è®¤å‚æ•°
                    this.ul = $$(".ui_post");
                    this.li = $$(".ui_post li");
                    this.but = this.arrays[0].config.butArr;
                    if(this.options.index(this.arrays[0].config.type) !== -1){//å‚æ•°æ˜¯å¦æ­£ç¡®
                        for (var i = 0; i < this.arrays.length; i++) {//å¾ªçŽ¯ ä¿å­˜å‚æ•°å€¼
                            switch (typeof this.arrays[i]) {
                                case 'object':
                                    $this.css(this.arrays[i].css);
                                    this.li.css(this.arrays[i].css)
                                    this.returnBefore = this.arrays[i].before;
                                    this.returnAfter = this.arrays[i].after;
                                    break;
                                default:
                            }
                        }
                        this.config("move");//é…ç½®å¼€å§‹
                        this.bindFun();//ç»‘å®šæ–¹æ³•
                        if(this.arrays[0].completes){
                           this.arrays[0].completes($this);
                        }
                    }else{//å¦‚æžœå‚æ•°ä¸æ­£ç¡®æŠ›å‡ºé”™è¯¯
                        $.error = console.error;
                        $.error("å‚æ•°æ ¼å¼ä¸æ­£ç¡®ï¼");
                    }
                },
                config: function(str) {
                    var that = this,i=0,butArr=that.but.split(","),
                        con = that.arrays[0].config,
                        arr = (con.type == "top" ? ["top"] : ["left"]);
                    if (con.type == "left" || con.type == "top") {//åŠ¨ç”»ç±»åž‹åˆ¤æ–­
                        if (con.type == "left") {
                            that.ul.addClass("ui_postFloat");
                            that.ul.width($this.width() * that.li.length);//è®¡ç®—å›¾ç‰‡åˆ—è¡¨æ€»å®½åº¦
                        }
                        if (that.list == that.li.length) {//å¦‚æžœå½“å‰å›¾ç‰‡æ˜¯ç¬¬ä¸€å¼ ä»Žæœ€åŽå¾ªçŽ¯
                            con.type == "top" ? that.li.first().css(arr[0], that.ul.height()) : that.li.first().css(arr[0], that.ul.width());//ç»™ç¬¬ä¸€å¼ å›¾ç‰‡çš„position: relative;èµ‹å€¼ä»¥è¾¾åˆ°æ— é™å¾ªçŽ¯æ•ˆæžœ
                            that.callback = function() {//æ»šåŠ¨å®ŒæˆåŽçš„å›žè°ƒå‡½æ•°  ç»™position: relative;å€¼è¿˜åŽŸä¸º0 åŒæ—¶å½“å‰å›¾ç‰‡çš„ä½ç½®æ˜¯0
                                that.li.first().css(arr[0], 0);
                                that.ul.css(arr[0], 0);
                                that.list = 0;
                            }
                        }
                        if (that.list == -1) {//å¦‚æžœå½“å‰å›¾ç‰‡æ˜¯æœ€åŽä¸€å¼ ä»Žç¬¬ä¸€å¼ å¾ªçŽ¯
                            con.type == "top" ? that.li.last().css(arr[0], -that.ul.height()) : that.li.last().css(arr[0], -that.ul.width());//ç»™æœ€åŽå¼ å›¾ç‰‡çš„position: relative;èµ‹å€¼ä»¥è¾¾åˆ°æ— é™å¾ªçŽ¯æ•ˆæžœ
                            that.callback = function() {//æ»šåŠ¨å®ŒæˆåŽçš„å›žè°ƒå‡½æ•°
                                that.list = that.li.length - 1;
                                that.li.last().css(arr[0], 0);
                                con.type == "top" ? that.ul.css(arr[0], -parseInt($this.height()) * that.list) : that.ul.css(arr[0], -parseInt($this.width()) * that.list);
                            }
                        }
                        that.scrollA();//é…ç½®å®Œæˆå¼€å§‹æ»šåŠ¨
                    } else if (con.type == "fade") {//å¦‚æžœæ»šåŠ¨ç±»åž‹ä¸ºfade
                        if (!that.ul.hasClass("ui_post")) {
                            that.ul.addClass("ui_post")
                        }
                        if (that.list == that.li.length) {
                            that.list = 0;
                        }
                        that.fadeFun();
                    }

                    for(;i<butArr.length;i++){
                        $(butArr[i]).eq(that.list == that.li.length ? 0 : that.list).siblings().removeClass("on");//æŒ‰é’®æ ·å¼å˜åŒ–
                        $(butArr[i]).eq(that.list == that.li.length ? 0 : that.list).addClass("on");//æŒ‰é’®æ ·å¼å˜åŒ–
                    }
                },
                scrollA: function() {//æ»šåŠ¨åŠ¨ç”»
                    this.animated = true;
                    var that = this, textCss,
                            con = that.arrays[0].config;
                    clearTimeout(that.t);
                    that.rerurnFun(0);
                    con.type == "top" ? textCss = {"top": -parseInt($this.height()) * that.list} : textCss = {"left": -parseInt($this.width()) * that.list};//èŽ·å–æ»šåŠ¨å€¼
                    that.ul.stop(true).textAnimation({"css": textCss, "config": con, callback: function() {
                            if (that.callback) {
                                that.callback();
                                that.callback = null;
                            }
                            that.animated = false;
                            that.rerurnFun(1);
                        }});
                    that.setTime();
                },
                fadeFun: function() {
                    var that = this;
                    clearTimeout(that.t);
                    that.rerurnFun(0);
                    that.li.css('opacity', 1)
                    that.li.eq(that.list).siblings().stop(true).fadeOut(that.arrays[0].config.speed);
                    that.li.eq(that.list).fadeIn(that.arrays[0].config.speed,function(){
                        that.rerurnFun(1);
                    });
                   that.setTime();
                },
                bindFun: function() {
                    var that = this;
                    $(that.but).hover(function() {
                        that.list = $(this).index();
                        that.config("stop");
                        clearTimeout(that.t);
                    },function(){
                        that.setTime();
                    });

                    that.li.hover(function(){
                       clearTimeout(that.t);
                    },function(){
                       that.setTime();
                    });

                    if (that.arrays[0].config.button) {
                        $$(".J_ui_butPost_a").click(function() {
                            if(that.animated){
                                return false;
                            }else{
                              that.list -= 1;
                              that.config("move");
                            }
                        });
                        $$(".J_ui_butPost_b").click(function() {
                            if(that.animated){
                                return false;
                            }else{
                              that.list += 1;
                              that.config("move");
                            }
                        });
                    } else {
                        $$(".J_ui_butPost_b").remove();
                        $$(".J_ui_butPost_a").remove();
                    }
                },
                rerurnFun: function(num) {
                    if(num){
                      !!this.returnAfter && this.returnAfter(this.list == this.li.length?0:this.list);
                    }else{
                      !!this.returnBefore && this.returnBefore(this.list == this.li.length?0:this.list);
                    }
                },
                setTime: function() {
                    var that = this;
                    that.t = setTimeout(function() {
                        that.list += 1;
                        that.config("move");
                    }, that.arrays[0].config.time);
                }
            }
            animates.init.apply(animates, arg);
        });
    }
    var defaults = {css: {"top": 0}, config: {speed: 800, easing: "swing", time: 0}},
    textAnimation = function(a) {
        return this.each(function() {
            var $this = $(this),
                    settings = $.extend(true,{}, defaults, a);
            $this.animate(settings.css, settings.config.speed, settings.config.easing, function() {
                !!settings.callback && settings.callback();
            });
        })
    };
    $.extend(Array.prototype, {

        has: function(value) {
            return this.index(value) !== -1;
        },

        index: function(value) {
            if (this.indexOf) {
                return this.indexOf(value);
            }
            for (var i = 0, l = this.length; i < l; i++) {
                if (value == this[i]) {
                    return i;
                }
            }
            return -1;
        }
    });
    $.fn.extend({
        textAnimation:textAnimation,
        slide: picScroll
    });
})(jQuery);