var el = document.createElement('script');
el.src = '<%= path %>/app.js';
document.body.appendChild(el);

function init(){
	var wrapper = document.querySelector('.gv-wrapper');
	var container = document.querySelector('.gv-slides-container');
	var slides = document.querySelectorAll('.gv-slide');
	var w = window.innerWidth;
	var h = window.innerHeight;
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

init();