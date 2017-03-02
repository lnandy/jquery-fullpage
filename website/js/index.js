$(function(){
    $('#dowebok').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90'],
        navigationTooltips: ['1','2','3','4'],
        'navigation': true,
        loopBottom: true
    });
    $('#last').on('click',function(){
        imgAutoChange.changeImgGoLast();
    });
    $('#next').on('click',function(){
        imgAutoChange.changeImgGoNext();
    });
});

var imgAutoChange = function(){
    var me = this;
    me.ifload = false;
    me.hasShow = [];
    me.drawware = [];
    me.showing = [];
    me.goAwayForNext = 'translateX(-500px) translateZ(0px)';
    me.goShowForNext = 'translateX(0px) translateZ(0px)';
    me.goWareForNext = 'translateX(500px) translateZ(0px)';
    me.goAwayForLast = 'translateX(500px) translateZ(0px)';
    me.goShowForLast = 'translateX(0px) translateZ(0px)';
    me.goWareForLast = 'translateX(-500px) translateZ(0px)';
    me.autochange = setInterval(function() {
        me.changeImgGoNext();
    }, 3000);
    me.getConstant = function() {
        var dom = document.getElementById('draw_show');
        var arrayLi = dom.getElementsByTagName('li');
        for (var i = 0; i < arrayLi.length; i++) {
            if (i == 0) {
                showing.push(arrayLi[i]);
            } else if (i > 1) {
                hasShow.push(arrayLi[i]);
            } else {
                drawware.push(arrayLi[i]);
            }
        }
        hasShow.reverse();
    };

    me.changeImgGoNext = function() {
        clearInterval(autochange);
        if (ifload == false) {
            ifload = true;
            me.getConstant();
        }
        //移走正在显示的img,移动到已经显示过的仓库，并放到最前边。
        var moveShowing = showing.shift();
        me.transform(moveShowing, goAwayForNext, '400ms');
        hasShow.splice(0, 0, moveShowing);
        //展示需要显示的img,并把需要展示的list里面将已经展示的移除
        var moveToWare = drawware.shift();
        me.transform(moveToWare, goShowForNext, '400ms');
        showing.push(moveToWare);
        //准备下次需要显示的img
        var nextImg = hasShow.pop();
        me.transform(nextImg, goWareForNext, '0ms');
        drawware.push(nextImg);
        autochange = setInterval(function() {
            me.changeImgGoNext();
        }, 3000);
    };

    me.changeImgGoLast = function() {
        clearInterval(autochange);
        if (ifload == false) {
            ifload = true;
            me.getConstant();
        }
        //(反向)移走正在显示的img,移动到已经显示过的仓库，并放到最前边。
        var moveShowing = showing.shift();
        me.transform(moveShowing, goAwayForLast, '400ms');
        drawware.splice(0, 0, moveShowing);
        //(反向)展示需要显示的img,并把需要展示的list里面将已经展示的移除
        var moveToWare = hasShow.shift();
        me.transform(moveToWare, goShowForLast, '400ms');
        showing.push(moveToWare);
        //(反向)准备下次需要显示的img
        var nextImg = drawware.pop();
        me.transform(nextImg, goWareForLast, '0ms');
        hasShow.push(nextImg);
        autochange = setInterval(function() {
            me.changeImgGoNext();
        }, 3000);
    };

    me.transform = function(dom, pix, time) {
        dom.style.transform = pix;
        dom.style.transitionDuration = time;
    };
    return me;
}();