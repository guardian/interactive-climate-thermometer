import xr from 'xr';

export var colorsArr = [ '#ff9b0b','#fc8e0e','#f98110','#f67513','#f15c19','#ee4f1c','#eb421f','#e83522','#e52924','#e31f26' ].reverse();


export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export function isAndroidApp() {
    return /Android/i.test(navigator.userAgent);
}

export function isMobile() {
    return (window.innerWidth < 860) ? true : false;
}


export function splitString(string, splitters) {
    var list = [string];
    
    for(var i=0; i < splitters.length; i++) {
        traverseList(list, splitters[i], 0);
    }

    return flatten(list);

}

export function loadData(url){
	return xr.get(url);
}


export function scrollDraw(el) {

    // Get a reference to the <path>
		var path = document.querySelector(el);

		// Get length of path... ~577px in this case
		var pathLength = path.getTotalLength();

		console.log(path)

		// Make very long dashes (the length of the path itself)
		path.style.strokeDasharray = pathLength + ' ' + pathLength;

		// Offset the dashes so the it appears hidden entirely
		path.style.strokeDashoffset = pathLength;

		// Jake Archibald says so
		// https://jakearchibald.com/2013/animated-line-drawing-svg/
		path.getBoundingClientRect();

		// When the page scrolls...
		window.addEventListener("scroll", function(e) {
		 
		  // What % down is it? 
		  // https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript/2387222#2387222
		  // Had to try three or four differnet methods here. Kind of a cross-browser nightmare.
		  var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
		    
		  // Length to offset the dashes
		  var drawLength = pathLength * scrollPercentage;
		  
		  // Draw in reverse
		  path.style.strokeDashoffset = pathLength - drawLength;
		    
		  // When complete, remove the dash array, otherwise shape isn't quite sharp
		 // Accounts for fuzzy math
		  if (scrollPercentage >= 0.99) {
		    path.style.strokeDasharray = "none";
		    
		  } else {
		    path.style.strokeDasharray = pathLength + ' ' + pathLength;
		  }
		  
		});
}




function traverseList(list, splitter, index) {

    if(list[index]) {
        if((list.constructor !== String) && (list[index].constructor === String))

            (list[index] != list[index].split(splitter)) ? list[index] = buildStr(list[index], splitter) : null;
	        (list[index].constructor === Array) ? traverseList(list[index]+splitter, splitter, 0) : null;
	        (list.constructor === Array) ? traverseList(list, splitter, index+1) : null;  

	        
    }
}

function buildStr(str, splitter){

	var a =  str.split(splitter)

	for (var i = 0; i < a.length; i++){
		if (a[i].slice(-1) != splitter) { a[i] = a[i]+splitter }
	}

	return a;
}


function flatten(arr) {
	
	    return arr.reduce(function(acc, val) {
	    	
	    	return acc.concat(val.constructor === Array ? flatten(val) : val);    
	    },[]);

}