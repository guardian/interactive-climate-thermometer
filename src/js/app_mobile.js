import Swiper from 'swiper'
import { isMobile, isAndroidApp } from './utils';


function init(){

	console.log('mobile init');

	var mySwiper = new Swiper ('.swiper-container', {
		// Optional parameters
		direction: 'vertical',
		loop: false

	}) 
	.on('onTouchStart', function (swiper, e) {
        if(isAndroidApp() && window.GuardianJSInterface.registerRelatedCardsTouch){
            window.GuardianJSInterface.registerRelatedCardsTouch(true);
        }
    })
    .on('onTouchEnd', function (swiper, e) {
        if(isAndroidApp() && window.GuardianJSInterface.registerRelatedCardsTouch){
            window.GuardianJSInterface.registerRelatedCardsTouch(false);
        }
    });

}

init();