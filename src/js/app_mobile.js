import Mustache from 'mustache';
import Swiper from 'swiper';
import { } from './utils';
import { cleanData, transTimeUnit } from './data';
import { loadData, colorsArr, isMobile, isAndroidApp, splitString } from './utils';

import mobileSlides from './text/mobileSlides.html';

var windowWidth = window.innerWidth || document.documentElement.clientWidth  || document.body.clientWidth;
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var androidSpacer = document.querySelector('.androidSpacer');
var wrapper = document.querySelector('.swiper-wrapper');

wrapper.style.height = windowHeight + 'px';

loadData("https://interactive.guim.co.uk/docsdata-test/1OuB-22W0Ll6GFSSiLtMTzI3IQnbE2cFkMpvd8Tgu8lw.json").then((resp) => {
    init(resp.data.sheets.Sheet1);
});


function init(data){
    var cleanedData = cleanData(data);     
    initMobile(cleanedData);
}


function initMobile(a){

    if(isAndroidApp()){

        androidSpacer.style.height = '2000px';
        setTimeout(function(){
            console.log(windowHeight, androidSpacer)
            androidSpacer.style.height = `${windowHeight}px`;   
            startMobile(a);         
        },60)
    } else {
       startMobile(a);
    }
}


function startMobile(a){
    var w = windowWidth;
    var h = windowHeight;
    var sizeBase = (w >= h) ? w : h;
    var size = sizeBase * 1;
    var divHeight = h * a.length;
    var slidesData = {
                slides: a 
            };

            console.log(wrapper);

    addMobileSlidesView(slidesData);
    // scrollDraw();
}

function addMobileSlidesView(slidesData){

    console.log(slidesData.slides)

    // var tpl = mobileSlides;
    // var tplOp = Mustache.to_html(tpl, slidesData);
    var tgtEl = document.querySelector('.swiper-wrapper');

    

    var tplOp = "";

    for (var i = 0; i < slidesData.slides.length; i++){
        var o = slidesData.slides[i]
        var s = "<div class='swiper-slide'  id='mobileSlide_"+o.key+"' >"
            s+= "<h1>"+o.slideRef+"</h1>";
            s+= "<h2>"+o.key+"</h2></div>";
            
        tplOp += s;             
        
    }



    console.log(tplOp)
    
    tgtEl.innerHTML = tplOp;

    addSwiper();
}

function addSwiper(){
    var mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            pagination: '.swiper-pagination',
            paginationClickable: true,
            direction: 'vertical',
            loop: false

        }) 
        // .on('onTouchStart', function (swiper, e) {
        //     if(isAndroidApp() && window.GuardianJSInterface.registerRelatedCardsTouch){
        //         window.GuardianJSInterface.registerRelatedCardsTouch(true);
        //     }
        // })
        // .on('onTouchEnd', function (swiper, e) {
        //     if(isAndroidApp() && window.GuardianJSInterface.registerRelatedCardsTouch){
        //         window.GuardianJSInterface.registerRelatedCardsTouch(false);
        //     }
        // });
}

