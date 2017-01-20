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

loadData("https://interactive.guim.co.uk/docsdata-test/1OuB-22W0Ll6GFSSiLtMTzI3IQnbE2cFkMpvd8Tgu8lw.json").then((resp) => {
    init(resp.data.sheets.Sheet1);
});


function init(data){
    var cleanedData = cleanData(data);     
    console.log('mobile init', cleanedData);
    initMobile(cleanedData);
}


function initMobile(a){
    var mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            pagination: '.swiper-pagination',
            paginationClickable: true,
            direction: 'vertical',
            loop: false

        }) 
        .on('onTouchStart', function (swiper, e) {
            if(isAndroidApp() && window.GuardianJSInterface.registerRelatedCardsTouch){
                window.GuardianJSInterface.registerRelatedCardsTouch(true);
            }
        })
        .on('onTouchEnd', function (swiper, e) {
            if(isAndroidApp() && window.GuardianJSInterface.registerRelatedCardsTouch){
                window.GuardianJSInterface.registerRelatedCardsTouch(false);
            }
        });


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
    
    wrapper.style.height = windowHeight + 'px';
    // container.style.height = size + 'px';
    // container.classList.add('gv-mobile');   

    var slidesData = {
                slides: a 
            };

            console.log(wrapper);

    addMobileSlidesView(slidesData);

        // scrollDraw();
}

function addMobileSlidesView(slidesData){
    var tpl = mobileSlides;
    var tplOp = Mustache.to_html(tpl, slidesData);
    var tgtEl = document.querySelector('.swiper-wrapper');

            console.log('MOBILEslidesData',tplOp)


    tgtEl.innerHTML = tplOp;
}

