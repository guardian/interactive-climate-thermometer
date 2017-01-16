import Mustache from 'mustache';

import slidesHTML from './text/slides.html';
import infoHTML from './text/infoPanel.html';
import degreeHTML from './text/degreePanel.html';

import dataBase from './data/slideData.json';


import { isMobile, isAndroidApp, splitString } from './utils';



var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var androidSpacer = document.querySelector('.android-app-spacer');
var wrapper = document.querySelector('.gv-wrapper');
var container = document.querySelector('.gv-slides-container');
var slides = document.querySelectorAll('.gv-slide');
var panels = document.querySelectorAll('.gv-info-panel');

var transTime = 3000;
var transScaleLength = 5;
var transTimeUnit = transTime/transScaleLength;


function init(){
	console.log(isMobile());
	initData();	
}


function initData(){

	var allEntriesArr = [];

	var splitList = ["\n"];


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

		    		// slideObj.imgT1 = k * transTime; 
		    		// slideObj.imgT2 = slideObj.imgT1 + transTimeUnit;
		    		// slideObj.imgT4 = (k+1) * transTime;
		    		// slideObj.imgT3 = slideObj.imgT4 - transTimeUnit;
		    		

		    		// slideObj.maskT1 = k * transTime; 
		    		// slideObj.maskT2 = slideObj.maskT1 + transTimeUnit;
		    		// slideObj.maskT4 = (k+1) * transTime;
		    		// slideObj.maskT3 = slideObj.maskT4 - transTimeUnit;
		    		 

		    		slideObj.sentenceArr = getSentenceArr(slideObj.sentences, slideObj.timeOne)


		    		dataBase[k].imageRef == 'stats' ? slideObj.statSlideReq = true :  slideObj.statSlideReq = false; 

		    		k > 0 && slideObj.imageRef == dataBase[k-1].imageRef ? slideObj.imgTransReq = false :  slideObj.imgTransReq = true; 

		    		k > 0 && slideObj.slideRef == dataBase[k-1].slideRef ? slideObj.degreeTransReq = false :  slideObj.degreeTransReq = true; 


		    		// for (var i = 0; i < slideObj.sentenceArr.length){



		    		// }


		    		allEntriesArr.push(slideObj);
					
				}
		    }

	
	var allDegreesObj = getDegreeSlidesArr(allEntriesArr)	

	var slidesTimedObj = getTimingsArr(allEntriesArr);

	console.log('slidesTimedObj ',slidesTimedObj)


	addDegreeView(allDegreesObj);


	addSlidesView(slidesTimedObj);


	initView(allEntriesArr);

}

function getTimingsArr(a){
	var markersArr = [];

	var lastObj = a[a.length-1];

	for (var i = 0; i < a.length; i++){

		if ( i > 0 && a[i].imgTransReq ){
			var o = { }

			o.key = a[i].key;
			o.imageRef = a[i].imageRef;
			o.statSlideReq = a[i].statSlideReq;
			o.imgT1 = a[i].timeOne;
			o.imgT2 = a[i].timeTwo;


			markersArr.push(o)


		}
	}

	for (var i = 0; i < markersArr.length; i++){
		if (markersArr[i+1]){

			markersArr[i].imgT3 = markersArr[i+1].imgT1 - transTimeUnit;
			markersArr[i].imgT4 = markersArr[i+1].imgT1;

		}

	}

	var imgsObj = {
		        slides: markersArr 
		    }; 


	return imgsObj;


}

function addDegreeView(degreesObj){

	var tpl = degreeHTML;
	var tplOp = Mustache.to_html(tpl, degreesObj);
	console.log(tplOp)

	var tgtEl = document.querySelector('.gv-big-type-panel');
	tgtEl.innerHTML = tplOp;
}


function getDegreeSlidesArr(a){

	var markersArr = [];

	var lastObj = a[a.length-1];

	for (var i = 0; i < a.length; i++){

		if ( i > 0 && a[i].degreeTransReq ){
			var o = { }

			o.bgclass = 'deg-svg-'+a[i].deg;
			o.key = a[i].key;
			o.t1 = a[i].timeOne;
			o.t2 = a[i].timeTwo;

			markersArr.push(o)


		}
	}

	for (var i = 0; i < markersArr.length; i++){
		if (markersArr[i+1]){


			markersArr[i].t3 = markersArr[i+1].t1 - transTimeUnit;
			markersArr[i].t4 = markersArr[i+1].t1;
			// markersArr[i].t3 = a[markersArr[i+1].key - 1].timeThree;
			// markersArr[i].t4 = a[markersArr[i+1].key - 1].timeFour;
		}

		// else if (!markersArr[i+1]){


		// 	markersArr[i].t3 = markersArr[i].t1 + 6000;
		// 	markersArr[i].t4 = markersArr[i+1].t1 + 6000;
		// 	// markersArr[i].t3 = a[markersArr[i+1].key - 1].timeThree;
		// 	// markersArr[i].t4 = a[markersArr[i+1].key - 1].timeFour;
		// }

	}

	var degreesObj = {
		        degSlides: markersArr 
		    }; 


	return degreesObj;


}


function getSentenceArr(a, time){
	var t = [];

	var tempStep = transTime/a.length;
	

		for (var i = 0; i < a.length; i++){
			var o = {}

			var stepTime = i * tempStep;

				o.sentence = a[i];
				o.key = i;
				o.t1 =  time + stepTime ;
				o.t2 =  time + stepTime +  (transTimeUnit * 2);
				o.t3 =  time + stepTime +  (transTimeUnit * 3);
				o.t4 =  time + stepTime +  (transTimeUnit * 3.5);
			
			t.push(o)
		}

		// for (var i = 0; i < t.length; i++){


		// }

		if (t.length > 1){
			var endT = t[t.length-1].t4;
			var preEndT = t[t.length-1].t3;

			for (var i = 0; i < t.length; i++)
			{
				t[i].t3 = preEndT;
				t[i].t4 = endT;
			}
		}
		// var endT = t[t.length-1].t4;
		// var preEndT = t[t.length-1].t3;

			

	
	return t;
}



function initView(allEntriesArr){
	if(isMobile()){			
			initMobile(allEntriesArr);
			loadApp('app_mobile.js');
		} else {	
			initDesktop(allEntriesArr)
			loadApp('app.js');
		}
}

function loadApp(file){
	var el = document.createElement('script');
	el.src = `<%= path %>/${file}`;
	document.body.appendChild(el);
}


function initDesktop(allEntriesArr){

	var w = windowWidth;
	var h = windowHeight;
	var sizeBase = (w >= h) ? w : h;
	var size = sizeBase * 1.5;
	var divHeight = h * slides.length;

	wrapper.style.height = divHeight + 'px';
	container.style.height = container.style.width = size + 'px';
	container.classList.add('gv-desktop');
	//console.log(allEntriesArr, size, h, w);

	var slidesData = {
		        slides: allEntriesArr 
		    };



		addInfoView(slidesData);


		
	if( w >= h ){
		//container.style.top =  -(.5 * h)*.5 - (size - h)*.5 + "px";
		//console.log( (.5 * w) , ( .5 * size ) )

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


					
			
			//initDesktop(allEntriesArr);

	
		
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