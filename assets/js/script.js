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

// gellary

const imgdivs = document.querySelectorAll(".gelaryImags");
const nextImage=document.querySelector("[data-gallery-next-btn]");
const prevImage = document.querySelector("[data-gallery-prev-btn]");
const frontOne = document.querySelector(".frontOne");
const hiddenOne = document.querySelector(".hiddenOne");
const imageSlider = document.querySelector(".image-slider");
let check,autoImgPlay;
function automationOfGellary() {
  autoImgPlay=setInterval(nextimageshow, 4500);
check=true;
}
automationOfGellary();

imageSlider.addEventListener("mouseenter",e=>{
  nextImage.classList.remove("hide");
  prevImage.classList.remove("hide");
playOrStopAutoImage();
})
imageSlider.addEventListener("mouseleave",e=>{
  nextImage.classList.add("hide");
  prevImage.classList.add("hide");
  playOrStopAutoImage();
})
function playOrStopAutoImage(){
  if(!autoImgPlay && !check){
    console.log(check);
    automationOfGellary();
  }
  else{
    console.log(check);
    clearInterval(autoImgPlay);
    check=false;
  }
}












nextImage.addEventListener("click",()=>{
  nextImage.classList.add("hide");
  prevImage.classList.add("hide");
  nextimageshow();
})
function nextimageshow(){
  let temp = imgdivs[7].classList[0];  
  frontOne.classList.add(temp);
  frontOne.classList.add("nextPhoto");
  setTimeout(() => {
    frontOne.classList.remove('nextPhoto');
    frontOne.classList.remove(temp);
    nextImage.classList.remove("hide");
    prevImage.classList.remove("hide");
  }, 1800);
  show();
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
nextImage.classList.add("hide");
prevImage.classList.add("hide");
setTimeout(() => {
  hiddenOne.classList.add("nextPhoto");
  hiddenOne.classList.remove(temp);
}, 1800);
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
    nextImage.classList.remove("hide");
    prevImage.classList.remove("hide");
  }, 2200);
  }