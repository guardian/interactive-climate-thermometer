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