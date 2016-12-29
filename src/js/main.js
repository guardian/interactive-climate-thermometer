var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var isMobile = (windowWidth < 860) ? true : false;

var wrapper = document.querySelector('.gv-wrapper');
var container = document.querySelector('.gv-slides-container');
var slides = document.querySelectorAll('.gv-slide');

function init(){

	

	console.log(isMobile)

	if(isMobile){
		//if mobile, display as card-based interface
		loadApp('app_mobile.js');
		initMobile();
		
	} else {
		//if desktop then use scroller and animate
		loadApp('app.js');
		initDesktop();

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
	var sizeBase = (w >= h) ? w : h;
	var size = sizeBase *1.5;
	var divHeight = h * slides.length;

	wrapper.style.height = divHeight + 'px';
	container.style.height = container.style.width = size + 'px';
	console.log(size, h, w)
	if( w >= h ){
		//container.style.top =  -(.5 * h)*.5 - (size - h)*.5 + "px";
		console.log( (.5 * w) , ( .5 * size ) )

		container.style.left = (.5 * w) - ( .5 * size ) + 'px';
		container.style.top = (.5 * h) - ( .5 * size ) + 'px';
		//container.style.left = String( -( .5 * size ) )+ "px";
		//container.style.top = String( -( .5 * size ) )+ "px";
	} else {
		// container.style.left = ( -.5 * w) - (.5 * (size -w)) + 'px';
		// container.style.top = ( -.5 * h) - (.5 * (size -h)) + 'px';
		// console.log(w,h, size)
	}
}

function initMobile(){
	wrapper.style.height = windowHeight + 'px';

}






init();