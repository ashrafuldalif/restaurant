"use strict";

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
};

/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const languageBtn = document.querySelector("[data-select-language]");
const marginIssue = document.querySelector("[data-margin-issue]");
const navbarLinks = document.querySelectorAll(".navbar-link");
const allOptions = languageBtn.querySelectorAll("li");
const alltxt = document.querySelectorAll(".lang");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  languageBtn.classList.toggle("posRelative");
  marginIssue.classList.toggle("margin-right");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);
addEventOnElements(navbarLinks, "click", toggleNavbar);

const languageUl = languageBtn.querySelector("ul");

document.addEventListener("click", function (event) {
  if (!event.target.closest("[data-select-language]")) {
    languageUl.classList.add("hide");
  }
});

languageBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  languageUl.classList.toggle("hide");
});

const findTheLnaguage = (e) => {
  let theSelectedLeng = e.target.getAttribute("data-lang");
  languageBtn.querySelector(".selectedLang").innerHTML = theSelectedLeng;
  console.log(theSelectedLeng);
  changeTheLanguage(theSelectedLeng);
};
addEventOnElements(allOptions, "click", findTheLnaguage);

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
};

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
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
};

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseover",
  function () {
    clearInterval(autoSlideInterval);
  }
);

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseout",
  autoSlide
);

window.addEventListener("load", autoSlide);

/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {
  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerHeight) * 10 - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - x * 2;
  y = y - y * 2;

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
const nextImage = document.querySelector("[data-gallery-next-btn]");
const prevImage = document.querySelector("[data-gallery-prev-btn]");
const frontOne = document.querySelector(".frontOne");
const hiddenOne = document.querySelector(".hiddenOne");
const imageSlider = document.querySelector(".image-slider");
let check, autoImgPlay;
function automationOfGellary() {
  autoImgPlay = setInterval(nextimageshow, 4300);
  check = false;
}
automationOfGellary();
imageSlider.addEventListener("mouseenter", (e) => {
  nextImage.classList.remove("hide");
  prevImage.classList.remove("hide");
  check = false;
  playOrStopAutoImage();
});
imageSlider.addEventListener("mouseleave", (e) => {
  nextImage.classList.add("hide");
  prevImage.classList.add("hide");
  check = true;
  playOrStopAutoImage();
});
function playOrStopAutoImage() {
  if (check) {
    automationOfGellary();
  } else {
    clearInterval(autoImgPlay);
  }
}

nextImage.addEventListener("click", () => {
  nextImage.classList.add("hide2");
  prevImage.classList.add("hide2");
  nextimageshow();
  show();
});
function nextimageshow() {
  let temp = imgdivs[7].classList[0];
  frontOne.classList.add(temp);
  frontOne.classList.add("nextPhoto");
  setTimeout(() => {
    frontOne.classList.remove("nextPhoto");
    frontOne.classList.remove(temp);
  }, 1800);
  for (let i = 7; i >= 0; i--) {
    if (i == 0) {
      imgdivs[i].classList.replace(imgdivs[i].classList[0], temp);
    } else {
      imgdivs[i].classList.replace(
        imgdivs[i].classList[0],
        imgdivs[i - 1].classList[0]
      );
    }
  }
}

