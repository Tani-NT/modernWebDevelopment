const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var t1 = gsap.timeline();
    t1.from("#nav",{
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem",{
            y: 0,
            duration: 2,
            delay: -1,
            ease: Expo.easeInOut,
            stagger: .2
        })
        .from("#herofooter",{
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut
        })
}

var timeout;

function mouseCompress(){
    var xscale = 1;
    var yscale = 1;
    
    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout)
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        xscale = gsap.utils.clamp(.6,1.2,xdiff);
        yscale = gsap.utils.clamp(.6,1.2,ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale,yscale);

        timeout = setTimeout(function(){
            document.querySelector("#miniCircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`
        },100)
    });
}

function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#miniCircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
    })
}
circleMouseFollower();
firstPageAnim();
mouseCompress();

document.querySelectorAll(".elem").forEach(function (elem){
    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener("mousemove",function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = rotate - dets.clientY;
        rotate = dets.clientX;
       gsap.to(elem.querySelector("img"),{
        opacity: 1,
        ease: Power3,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20,20,diffrot),
       });
    });
});
document.querySelectorAll(".elem").forEach(function (elem){
    elem.addEventListener("mouseleave",function(dets){
       gsap.to(elem.querySelector("img"),{
        opacity: 0,
        ease: Power3
       });
    });
});

