'use strict';



/**  
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const navbarLinks = document.querySelectorAll(".navbar-link");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}


addEventOnElements(navTogglers, "click", toggleNavbar);
addEventOnElements(navbarLinks, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
  
});

/**
 * gallery______||
 */
const imgdivs = document.querySelectorAll(".gelaryImags");
const nextImage=document.querySelector("[data-gallery-next-btn]");
const prevImage = document.querySelector("[data-gallery-prev-btn]");
const frontOne = document.querySelector(".frontOne");
const hiddenOne = document.querySelector(".hiddenOne");
const imageSlider = document.querySelector(".image-slider");
let check,autoImgPlay;
function automationOfGellary() {
  autoImgPlay=setInterval(nextimageshow, 4300);
check=false;
}
automationOfGellary();
imageSlider.addEventListener("mouseenter",e=>{
  nextImage.classList.remove("hide");
  prevImage.classList.remove("hide");
  check=false;
playOrStopAutoImage();
})
imageSlider.addEventListener("mouseleave",e=>{
  nextImage.classList.add("hide");
  prevImage.classList.add("hide");
  check=true;
  playOrStopAutoImage();
})
function playOrStopAutoImage(){
  if( check){
    automationOfGellary();
  }
  else{
    clearInterval(autoImgPlay);
  }
}


nextImage.addEventListener("click",()=>{
  nextImage.classList.add("hide2");
  prevImage.classList.add("hide2");
  nextimageshow();
  show();
})
function nextimageshow(){
  let temp = imgdivs[7].classList[0];  
  frontOne.classList.add(temp);
  frontOne.classList.add("nextPhoto");
  setTimeout(() => {
    frontOne.classList.remove('nextPhoto');
    frontOne.classList.remove(temp);
  }, 1800);
  for(let i=7;i>=0;i--){
    if(i==0){
      imgdivs[i].classList.replace(imgdivs[i].classList[0],temp);
    }else{
      imgdivs[i].classList.replace(imgdivs[i].classList[0],imgdivs[i-1].classList[0])
    }
  }
}

prevImage.addEventListener("click",function(){
  let temp = imgdivs[0].classList[0];  
  hiddenOne.classList.remove("nextPhoto");
hiddenOne.classList.add(temp);
nextImage.classList.add("hide2");
prevImage.classList.add("hide2");
setTimeout(() => {
  hiddenOne.classList.add("nextPhoto");
  hiddenOne.classList.remove(temp);
}, 2000);
show();
for(let i=0;i<=7;i++){
  if(i==7){
    imgdivs[i].classList.replace(imgdivs[i].classList[0],temp);
  }else{
    imgdivs[i].classList.replace(imgdivs[i].classList[0],imgdivs[i+1].classList[0])
  }
}
});
function show() {
  setTimeout(() => {
    nextImage.classList.remove("hide2");
    prevImage.classList.remove("hide2");
  }, 3000);
}

const allImgBtnsRapper = document.querySelectorAll(".btn-wrapper");
const imageContainer = document.querySelector(".image-container");
const allImageSlider = document.querySelector(".image-scroller");
const barsRapper = document.querySelector(".bars-wrapper");
const fullScreenImages= document.querySelectorAll(".images");
const fullScreen= document.querySelector("#fullImage");
const root = document.documentElement;
const indexValue=getComputedStyle(root);
let bars;


imageContainer.addEventListener("mouseover", () => {
  allImgBtnsRapper.forEach((e) => {
    e.classList.add("showTheBtns");
    e.childNodes[1].classList.add("makeBig");
  });
});

imageContainer.addEventListener("mouseout", () => {
  allImgBtnsRapper.forEach((e) => {
    e.classList.remove("showTheBtns");
    e.childNodes[1].classList.remove("makeBig");
  });
});



for (let i=0;i<2;i++){
  allImgBtnsRapper[i].addEventListener("click",e=>{

    let imgSliderIndex = parseInt(indexValue.getPropertyValue("--slider-index"));
    let theBtn=e.target.classList[0];
    if(theBtn=='btn1'){
      barsRapper.children[imgSliderIndex].classList.remove('active-bar');
      imgSliderIndex = imgSliderIndex == 0 ? bars-1 : imgSliderIndex - 1;
      root.style.setProperty("--slider-index",imgSliderIndex)
      barsRapper.children[imgSliderIndex].classList.add('active-bar');
    }
    else if(theBtn=="btn2"){
      barsRapper.children[imgSliderIndex].classList.remove('active-bar');
      imgSliderIndex = imgSliderIndex == bars-1 ? 0 : imgSliderIndex + 1;
      root.style.setProperty("--slider-index",imgSliderIndex);
      barsRapper.children[imgSliderIndex].classList.add("active-bar");
    }
  })
}


window.addEventListener("resize",e=>{
calculatePrograssBar();
})
function calculatePrograssBar(progressBar){
barsRapper.innerHTML ="";
const itemCount=allImageSlider.children.length;
const itemPerScreen = parseInt(
  getComputedStyle(allImageSlider).getPropertyValue("--img-per-screen"));
      let imgSliderIndex = parseInt(
        indexValue.getPropertyValue("--slider-index")
      );
const countBar=Math.ceil(itemCount/itemPerScreen);
bars =countBar;
for (let i=0;i<countBar;i++){
  const barItem=document.createElement("div");
  barItem.classList.add("progress");
  barItem.onclick=function (){
    root.style.setProperty("--slider-index", i);
    calculatePrograssBar()
  }
  if(i==imgSliderIndex){
    barItem.classList.add("active-bar");
  }
  barsRapper.appendChild(barItem);
}
}
calculatePrograssBar()
fullScreenImages.forEach(e=>{
  let theImage = e.children[0].src;
  e.addEventListener("click",()=>{
    console.log(e)
    console.log(fullScreen.children[0]);
    fullScreen.children[0].setAttribute("src",theImage);
    fullScreen.classList.remove("hide");
    fullScreen.scrollIntoView({ behavior: "smooth" });
  })
})
fullScreen.addEventListener("click", function (event) {
  if (event.target === fullScreen) {
    fullScreen.classList.add("hide");
    allImageSlider.scrollIntoView({ behavior: "smooth" });
  }
});
swipeEvent(allImageSlider, allImgBtnsRapper);

let touchStart=0 ;
let touchEnd=0 ;

function swipeEvent(theContainer,element) { 
  theContainer.addEventListener("touchstart", (e) => {
    touchStart = e.changedTouches[0].screenX;
  });
  
  theContainer.addEventListener("touchend", (e) => {
    touchEnd = e.changedTouches[0].screenX;

      if (touchStart < touchEnd) {
        element[0].click();
      }
      if (touchStart > touchEnd) {
        element[1].click();
      }
  });
}
