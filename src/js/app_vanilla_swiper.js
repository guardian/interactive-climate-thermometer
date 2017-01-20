import Swiper from 'swiper';



function initMobile(){
    var mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            pagination: '.swiper-pagination',
            paginationClickable: true,
            direction: 'vertical',
            loop: false

        }) 
    //     .on('onTouchStart', function (swiper, e) {
    //         if(isAndroidApp() && window.GuardianJSInterface.registerRelatedCardsTouch){
    //             window.GuardianJSInterface.registerRelatedCardsTouch(true);
    //         }
    //     })
    //     .on('onTouchEnd', function (swiper, e) {
    //         if(isAndroidApp() && window.GuardianJSInterface.registerRelatedCardsTouch){
    //             window.GuardianJSInterface.registerRelatedCardsTouch(false);
    //         }
    //     });


    // if(isAndroidApp()){

    //     androidSpacer.style.height = '2000px';
    //     setTimeout(function(){
    //         console.log(windowHeight, androidSpacer)
    //         androidSpacer.style.height = `${windowHeight}px`;   
    //         //startMobile(a);         
    //     },60)
    // } else {
    //    //startMobile(a);
    // }
}


initMobile();