prevImage.addEventListener("click", function () {
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
  for (let i = 0; i <= 7; i++) {
    if (i == 7) {
      imgdivs[i].classList.replace(imgdivs[i].classList[0], temp);
    } else {
      imgdivs[i].classList.replace(
        imgdivs[i].classList[0],
        imgdivs[i + 1].classList[0]
      );
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
const fullScreenImages = document.querySelectorAll(".images");
const fullScreen = document.querySelector("#fullImage");
const root = document.documentElement;
const indexValue = getComputedStyle(root);
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

for (let i = 0; i < 2; i++) {
  allImgBtnsRapper[i].addEventListener("click", (e) => {
    let imgSliderIndex = parseInt(
      indexValue.getPropertyValue("--slider-index")
    );
    let theBtn = e.target.classList[0];
    if (theBtn == "btn1") {
      barsRapper.children[imgSliderIndex].classList.remove("active-bar");
      imgSliderIndex = imgSliderIndex == 0 ? bars - 1 : imgSliderIndex - 1;
      root.style.setProperty("--slider-index", imgSliderIndex);
      barsRapper.children[imgSliderIndex].classList.add("active-bar");
    } else if (theBtn == "btn2") {
      barsRapper.children[imgSliderIndex].classList.remove("active-bar");
      imgSliderIndex = imgSliderIndex == bars - 1 ? 0 : imgSliderIndex + 1;
      root.style.setProperty("--slider-index", imgSliderIndex);
      barsRapper.children[imgSliderIndex].classList.add("active-bar");
    }
  });
}

window.addEventListener("resize", (e) => {
  calculatePrograssBar();
});
function calculatePrograssBar(progressBar) {
  barsRapper.innerHTML = "";
  const itemCount = allImageSlider.children.length;
  const itemPerScreen = parseInt(
    getComputedStyle(allImageSlider).getPropertyValue("--img-per-screen")
  );
  let imgSliderIndex = parseInt(indexValue.getPropertyValue("--slider-index"));
  const countBar = Math.ceil(itemCount / itemPerScreen);
  bars = countBar;
  for (let i = 0; i < countBar; i++) {
    const barItem = document.createElement("div");
    barItem.classList.add("progress");
    barItem.onclick = function () {
      root.style.setProperty("--slider-index", i);
      calculatePrograssBar();
    };
    if (i == imgSliderIndex) {
      barItem.classList.add("active-bar");
    }
    barsRapper.appendChild(barItem);
  }
}
calculatePrograssBar();
fullScreenImages.forEach((e) => {
  let theImage = e.children[0].src;
  e.addEventListener("click", () => {
    fullScreen.children[0].setAttribute("src", theImage);
    fullScreen.classList.remove("hide");
    fullScreen.scrollIntoView({ behavior: "smooth" });
  });
});
fullScreen.addEventListener("click", function (event) {
  if (event.target === fullScreen) {
    fullScreen.classList.add("hide");
    allImageSlider.scrollIntoView({ behavior: "smooth" });
  }
});
swipeEvent(allImageSlider, allImgBtnsRapper);

let touchStart = 0;
let touchEnd = 0;

function swipeEvent(theContainer, element) {
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

const fullmenu = document.querySelector("[data-fullmenu]");
const fullmenuBtn = document.querySelectorAll("[data-fullmenu-btn]");
const showHideFullMenu = () => {
  fullmenu.classList.toggle("hide");
  fullmenuBtn[0].classList.toggle("hide");
  fullmenuBtn[1].classList.toggle("hide");
};
addEventOnElements(fullmenuBtn, "click", showHideFullMenu);

const menuImages = document.querySelectorAll(".menu .img-cover");
const fulViewMenuPhoto = document.querySelector("#fullViewMenuPhoto");
let currentElement;

function getPosition(el) {
  let yPos = 0;

  while (el && el.parentElement) {
    yPos += el.offsetTop;

    el = el.parentElement;
  }
  return yPos;
}

menuImages.forEach((e) => {
  e.addEventListener("click", () => {
    currentElement = e;
    let Themenuimage = e.src;
    let Y = getPosition(currentElement);
    console.log(Y / 10);
    fulViewMenuPhoto.style.marginTop = `${Y / 20}px`;
    fulViewMenuPhoto.firstChild.setAttribute("src", Themenuimage);
    fulViewMenuPhoto.classList.toggle("hide");
    header.classList.add("hide2");
    document.body.classList.toggle("nav-active");
    fulViewMenuPhoto.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
fulViewMenuPhoto.addEventListener("click", (e) => {
  if (e.target === fulViewMenuPhoto) {
    fulViewMenuPhoto.classList.add("hide");
    header.classList.remove("hide2");
    document.body.classList.toggle("nav-active");
    currentElement.scrollIntoView({ behavior: "smooth", block: "center" });
    fulViewMenuPhoto.style.marginTop = 0;
  }
});





// RESERVATION starts from here __________________________



const Reservation = document.querySelector("#reservation");
const rtime = Reservation.querySelector("#timeInput");
const rsubmitBtn = Reservation.querySelector("#submitBtn");
const Rdate = Reservation.querySelector("#dateInput");
const PlaceTime = Reservation.querySelector("#time");
let traditionalClock = false;
let currentTime;
let hours;
let minutes;
let seconds;
let formattedTime;
let amorPm;

PlaceTime.addEventListener("click", () => {
  traditionalClock = !traditionalClock;
});
function convertTime(h) {
  if (h > 12) {
    h = h - 12;
    amorPm = "PM";
  } else if (h == 0) {
    h = 12;
    amorPm = "AM";
  } else {
    amorPm = "AM";
  }
  let theHour = h.toString().padStart(2, "0");
  formattedTime = `${theHour} : ${minutes} : ${seconds} ${amorPm}`;
}
const setTime = () => {
  setInterval(() => {
    currentTime = new Date();
    hours = currentTime.getHours().toString().padStart(2, "0");
    minutes = currentTime.getMinutes().toString().padStart(2, "0");
    seconds = currentTime.getSeconds().toString().padStart(2, "0");
    formattedTime = `${hours} : ${minutes} : ${seconds}`;
    if (traditionalClock) {
      convertTime(currentTime.getHours());
    }
    PlaceTime.innerHTML = formattedTime;
    Rdate.min = new Date().toISOString().split("T")[0];
  }, 1000);
};
setTime();
function theDate(){
  const year = new Date().getFullYear();
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const day = new Date().getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function chackingTime(){

  if ( theDate()== Rdate.value) {
    if (new Date().getHours() >= 14) {
      Rdate.innerHTML = "";
    }
    for (var i = 0; i < rtime.options.length; i++) {
      if (rtime.options[i].value < minTime) {
        rtime.options[i].disabled = true;
      }
    }
  }
}
Rdate.addEventListener('change',chackingTime)

//   // Set the minimum time to the current time
//   rtime.min = new Date().toTimeString().split(" ")[0];

//   const isAfter2PM = hours > 14;


rsubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

// RESERVATION ends here ______________________________

const languageData = {
  english: {
    words: [
      "Daily : 8.00 am to 10.00 pm",
      "Home",
      "Menus",
      "Gallery",
      "About Us",
      "Contact",
      "Language",
      "Visit Us",
      "Open: 9.30 am - 2.30pm",
      "Booking Request",
      "Find A Table",
      "Find A Table",
      "Tradational & Hygine",
      "For the love of",
      "delicious food",
      "Come with family & feel the joy of mouthwatering food",
      "View Our Menu",
      "View Our Menu",
      "delightful experience",
      "Flavors Inspired by",
      "the Seasons",
      "Come with family & feel the joy of mouthwatering food",
      "View Our Menu",
      "View Our Menu",
      "amazing & delicious",
      "Where every flavor",
      "tells a story",
      "Come with family & feel the joy of mouthwatering food",
      "View Our Menu",
      "View Our Menu",
      "Book A Table",
      "Flavors For Royalty",
      "We Offer Top Notch",
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industrys standard dummy text ever.",
      "Breakfast",
      "View Menu",
      "Appetizers",
      "View Menu",
      "Drinks",
      "View Menu",
      "Gallery",
      "Memories",
      "All Images",
      "Our Story",
      "Every Flavor Tells a Story",
      "Lorem Ipsum is simply dummy text of the printingand typesetting industry lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book It has survived not only five centuries, but also the leap into.",
      "Book Through Call",
      "Read More",
      "Read More",
      "Special Dish",
      " Lorem Ipsum is simply dummy text of the printingand typesetting industry lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type.",
      "View All Menu",
      "View All Menu",
      "Special Selection",
      "Delicious Menu",
      "Seasonal",
      " Tomatoes, green bell pepper, sliced cucumber onion, olives, and feta cheese.",
      "Vegetables, cheeses, ground meats, tomato sauce,seasonings and spices",
      "Typesetting industry lorem Lorem Ipsum is simply dummy text of the priand.",
      "New",
      " Vegetables, cheeses, ground meats, tomato sauce, seasonings and spices.",
      "Avocados with crab meat, red onion, crab salad stuffed red bell pepper and green bell pepper.",
      "Vegetables, cheeses, ground meats, tomato sauce, seasonings and spices",
      "Special Selection",
      "Delicious Menu",
      "Seasonal",
      " Tomatoes, green bell pepper, sliced cucumber onion, olives, and feta cheese.",
      "Seasonal",
      "Tomatoes, green bell pepper, sliced cucumber onion, olives, and feta cheese.",
      "Seasonal",
      " Tomatoes, green bell pepper, sliced cucumber onion, olives, and feta cheese.",
      " During winter daily from to",
      "View All Menu",
      "View All Menu",
      "I wanted to thank you for inviting me down for that amazing dinner the other night. The food was extraordinary.",
      "Online Reservation",
      "Booking request",
      "or fill out the order form",
      "1 person",
      "2 person",
      "3 person",
      "4 person",
      "5 person",
      "6 person",
      "7 person",
      "8 person",
      "9 person",
      "10 person",
      "11 person",
      "12 person",
      "13 person",
      "14 person",
      "15 person",
      "16 person",
      "17 person",
      "18 person",
      "19 person",
      "20 person",
      "21 person",
      "22 person",
      "23 person",
      "24 person",
      "25 person",
      "26 person",
      "27 person",
      "28 person",
      "29 person",
      "30 person",
      "08 : 00 AM",
      "09 : 00 AM",
      "10 : 00 AM",
      "11 : 00 AM",
      "12 : 00 AM",
      "01 : 00 PM",
      "02 : 00 PM",
      "03 : 00 PM",
      "04 : 00 PM",
      "05 : 00 PM",
      "06 : 00 PM",
      "07 : 00 PM",
      "08 : 00 PM",
      "09 : 00 PM",
      "10 : 00 PM",
      "Book A Table",
      "Book A Table",
      "Contact Us",
      "Booking Request",
      "Location",
      "Lunch Time",
      "Monday to Sunday ",
      "11.00 am - 2.30pm",
      "Dinner Time",
      "Monday to Sunday ",
      "05.00 pm - 10.00pm",
      "Why Choose Us",
      "Our Strength",
      "Hygienic Food",
      " Lorem Ipsum is simply dummy printing and typesetting.",
      "Fresh Environment",
      "Lorem Ipsum is simply dummy printing and typesetting.",
      "Skilled Chefs",
      "Lorem Ipsum is simply dummy printing and typesetting.",
      "Event & Party",
      "Lorem Ipsum is simply dummy printing and typesetting.",
      "Recent Updates",
      "Upcoming Event",
      "Food, Flavour",
      "Flavour so good you’ll try to eat with your eyes.",
      "Healthy Food",
      "Flavour so good you’ll try to eat with your eyes.",
      "Recipie",
      "Flavour so good you’ll try to eat with your eyes.",
      "View Our Blog",
      "View Our Blog",
      "Booking Request ",
      "Open : 09:00 am - 01:00 pm",
      "Thank You",
      "for visiting our website .",
      "Home",
      "Menus",
      "About Us",
      "Gallery",
      "Contact",
    ],
    extras: ["Your Name", "Phone Number", "Message"],
  },

  japanese: {
    words: [
      "毎日 : 午前 8 時から午後 10 時まで",
      "家",
      "メニュー",
      "ギャラリー",
      "私たちについて",
      "接触",
      "言語",
      "ご来店ください",
      "営業時間: 午前9時30分～午後2時30分",
      "予約リクエスト",
      "テーブルを探す",
      "テーブルを探す",
      "伝統と衛生",
      "の愛のために",
      "おいしい食べ物",
      "家族と一緒に、おいしい食べ物の喜びを感じてください",
      "メニューを見る",
      "メニューを見る",
      "楽しい経験",
      "インスピレーションを受けたフレーバー",
      "季節",
      "家族と一緒に、おいしい食べ物の喜びを感じてください",
      "メニューを見る",
      "メニューを見る",
      "素晴らしくて美味しい",
      "あらゆる味がどこにあるのか",
      "物語を語る",
      "家族と一緒に、おいしい食べ物の喜びを感じてください",
      "メニューを見る",
      "メニューを見る",
      "席を予約する",
      "ロイヤリティーのためのフレーバー",
      "一流のものを提供します",
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industrys standard dummy text ever.",
      "朝食",
      "メニューを見る",
      "前菜",
      "メニューを見る",
      "ドリンク",
      "メニューを見る",
      "ギャラリー",
      "思い出",
      "すべての画像",
      "私たちの物語",
      "すべてのフレーバーが物語を語る",
      "Lorem Ipsum is simply dummy text of the printingand typesetting industry lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book It has survived not only five centuries, but also the leap into.",
      "電話で予約する",
      "続きを読む",
      "続きを読む",
      "特別料理",
      " Lorem Ipsum is simply dummy text of the printingand typesetting industry lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type.",
      "すべて見るメニュー",
      "すべて見るメニュー",
      "特選",
      "おいしいメニュー",
      "季節限定",
      "トマト、ピーマン、キュウリ、玉ねぎのスライス、オリーブ、フェタチーズ",
      "野菜、チーズ、ひき肉、トマトソース、調味料、スパイス",
      "Typesetting industry lorem Lorem Ipsum is simply dummy text of the priand.",
      "新しい",
      " 野菜、チーズ、ひき肉、トマトソース、調味料、スパイス",
      "アボカドとカニ肉、赤玉ねぎ、赤ピーマンとグリーンピーマンを詰めたカニサラダ。",
      "野菜、チーズ、ひき肉、トマトソース、調味料、スパイス",
      "特選",
      "おいしいメニュー",
      "季節限定",
      "トマト、ピーマン、キュウリ、玉ねぎのスライス、オリーブ、フェタチーズ。",
      "季節限定",
      "トマト、ピーマン、キュウリ、玉ねぎのスライス、オリーブ、フェタチーズ。",
      "季節限定",
      "トマト、ピーマン、キュウリ、玉ねぎのスライス、オリーブ、フェタチーズ。",
      "冬の間は毎日 から まで",
      "すべて見るメニュー",
      "すべて見るメニュー",
      "先日は素晴らしいディナーにご招待いただき、ありがとうございました。 食事は格別でした。",
      "オンライン予約",
      "予約リクエスト",
      "または注文フォームにご記入ください",
      "1人",
      "2人",
      "3人",
      "4人",
      "5人",
      "6人",
      "7人",
      "8人",
      "9人",
      "10人",
      "11人",
      "12人",
      "13人",
      "14人",
      "15人",
      "16人",
      "17人",
      "18人",
      "19人",
      "20人",
      "21人",
      "22人",
      "23人",
      "24人",
      "25人",
      "26人",
      "27人",
      "28人",
      "29人",
      "30人",
      "午前8時",
      "午前9時",
      "午前10時",
      "午前11時",
      "午前12時",
      "午後1時",
      "午後2時",
      "午後3時",
      "午後4時",
      "午後5時",
      "午後6時",
      "午後7時",
      "午後8時",
      "午後9時",
      "午後10時",
      "席を予約する",
      "席を予約する",
      "お問い合わせ",
      "予約リクエスト",
      "位置",
      "ランチタイム",
      "月曜日から日曜日まで",
      "午前11時～午後2時30分",
      "夕食の時間",
      "月曜日から日曜日まで",
      "午後5時～午後10時",
      "私たちを選ぶ理由",
      "私たちの強み",
      "衛生食品",
      " Lorem Ipsum is simply dummy printing and typesetting.",
      "新鮮な環境",
      "Lorem Ipsum is simply dummy printing and typesetting.",
      "熟練したシェフ",
      "Lorem Ipsum is simply dummy printing and typesetting.",
      "イベント＆パーティー",
      "Lorem Ipsum is simply dummy printing and typesetting.",
      "最近の更新",
      "これから起きる出来事",
      "食べ物、味",
      "Flavour so good you’ll try to eat with your eyes.",
      "健康食品",
      "Flavour so good you’ll try to eat with your eyes.",
      "レシピ",
      "Flavour so good you’ll try to eat with your eyes.",
      "私たちのブログを見る",
      "私たちのブログを見る",
      "予約リクエスト",
      "営業時間 : 09:00 am - 01:00 pm",
      "ありがとう",
      "私たちのウェブサイトにアクセスしてください。",
      "家",
      "メニュー",
      "私たちについて",
      "ギャラリー",
      "接触",
    ],
    extras: ["あなたの名前", "電話番号", "メッセージ"],
  },
};
const Placeholders = document.querySelectorAll(".input-lang");
function changeTheLanguage(language) {
  for (let i = 0; i < 162; i++) {
    alltxt[i].textContent = languageData[language].words[i];
  }
  for (let i = 0; i < 3; i++) {
    let trnasOfPlaceholders = languageData[language].extras[i];
    Placeholders[i].setAttribute("placeholder", trnasOfPlaceholders);
  }
}
