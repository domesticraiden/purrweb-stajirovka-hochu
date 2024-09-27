const nextBtn = document.querySelector(".slider__next");
const prevBtn = document.querySelector(".slider__prev");

const slides = document.querySelectorAll(".slider__slide");

const container = document.querySelector(".slider__slides");
const containerStyles = getComputedStyle(container);
const containerWidth = parseInt(containerStyles.width);

const speed = 5;

let currSlide = 0;

const paginate = () => {
  const createPaginationDots = () => {
    const paginationDots = document.querySelector(".slider__pagination-dots");

    for (let i = 0; i < slides.length; i++) {
      const paginationDot = createPaginationBtns(i);

      paginationDots.append(paginationDot);
    }
  };

  const createPaginationBtns = (slide) => {
    const paginationDot = document.createElement("li");
    const paginationBtn = document.createElement("button");

    paginationDot.classList.add("slider__pagination-dot");
    paginationBtn.classList.add("slider__pagination-btn");

    paginationBtn.classList.add("pacifico-regular-secondary");

    paginationBtn.textContent = slide + 1;
    paginationBtn.setAttribute("index", slide);

    paginationDot.append(paginationBtn);

    if (currSlide === slide) {
      paginationBtn.classList.add("active");
    }
    return paginationDot;
  };

  function updatePaginationBtns(index) {
    let paginationBtns = document.querySelectorAll(".slider__pagination-btn");
    paginationBtns.forEach((paginationBtn) => {
      paginationBtn.addEventListener("click", () => {
        if (currSlide < paginationBtn.getAttribute("index")) {
          nextPagination(paginationBtn.getAttribute("index") - currSlide);
        } else {
          prevPagination(paginationBtn.getAttribute("index"));
        }
        changeActivePaginationBtn();
      });
    });
  }

  async function nextPagination(paginationBtn) {
    disablePaginationBtns();
    for (let i = 0; i < paginationBtn; i++) {
      if (i === paginationBtn) {
        return;
      } else {
        disableButtons();

        nextSlide(containerWidth, speed, true);

        await sleep((containerWidth / speed / 100) * 0.5);
      }
    }

    enableButtons();
    enablePaginationBtns();
  }

  async function prevPagination(paginationBtn) {
    disablePaginationBtns();

    for (let i = currSlide; i > paginationBtn; i--) {
      if (i === paginationBtn) {
        return;
      } else {
        disableButtons();

        prevSlide(containerWidth, speed, true);

        await sleep((containerWidth / speed / 100) * 0.5);
      }
    }

    enableButtons();
    enablePaginationBtns();
  }

  createPaginationDots();
  updatePaginationBtns(currSlide);
};

function enablePaginationBtns() {
  let paginationBtns = document.querySelectorAll(".slider__pagination-btn");
  paginationBtns.forEach((paginationBtn) => {
    paginationBtn.disabled = false;
  });
}

function disablePaginationBtns() {
  let paginationBtns = document.querySelectorAll(".slider__pagination-btn");
  paginationBtns.forEach((paginationBtn) => {
    paginationBtn.disabled = true;
  });
}

function changeActivePaginationBtn() {
  let activePaginationBtn = document.querySelector(".active");
  activePaginationBtn.classList.remove("active");

  event.target.classList.add("active");
}

async function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

function disableButtons() {
  nextBtn.disabled = true;
  prevBtn.disabled = true;
}

function enableButtons() {
  nextBtn.disabled = false;
  prevBtn.disabled = false;
}

nextBtn.addEventListener("click", () => nextSlide(containerWidth, speed));
async function nextSlide(width, speed, isPagination = false) {
  disableButtons();
  disablePaginationBtns();

  let nextSlide = currSlide + 1;
  if (nextSlide === slides.length) {
    nextSlide = 0;
  }

  let currSlidePos = width;
  let nextSlidePos = 0;

  let animationNext = setInterval(frame, 1);

  slides[nextSlide].classList.remove("inactive");

  if (!isPagination) {
    changeActivePaginationBtn(nextSlide);
  }

  function frame() {
    if (currSlidePos == 0) {
      clearInterval(animationNext);

      slides[currSlide].classList.add("inactive");

      slides[currSlide].style = "";
      slides[nextSlide].style = "";

      currSlide++;

      if (currSlide === slides.length) {
        currSlide = 0;
      }
    } else {
      currSlidePos -= speed;
      nextSlidePos -= speed;

      slides[nextSlide].style.left = currSlidePos + "px";
      slides[currSlide].style.left = nextSlidePos + "px";
    }
  }

  await sleep((containerWidth / speed / 100) * 0.5);

  if (!isPagination) {
    enableButtons();
    enablePaginationBtns();
  }
}

prevBtn.addEventListener("click", () => prevSlide(containerWidth, speed));
async function prevSlide(width, speed, isPagination = false) {
  disableButtons();
  disablePaginationBtns();

  let prevSlide = currSlide - 1;
  if (prevSlide < 0) {
    prevSlide = slides.length - 1;
  }

  let currSlidePos = width;
  let prevSlidePos = 0;

  let animationPrev = setInterval(frame, 1);

  slides[prevSlide].classList.remove("inactive");

  if (!isPagination) {
    changeActivePaginationBtn(prevSlide);
  }

  function frame() {
    if (currSlidePos == 0) {
      clearInterval(animationPrev);

      slides[currSlide].classList.add("inactive");

      slides[currSlide].style = "";
      slides[prevSlide].style = "";

      currSlide--;

      if (currSlide < 0) {
        currSlide = slides.length - 1;
      }
    } else {
      currSlidePos -= speed;
      prevSlidePos -= speed;

      slides[prevSlide].style.right = currSlidePos + "px";
      slides[currSlide].style.right = prevSlidePos + "px";
    }
  }

  await sleep((containerWidth / speed / 100) * 0.5);

  if (!isPagination) {
    enableButtons();
    enablePaginationBtns();
  }
}

paginate();
