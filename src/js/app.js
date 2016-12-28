import skrollr from './skrollr'

let windowWidth = window.innerWidth;
let isMobile = (windowWidth < 860) ? true : false;

function init(){


	if(isMobile){
		//if mobile, display as card-based interface
		initMobile();
		
	} else {
		//if desktop then use scroller and animate
		initDesktop();
		
	}

}

function initDesktop(){
	skrollr.init();
}

function initMobile(){
	
}



init();