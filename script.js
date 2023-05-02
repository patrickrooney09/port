// first thing I want to do: add elements via js
let track;
let slides;
let slideWidth;
let dotsNav;
let dots;

// const nextButton = document.querySelector(".carousel_button--right");
// const prevButton = document.querySelector(".carousel_button--left");

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

const rehearseFileNames = [
  "project-images-and-gifs/rehearse-home-page.png",
  "project-images-and-gifs/rehearse-build-scene.png",
  "project-images-and-gifs/rehearse-run-lines.png",
];

const diagonAlleyFileNames = [
  "project-images-and-gifs/diagon-alley-home-page.png",
  "project-images-and-gifs/diagon-alley-cart-and-checkout.png",
  "project-images-and-gifs/diagon-alley-shop.png",
];

const chewsyFileNames = ["project-images-and-gifs/chewsy-pages.png"];

const createCarousel = (fileNames) => {
  if (document.querySelector(".carousel_track") !== null) {
    document.querySelector(".carousel_track").remove();
    document.querySelector(".carousel_nav").remove();
    console.log(document.querySelector(".carousel_track"));
    console.log(document.querySelector(".carousel_nav"));
    document.querySelector(".carousel_button--left").remove();
    document.querySelector(".carousel_button--right").remove();
  }

  const prevButtonImage = document.createElement("img");
  prevButtonImage.src = "icons/png/back.png";
  const nextButtonImage = document.createElement("img");
  nextButtonImage.src = "icons/png/next.png";

  const prevButton = document.createElement("button");
  prevButton.setAttribute("class", "carousel_button");
  prevButton.classList.add("carousel_button--left");
  prevButton.classList.add("is-hidden");
  prevButton.appendChild(prevButtonImage);

  const nextButton = document.createElement("button");
  nextButton.setAttribute("class", "carousel_button");
  nextButton.classList.add("carousel_button--right");
  nextButton.appendChild(nextButtonImage);

  const carousel = document.querySelector(".carousel_track-container");
  document.querySelector(".carousel").appendChild(prevButton);

  const carouselTrack = document.createElement("ul");
  carouselTrack.setAttribute("class", "carousel_track");
  carousel.appendChild(carouselTrack);

  const carouselNav = document.createElement("div");
  carouselNav.setAttribute("class", "carousel_nav");
  document.querySelector(".carousel").appendChild(nextButton);
  document.querySelector(".carousel").appendChild(carouselNav);

  fileNames.forEach((currentImage, index) => {
    const carousel = document.querySelector(".carousel_track");
    const carouselSlide = document.createElement("li");

    const img = document.createElement("img");
    img.src = currentImage;
    img.setAttribute("class", "carousel-image");

    carouselSlide.setAttribute("class", "carousel_slide");
    if (index === 0) {
      carouselSlide.classList.add("current-slide");
    }
    carouselSlide.appendChild(img);

    carousel.appendChild(carouselSlide);

    const carouselDot = document.createElement("button");
    carouselDot.setAttribute("class", "carousel_indicator");
    if (index === 0) {
      // carouselDot.setAttribute("class", "current-slide");
      carouselDot.classList.add("current-slide");
    }
    carouselNav.appendChild(carouselDot);
  });

  track = document.querySelector(".carousel_track");
  slides = Array.from(track.children);
  slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach(setSlidePosition);
  dotsNav = document.querySelector(".carousel_nav");
  dots = Array.from(dotsNav.children);

  dotsNav.addEventListener("click", (e) => {
    // what did we click on
    console.log("hello");
    const targetDot = e.target.closest("button");
    if (!targetDot) return;

    const currentSlide = track.querySelector(".current-slide");
    const currentDot = dotsNav.querySelector(".current-slide");
    const targetIndex = dots.findIndex((dot) => dot === targetDot);
    const targetSlide = slides[targetIndex];
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);

    hideShowArrows(slides, prevButton, nextButton, targetIndex);
  });

  nextButton.addEventListener("click", (e) => {
    console.log("hello");
    let currentSlide = track.querySelector(".current-slide");
    let nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector(".current-slide");
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex((slide) => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
  });

  prevButton.addEventListener("click", (e) => {
    let currentSlide = track.querySelector(".current-slide");
    let previousSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector(".current-slide");
    const previousDot = currentDot.previousElementSibling;
    const previousIndex = slides.findIndex((slide) => slide === previousSlide);

    moveToSlide(track, currentSlide, previousSlide);
    updateDots(currentDot, previousDot);
    hideShowArrows(slides, prevButton, nextButton, previousIndex);
  });
};
createCarousel(rehearseFileNames);

function darkMode() {
  let element = document.getElementsByClassName("opening-page");
  element[0].classList.toggle("dark-mode");
}

const hover = (element) => {
  element = document.getElementById(`${element.id}-img`);
  element.setAttribute("src", `icons/png/${element.id}-dark.png`);
};
const unhover = (element) => {
  element = document.getElementById(`${element.id}-img`);
  element.setAttribute("src", `icons/png/${element.id}.png`);
};

const projectButtons = [
  ...document.querySelectorAll(".project-selector"),
].forEach((currentButton) => {
  currentButton.addEventListener("click", () => {
    if (currentButton.innerText === "Diagon Alley Online") {
      createCarousel(diagonAlleyFileNames);
    }
    if (currentButton.innerText === "Rehearse") {
      createCarousel(rehearseFileNames);
    }
    if (currentButton.innerText === "Chewsy") {
      createCarousel(chewsyFileNames);
    }
  });
});

// arrange slides next to one another

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};
// when i click left move slides to left
// prevButton.addEventListener("click", (e) => {
//   let currentSlide = track.querySelector(".current-slide");
//   let previousSlide = currentSlide.previousElementSibling;
//   const currentDot = dotsNav.querySelector(".current-slide");
//   const previousDot = currentDot.previousElementSibling;
//   const previousIndex = slides.findIndex((slide) => slide === previousSlide);

//   moveToSlide(track, currentSlide, previousSlide);
//   updateDots(currentDot, previousDot);
//   hideShowArrows(slides, prevButton, nextButton, previousIndex);
// });
// // when i click right move slides to the right
// nextButton.addEventListener("click", (e) => {
//   console.log("hello");
//   let currentSlide = track.querySelector(".current-slide");
//   let nextSlide = currentSlide.nextElementSibling;
//   const currentDot = dotsNav.querySelector(".current-slide");
//   const nextDot = currentDot.nextElementSibling;
//   const nextIndex = slides.findIndex((slide) => slide === nextSlide);

//   moveToSlide(track, currentSlide, nextSlide);
//   updateDots(currentDot, nextDot);
//   hideShowArrows(slides, prevButton, nextButton, nextIndex);
// });

// // when i click the nav indicators move to that slide
// dotsNav.addEventListener("click", (e) => {
//   // what did we click on
//   console.log("hello");
//   const targetDot = e.target.closest("button");
//   if (!targetDot) return;

//   const currentSlide = track.querySelector(".current-slide");
//   const currentDot = dotsNav.querySelector(".current-slide");
//   const targetIndex = dots.findIndex((dot) => dot === targetDot);
//   const targetSlide = slides[targetIndex];
//   moveToSlide(track, currentSlide, targetSlide);
//   updateDots(currentDot, targetDot);

//   hideShowArrows(slides, prevButton, nextButton, targetIndex);
// });
