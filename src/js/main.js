import { isMobile, isAndroidApp } from './utils';

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var androidSpacer = document.querySelector('.android-app-spacer');
var wrapper = document.querySelector('.gv-wrapper');
var container = document.querySelector('.gv-slides-container');
var slides = document.querySelectorAll('.gv-slide');

var slideContents = document.querySelectorAll('.gv-slide-content');



function init(){

	

	console.log(isMobile())

	if(isMobile()){
		//if mobile, display as card-based interface
		
		initMobile();
		loadApp('app_mobile.js');
	} else {
		//if desktop then use scroller and animate
		
		initDesktop();
		loadApp('app.js');
	}


	
}	

function loadApp(file){
	var el = document.createElement('script');
	el.src = `<%= path %>/${file}`;
	document.body.appendChild(el);
}

function initDesktop(){
	var w = windowWidth;
	var h = windowHeight;

	//w > 1280 ? w = 1280 : w = w;

	var sizeBase = (w >= h) ? w : h;
	var size = sizeBase *1.5;
	

	var divHeight = h * slides.length;

	wrapper.style.height = divHeight + 'px';
	container.style.height = container.style.width = sizeBase + 'px';
	container.classList.add('gv-desktop');
	console.log(size, h, w)
	if( w >= h ){
		//container.style.top =  -(.5 * h)*.5 - (size - h)*.5 + "px";
		console.log( (.5 * w) , ( .5 * size ) )


		container.style.left = '0px'; //(.5 * w) - ( .5 * size ) + 'px';
		//container.style.top =  (.5 * h) - ( .5 * size ) + 'px';//(.5 * h) - ( .5 * size ) + 'px';


		for (var k = 0; k < slides.length; k++){
		var slideEl = slides[k];
		var elSize = sizeBase;	

		elSize > 1280 ? elSize = 1280 : elSize = slSize;
		
			slideEl.style.height =  elSize+'px' 
		

	}

		//container.style.left = String( -( .5 * size ) )+ "px";
		//container.style.top = String( -( .5 * size ) )+ "px";
	} else {
		// container.style.left = ( -.5 * w) - (.5 * (size -w)) + 'px';
		// container.style.top = ( -.5 * h) - (.5 * (size -h)) + 'px';
		// console.log(w,h, size)
	}
}

function initMobile(){
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