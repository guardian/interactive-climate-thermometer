import Mustache from 'mustache';

import slidesHTML from './text/slides.html';
import infoHTML from './text/infoPanel.html';
import dataBase from './data/slideData.json';


import { isMobile, isAndroidApp, splitString } from './utils';



var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var androidSpacer = document.querySelector('.android-app-spacer');
var wrapper = document.querySelector('.gv-wrapper');
var container = document.querySelector('.gv-slides-container');
var slides = document.querySelectorAll('.gv-slide');
var panels = document.querySelectorAll('.gv-info-panel');

var transTime = 1000;
var transScaleLength = 5;
var transTimeUnit = transTime/transScaleLength;


function init(){
	console.log(isMobile());
	initData();	
}


function initData(){

	var slidesArrTemp = [];

	var slidesArr = [];

	var splitList = [". ", "? ", "! ","\n"];


	for(var k =0; k<dataBase.length -1; k++){

      		// "slides": "",
		    // "slideRef": "2",
		    // "imageRef": "stats",
		    // "image": "stats slide",
		    // "sentences": "1.5 billion people exposed to heatwaves each year.\n30 million people affected by flooding each year.\n1.5 billion people exposed to increased water stress.",
		    // "": ""

		    if (dataBase[k].slideRef){
		    		var slideObj = {};
		    		slideObj.slideRef = dataBase[k].slideRef;
		    		slideObj.imageRef = dataBase[k].imageRef;
		    		slideObj.sentences = splitString(dataBase[k].sentences, splitList)

		    		slideObj.slideRef > 1 && slideObj.slideRef < 6 ? slideObj.deg = slideObj.slideRef : slideObj.deg = 'na';
		    		slideObj.key = k;
		    		slideObj.timeOne = k * transTime; 
		    		slideObj.timeTwo = slideObj.timeOne + transTimeUnit;
		    		slideObj.timeFour = (k+1) * transTime; 
		    		slideObj.timeThree = slideObj.timeFour - transTimeUnit;

		    		slideObj.sentenceArr = getSentenceArr(slideObj.sentences, slideObj.timeOne)

		    		slidesArr.push(slideObj);
					
				}
		    }


	initView(slidesArr);

}


function getSentenceArr(a, time){
	var t = [];



	var totalTime = transTime/a.length;

	var timeUnit = transTime/4;


		for (var i = 0; i < a.length; i++){
			var o = {}

			o.sentence = a[i];
			o.senTimeOne = (i * transTime) + time + timeUnit;
			o.senTimeTwo =  o.senTimeOne + timeUnit;
			o.senTimeThree =  o.senTimeTwo + timeUnit;
			o.senTimeFour =  o.senTimeThree + timeUnit;


			
			t.push(o)
		}
console.log(t);
	return t;
}



function initView(slidesArr){
	if(isMobile()){			
			initMobile(slidesArr);
			loadApp('app_mobile.js');
		} else {	
			initDesktop(slidesArr)
			loadApp('app.js');
		}
}

function loadApp(file){
	var el = document.createElement('script');
	el.src = `<%= path %>/${file}`;
	document.body.appendChild(el);
}


function initDesktop(slidesArr){

	var w = windowWidth;
	var h = windowHeight;
	var sizeBase = (w >= h) ? w : h;
	var size = sizeBase *1.5;
	var divHeight = h * slides.length;

	wrapper.style.height = divHeight + 'px';
	container.style.height = container.style.width = size + 'px';
	container.classList.add('gv-desktop');
	console.log(size, h, w);

	var slidesData = {
		        slides: slidesArr 
		    };

		addSlidesView(slidesData)

		addInfoView(slidesData)


		
		    

		
	if( w >= h ){
		//container.style.top =  -(.5 * h)*.5 - (size - h)*.5 + "px";
		console.log( (.5 * w) , ( .5 * size ) )

		//container.style.left = (.5 * w) - ( .5 * size ) + 'px';
		container.style.top = (.5 * h) - ( .5 * size ) + 'px';
		//container.style.left = String( -( .5 * size ) )+ "px";
		//container.style.top = String( -( .5 * size ) )+ "px";

		
		positionEls( ( ( size  - h ) * .5  ) + 60 )

	} else {
		// container.style.left = ( -.5 * w) - (.5 * (size -w)) + 'px';
		// container.style.top = ( -.5 * h) - (.5 * (size -h)) + 'px';
		// console.log(w,h, size)

		positionEls(h);
	}


					
			
			//initDesktop(slidesArr);

	
}


function positionEls(h){
	for(var i = 0; i < panels.length; i++){
		var panelEl = panels[i]
		
		panelEl.style.top = `${h}px`
	}

}



function addSlidesView(slidesData){
	var tpl = slidesHTML;
	var tplOp = Mustache.to_html(tpl, slidesData);
	var tgtEl = document.querySelector('.gv-slides-container');
	tgtEl.innerHTML = tplOp;
}


function addInfoView(slidesData){
	var tpl = infoHTML;
	var tplOp = Mustache.to_html(tpl, slidesData);
	var tgtEl = document.querySelector('.gv-info-panel-holder');

	tgtEl.innerHTML = tplOp;
}


// Instantiate CarNav, Draggables, Promote and share panels.
				
// $('.promote-panel').each(function(){ new PromoteLinks(this); });
// $('.photo-mask-wrap').each(function(){ new DragReveal(this); });

function initMobile(initMobile){
	if(isAndroidApp()){
        androidSpacer.style.height = '2000px';
        setTimeout(function(){
        	windowHeight = window.innerHeight;
        	console.log(windowHeight, androidSpacer)
            startMobile();
            androidSpacer.style.height = `${windowHeight}px`;            
        },60)
    } else {
        startMobile();
    }

	
}




function startMobile(){
	wrapper.style.height = windowHeight + 'px';
	container.classList.add('gv-mobile');	
}

init();