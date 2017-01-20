import { isMobile } from './utils';


function initView(){
	if(isMobile()){			
			
			loadApp('app_mobile.js');
		} else {	
			
			loadApp('app.js');
		}
}


function loadApp(file){
	var el = document.createElement('script');
	el.src = `<%= path %>/${file}`;
	document.body.appendChild(el);
}


initView();