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

// blog post functions

const blogPosts = [
  {
    title:
      "eCommerce Apps: Persisting Guest Cart in Session Storage using React/Redux",
    date: "March 21st, 2023",
    content: `
          <div class = "blog-post"><p>When persisting Guest Cart Storage (ie: storage that is not attached to a user account on your platform or database), we must use the Session Storage within our browser. I stumbled upon this problem while building out an eCommerce app using React and Redux. Every time I refreshed the page after selecting items to go into my guest cart, the items would disappear. </p><iframe src="https://giphy.com/embed/TjhWQnDUv2iJZPn1ae" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/TjhWQnDUv2iJZPn1ae">via GIPHY</a></p><p>Never fear! I am here to assist. For this project I am using a basic boilerplate Redux slice.</p><p>First let’s demonstrate the problem:
          Here, we can successfully add the items to the guest cart by clicking on the “+” button. As you can see- they appear in the cart. Now, when we refresh, they disappear.</p><iframe src="https://giphy.com/embed/AbZ6Oqjpxj46VSO6Z7" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/AbZ6Oqjpxj46VSO6Z7">via GIPHY</a></p><p>Hmm… what to doo? Let’s take a look at our file <code>guestCartSlice.js</code> and see what is happening.</p> <img src = gifs/blog/SessionStoragePost/overview1.png class="blog-image"><p>Here's what's happening in this file:</p>
          <ul>
              <li>-Importing our createSlice function from react/redux toolkit.</li>
              <li>-Setting our initial state to an empty array.</li>
              <li>-Creating our slice and adding simple reducers like "addBook" and "removeBook". These reducers perform as described: adding or removing a book from the guest cart.</li>
              <li>-Exporting the selectGuestCart function to return the state of the guestCart.</li>
              <li>-Exporting "addBook" and "removeBook" as guestCartSlice actions.</li>
              <li>-Finally, exporting our guestCartSlice.reducer.</li>
          </ul>
          <h4>We can fix this disappearing act in a few simple steps!</h4>
    <ol class = "blog-post">
        <li>Let's add a line of code to our <strong>addBook</strong> function - not only do we want to set the book in state, but we also want to set it in our session storage.
            <ul>
                <li>After <code>state.push(action.payload)</code>, we're going to add <code>sessionStorage.setItem(action.payload.title, JSON.stringify(action.payload))</code> - this will set up key-value pairs within our session storage.</li>
            </ul>
        </li>
        <img src = gifs/blog/SessionStoragePost/addBookReducer.png class="blog-image">
        <li>Now we want to change our initialState to something that can communicate with SessionStorage. To do this, we will want to insert a check to see if there is anything within Session storage.</li>
        <li>Let's change our initialState from an empty array to a ternary operator:
            <br>
            <code>const initialState = sessionStorage !== null ? Object.values(sessionStorage).map((currentBook) => { return JSON.parse(currentBook) }) : [];</code>
        </li>
        <img src = gifs/blog/SessionStoragePost/SessionStorageTernary.png class="blog-image">
        <li>Now, save the file and check to see if all is working. You should now see data persist in Session Storage!</li>
        <img src = gifs/blog/SessionStoragePost/sessionStorageDemonstration.png class="blog-image">
        <p>Check out my live demonstration on YouTube. Thanks for reading!</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/igHH0Db7ID4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

    </ol>
    </div>
      `,
  },

  // More blog posts...
];

function displayBlogPosts() {
  const blogSection = document.getElementById("blog-posts");

  blogPosts.forEach((post) => {
    const blogPostDiv = document.createElement("div");
    blogPostDiv.classList.add("blog-post");

    const titleElement = document.createElement("h3");
    titleElement.textContent = post.title;

    const dateElement = document.createElement("h4");
    dateElement.textContent = post.date;

    // Create a container div for the content and image
    const contentContainer = document.createElement("div");
    contentContainer.innerHTML = post.content;

    blogPostDiv.appendChild(dateElement);
    blogPostDiv.appendChild(titleElement);

    blogPostDiv.appendChild(contentContainer);

    blogSection.appendChild(blogPostDiv);
  });
}

window.addEventListener("load", displayBlogPosts);
