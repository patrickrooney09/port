let track;
let slides;
let slideWidth;
let dotsNav;
let dots;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

const rehearseFileNames = [
  "gifs/rehearse/rehearsehomescreengif.mp4",
  "gifs/rehearse/buildscriptrehearsegif.mp4",
  "gifs/rehearse/buildscenerehearsegif.mp4",
  "gifs/rehearse/runlinesrehearse.mp4",
];

const rehearseDescription =
  "Rehearse is a line learner app for actors. It is also a fantastic study companion. Built on custom flashcard technology to assist in the line memorization process, Rehearse is ideal for anyone learning lines, a new language, or studying vocabulary.";

const diagonAlleyFileNames = [
  "gifs/diagonalleyonline/diagonalleyhomepage.mp4",
  "gifs/diagonalleyonline/diagonalleycheckout.mp4",
];
const diagonAlleyDescription =
  "We solemnly swear we are up to no good. Bringing the magical products of Harry Potter to the muggle world. A full scale e-commerce app. Olivander's now open. Mischeif managed.";

const chewsyFileNames = [
  "gifs/chewsy/chewsylogin.mp4",
  "gifs/chewsy/addtogroup.mp4",

  "gifs/chewsy/chewsycreategroup.mp4",
  "gifs/chewsy/chewsemomentchewsy.mp4",
  "gifs/chewsy/editprofile.mp4",
];
const chewsyDescription =
  "Chewsy is an iOS app for indecisive foodies. Build on the back of Yelp's powerful API, Chewsy connects you with your friends and recommends a restaurant by collecting the dietary preferences, restrictions, and location of the group for their next event.";

const createCarousel = (fileNames, description) => {
  if (document.querySelector(".carousel_track") !== null) {
    document.querySelector(".carousel_track").remove();
    document.querySelector(".carousel_nav").remove();
    document.querySelector(".carousel_button--left").remove();
    document.querySelector(".carousel_button--right").remove();
  }

  const projectDescription = document.getElementById("project-description");

  if (projectDescription.classList.contains("slide-in")) {
    projectDescription.classList.remove("slide-in");
  }
  projectDescription.innerText = description;
  projectDescription.classList.add("slide-in");

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
    const video = document.createElement("video");
    video.muted = true;
    video.loop = true;
    video.setAttribute("src", currentImage);
    video.setAttribute("autoplay", "");
    video.setAttribute("preload", "auto");
    video.setAttribute("class", "carousel-image");

    carouselSlide.setAttribute("class", "carousel_slide");
    if (index === 0) {
      carouselSlide.classList.add("current-slide");
    }
    carouselSlide.appendChild(video);

    carousel.appendChild(carouselSlide);

    const carouselDot = document.createElement("button");
    carouselDot.setAttribute("class", "carousel_indicator");
    if (index === 0) {
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
createCarousel(rehearseFileNames, rehearseDescription);

function darkMode() {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
  } else {
    document.body.classList.add("dark-mode");
  }
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
      createCarousel(diagonAlleyFileNames, diagonAlleyDescription);
    }
    if (currentButton.innerText === "Rehearse") {
      createCarousel(rehearseFileNames, rehearseDescription);
    }
    if (currentButton.innerText === "Chewsy") {
      createCarousel(chewsyFileNames, chewsyDescription);
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

//section observer
const nav = document.getElementsByTagName("nav");
console.log(nav);
const sectionOne = document.querySelector(".opening-page");
const sectionOneOptions = {
  rootMargin: "-500px 0px 0px 0px",
};
const sectionOneObserver = new IntersectionObserver(function (
  entries,
  sectionOneObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      nav[0].classList.add("nav-scrolled");
    } else {
      nav[0].classList.remove("nav-scrolled");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);
