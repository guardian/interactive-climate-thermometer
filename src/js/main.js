import { isMobile , debounce } from './utils';

var checkForResizeFn = debounce(function() {
	//initView();
	console.log("RESIZED ")
}, 2000);

function initView(){
	if(isMobile()){		
			loadApp('app_mobile.js');
		} else {	
			loadApp('app.js');
		}

		window.addEventListener('resize', checkForResizeFn);
}


function loadApp(file){
	var el = document.createElement('script');
	el.src = `<%= path %>/${file}`;
	document.body.appendChild(el);
}

initView();


