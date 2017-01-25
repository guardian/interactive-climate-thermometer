import { splitString, colorsArr } from './utils';

var transTime = 1800;
var transScaleLength = 5;
export var transTimeUnit = transTime/transScaleLength;


export function cleanData(dataBase){

	var allEntriesArr = [];

	var splitList = ["\n"];


			for(var k =0; k<dataBase.length; k++){

				    if (dataBase[k].slideRef){

				    		var slideObj = {};
				    		slideObj.slideRef = dataBase[k].slideRef;

				    		slideObj.imageRef = dataBase[k].imageRef;

				    		slideObj.image = dataBase[k].imageRef;

				    		slideObj.bColor = colorsArr[slideObj.slideRef];
				    		slideObj.para = dataBase[k].sentences;
				    		slideObj.sentences = splitString(dataBase[k].sentences, splitList);

				    		slideObj.slideRef > 1 && slideObj.slideRef < 7 ? slideObj.deg = slideObj.slideRef : slideObj.deg = 'na';
				    		slideObj.key = k;

				    		slideObj.timeOne = k * transTime; 
				    		slideObj.timeTwo = slideObj.timeOne + transTimeUnit;
				    		slideObj.timeFour = (k+1) * transTime; 
				    		slideObj.timeThree = slideObj.timeFour - transTimeUnit;

				    		slideObj.color1 = colorsArr[slideObj.slideRef];
				    		
				    		slideObj.sentenceArr = getSentenceArr(slideObj.sentences, slideObj.timeOne)

				    		dataBase[k].imageRef == 'stats' ? slideObj.statSlideReq = true :  slideObj.statSlideReq = false; 


				    		k > 0 && slideObj.imageRef == dataBase[k-1].imageRef ? slideObj.imgTransReq = false :  slideObj.imgTransReq = true; 

				    		k == 0 ? slideObj.introTransReq = true : slideObj.introTransReq = false;  

							k > 0 && slideObj.slideRef == dataBase[k-1].slideRef ? slideObj.degreeTransReq = false :  slideObj.degreeTransReq = true; 

							slideObj.slideRef == 6 ? slideObj.outroTransReq = true :  slideObj.outroTransReq = false; 

				    		slideObj.slideRef ==  1  ? slideObj.introTextReq = true :  slideObj.introTextReq = false; 

				    		slideObj.slideRef == 6  ? slideObj.outroTextReq = true :  slideObj.outroTextReq = false; 

				    		slideObj.slideRef != 6  && slideObj.slideRef !=  1 ? slideObj.slideTextReq = true :  slideObj.slideTextReq = false; 

				    		allEntriesArr.push(slideObj);

							
						}
				    }

				for (var i=0; i < allEntriesArr.length; i++){
					i == 0 ? allEntriesArr[i].color2 = colorsArr[1] : allEntriesArr[i].color2 = allEntriesArr[i-1].color1; 

				}	    


	return allEntriesArr;

}


function checkForSource(s){
	var string = s,
    substring = "(source";
    var bool = 	string.includes(substring)

	return bool;
}




function getSentenceArr(a, time){
	var t = [];

	var tempStep = transTime/a.length;
	

		for (var i = 0; i < a.length; i++){
			var o = {}

			var stepTime = i * tempStep;

				o.sentence = a[i];
				o.containsSource = checkForSource(o.sentence)
				o.key = i;
				o.t1 =  time + stepTime;
				o.t2 =  time + stepTime + (transTimeUnit);
				o.t3 =  time + stepTime + (transTimeUnit * 2);
				o.t4 =  time + stepTime + (transTimeUnit * 2.5);
			
			t.push(o)
		}



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