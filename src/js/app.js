import Mustache from 'mustache';

import skrollr from './skrollr';

import { loadData, colorsArr, scrollDraw} from './utils';

import { cleanData, transTimeUnit } from './data';

loadData("https://interactive.guim.co.uk/docsdata-test/1OuB-22W0Ll6GFSSiLtMTzI3IQnbE2cFkMpvd8Tgu8lw.json").then((resp) => {
	init(resp.data.sheets.Sheet1);
});

import desktopHTML from './text/desktop.html'
import slidesHTML from './text/slides.html';
import infoHTML from './text/infoPanel.html';
import degreeHTML from './text/degreePanel.html';

var androidSpacer = document.querySelector('.android-app-spacer');
var wrapper = document.querySelector('.gv-wrapper');
var container = document.querySelector('.gv-slides-container');
var atomContainer = document.querySelector('.is-immersive-interactive');
var slides = document.querySelectorAll('.gv-slide');
var panels = document.querySelectorAll('.gv-info-panel');

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

function init(data){
	
	var cleanedData = cleanData(data);

	console.log('desktop init', cleanedData);

	initDesktop(cleanedData);

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


	var allDegreesObj = getDegreeSlidesArr(allEntriesArr)	

	var slidesTimedObj = getTimingsArr(allEntriesArr);


	addDegreeView(allDegreesObj);


	addSlidesView(slidesTimedObj);


	scrollDraw('#temperatureLine');


	atomContainer.classList.add('gv-gradient-bg');


	skrollr.init();
	
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
		}

	}

	var degreesObj = {
		        degSlides: markersArr 
		    }; 


	return degreesObj;


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


function addDegreeView(degreesObj){

	var tpl = degreeHTML;
	var tplOp = Mustache.to_html(tpl, degreesObj);

	var tgtEl = document.querySelector('.gv-big-type-panel');
	tgtEl.innerHTML = tplOp;
}


function getTimingsArr(a){
	var markersArr = [];

	var lastObj = a[a.length-1];

		for (var i = 0; i < a.length; i++){

			if ( i > 0 && a[i].imgTransReq || a[i].introTransReq ){
				var o = { }

					o.key = a[i].key;
					o.imageRef = a[i].imageRef;
					o.image = a[i].image;
					o.statSlideReq = a[i].statSlideReq;
					o.introTransReq = a[i].introTransReq;
					o.outroTransReq = a[i].outroTransReq;
					o.bColor = a[i].bColor;
					o.imgT1 = a[i].timeOne;
					o.imgT2 = a[i].timeTwo;

				o.statSlideReq ? o.holdTransReq = true :  o.holdTransReq = false;

				markersArr.push(o)

			}
	}

	for (var i = 0; i < markersArr.length; i++){

		if (markersArr[i+1]){
			markersArr[i].imgT3 = markersArr[i+1].imgT1 - transTimeUnit;
			markersArr[i].imgT4 = markersArr[i+1].imgT1;


			
		}

	}


	for (var i = 0; i < markersArr.length; i++){

		if (markersArr[i+1] && markersArr[i+1].statSlideReq){
			console.log('amend time here ', markersArr[i], ' to here ',markersArr[i+1])

			markersArr[i].imgT3 = markersArr[i+1].imgT3;
		 	markersArr[i].imgT4 = markersArr[i+1].imgT4;

		 	//console.log('AMENDED time here ', markersArr[i])
		}	

	}

	var imgsObj = {
		        slides: markersArr 
		    }; 


	//console.log(imgsObj)		    

	return imgsObj;


}




