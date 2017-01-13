import Mustache from 'mustache';

import slidesHTML from './text/slides.html';
import dataBase from './data/slideData.json';


import { isMobile, isAndroidApp, splitString } from './utils';



var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var androidSpacer = document.querySelector('.android-app-spacer');
var wrapper = document.querySelector('.gv-wrapper');
var container = document.querySelector('.gv-slides-container');
var slides = document.querySelectorAll('.gv-slide');
var panels = document.querySelectorAll('.gv-info-panel');


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

		    		slidesArr.push(slideObj);
					
				}
		    }


	initView(slidesArr);

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

		
	if( w >= h ){
		//container.style.top =  -(.5 * h)*.5 - (size - h)*.5 + "px";
		console.log( (.5 * w) , ( .5 * size ) )

		//container.style.left = (.5 * w) - ( .5 * size ) + 'px';
		container.style.top = (.5 * h) - ( .5 * size ) + 'px';
		//container.style.left = String( -( .5 * size ) )+ "px";
		//container.style.top = String( -( .5 * size ) )+ "px";

		
		//positionEls( ( ( size  - h ) * .5  ) + 60 )

	} else {
		// container.style.left = ( -.5 * w) - (.5 * (size -w)) + 'px';
		// container.style.top = ( -.5 * h) - (.5 * (size -h)) + 'px';
		// console.log(w,h, size)

		//positionEls(h);
	}


			var tpl = slidesHTML;

			var slidesData = {
		        slides: slidesArr 
		    };

		    var tplOp = Mustache.to_html(tpl, slidesData);

		    console.log(tplOp)

		    var tgtEl = document.querySelector('.gv-desktop');


		    tgtEl.innerHTML = tplOp;		
			
			//initDesktop(slidesArr);

	
}


function positionEls(h){
	for(var i = 0; i < panels.length; i++){
		var panelEl = panels[i]
		
		panelEl.style.top = `${h}px`
	}

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