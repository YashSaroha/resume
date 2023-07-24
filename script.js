function init() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });


    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

}

init();

let crsr = document.querySelector(".followCursor")
let main = document.querySelector(".main")
document.addEventListener("mousemove",function(details){
    crsr.style.left = details.x + 20 + "px"
    crsr.style.top = details.y + 20 + "px"
})

function revealToSpan(){
    document.querySelectorAll(".reveal").forEach(function(elem){
        let parent = document.createElement("span")
        let child = document.createElement("span")
    
        parent.classList.add("parent")
        child.classList.add("child")
    
        child.innerHTML = elem.innerHTML
        parent.appendChild(child)
    
        elem.innerHTML = ""
        elem.appendChild(parent)
    })
}

function valueSetters(){
    gsap.set("#nav a", {
        y: "-100%",
        opacity: 0
    })
    gsap.set("#home .parent .child", {
        y: "100%"
    })

    document.querySelectorAll("#Visual>g").forEach(function(e){
        let path = e.childNodes[1].childNodes[1];
        path.style.strokeDasharray = path.getTotalLength() + 'px';
        path.style.strokeDashoffset = path.getTotalLength() + 'px';
    })

}

function loaderAnimation(){
    let tl = gsap.timeline();

    tl.from("#blackLoader .child span",{
        x : 100,
        stagger : 0.1,
        opacity : 0,
        duration : 1,
        ease: Power3.easeInOut
    })

    tl.from("#blackLoader #topHeading",{
        x : "-100%",
        delay : -1,
        opacity : 0,
        duration : 1,
        ease: Power3.easeInOut
    })

    tl.to("#blackLoader .parent .child",{
        y: "-100%",
        duration: 0.8,
        ease: Expo.easeInOut
    })

    tl.to("#blackLoader",{
        height: 0,
        duration: 1,
        ease: Expo.easeInOut
    })

    tl.to("#greenLoader",{
        height: "100%",
        top : 0,
        duration: 1,
        delay: -1,
        ease: Expo.easeInOut
    })

    tl.to("#greenLoader",{
        height: "0%",
        duration: 1.1,
        delay: -0.6,
        ease: Expo.easeInOut,
        onComplete: function(){
            animateHomepage();
        }
    })
}

function animateHomepage(){
    let tl = gsap.timeline()
    
    tl.to("#nav a",{
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: Expo.easeInOut,
    })
    tl.to("#home .parent .child",{
        y: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: Expo.easeInOut,
        onComplete: function(){
            animateSvg();
        }
    })
}

function animateSvg(){

    gsap.to("#Visual>g>g>path , #Visual>g>g>polyline", {
        strokeDashoffset : 0,
        duration : 2,
        ease: Expo.easeInOut,
    })

}

revealToSpan();
valueSetters();
loaderAnimation();

let tl = gsap.timeline()

tl.to(".row .head1",{
    x: -200,
    scrollTrigger : {
        trigger : ".row .head1",
        scroller : ".main",
        // markers : true,
        start : "top 25%",
        end : "top -200%",
        scrub : 1
    }
}, "anim")
tl.to(".row .head2",{
    x: 200,
    scrollTrigger : {
        trigger : ".row .head1",
        scroller : ".main",
        // markers : true,
        start : "top 25%",
        end : "top -200%",
        scrub : 1
    }
}, "anim")

let tl2 = gsap.timeline({
    scrollTrigger : {
        trigger : ".row .head1",
        scroller : ".main",
        // markers : true,
        start : "top 185%",
        end : "top -150%",
        scrub : 1
    }
})
tl2.to(".main",{
    backgroundColor : "#000"
})

gsap.to(".aboutLeft h4",{
    x : 100,
    color : "#14cf93",
    duration : 1,
    repeat : -1,
    yoyo : true,
})

gsap.to(".aboutLeft button",{
    wordSpacing : "0.8vw",
    duration : 1,
    repeat : -1,
    yoyo : true
})

let tl3 = gsap.timeline({
    scrollTrigger : {
        trigger : "#skills",
        scroller : ".main",
        // markers : true,
        start : "top 30%",
        end : "top -50",
        scrub : 1
    }   
})
tl3.to(".main",{
    backgroundColor : "#fcfaf8",
    duration : 5
})
tl3.to("#skills",{
    opacity : 1,
    duration : 3
})

tl3.to("#circle",{
    rotate : 0,
    duration : 5,
    ease : Expo.easeInOut,
    borderColor : "#dadada"
})

// center nav dot
let active = 4;
let navDots = document.querySelectorAll(".navDots")
let second = document.querySelectorAll(".second")

// by default, active the center nav dot and center stripe
gsap.to(navDots[active-1],{
    opacity : 0.8
})
gsap.to(second[active-1],{
    opacity : 1
})

// if any nav dot is clicked
navDots.forEach(function(val , index){
    val.addEventListener("click", function(){
        // rotating the stripes according to the clicked nav dot
        gsap.to("#circle",{
            rotate : (3-index)*10,
            ease : Expo.easeInOut,
            duration : 1,
        })
        // making all nav dots dull
        gsap.to(navDots,{
            opacity : 0.1
        })
        // making all the stripes dull
        gsap.to(second,{
            opacity : 0.4
        })
        // glowing the clicked nav dot
        gsap.to(navDots[index],{
            opacity : 0.8
        })
        // glowing the stripe corresponding to clicked nav dot
        gsap.to(second[index],{
            opacity : 1,
            duration : 1
        })
    })
})


let tl4 = gsap.timeline({
    scrollTrigger : {
        trigger : "#projects",
        scroller : ".main",
        // markers : true,
        start : "top 60%",
        end : "top 0%",
        scrub : 1
    }
})
tl4.to("#skills",{
    backgroundColor : "#000"
},"abc")
tl4.to(".main",{
    backgroundColor : "#000"
},"abc")


let boxes = document.querySelectorAll(".box")
boxes.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        let img = elem.getAttribute("data-image")
        crsr.style.width = "300px"
        crsr.style.height = "300px"
        crsr.style.borderRadius = "0"
        crsr.style.backgroundImage = `url(${img})`
    })
    elem.addEventListener("mouseleave",function(){
        let img = elem.getAttribute("data-image")
        crsr.style.width = "30px"
        crsr.style.height = "30px"
        crsr.style.borderRadius = "50%"
        crsr.style.backgroundImage = `none`
    })
})

let tl5 = gsap.timeline()
tl5.to(".firstName h1",{
    fontSize : "12vw",
    repeat : -1,
    yoyo : true,
    ease : Expo.easeInOut,
    stagger : 0.3
},"name")
tl5.to(".firstName h1",{
    fontSize : "5vw",
    repeat : -1,
    yoyo : true,
    ease : Expo.easeInOut,
})
tl5.to(".lastName h1",{
    fontSize : "12vw",
    repeat : -1,
    yoyo : true,
    ease : Expo.easeInOut,
    stagger : 0.5
},"name")