import {
  addEventOnElements,
  fetchDataFromServer,
  appendToMovieList,
} from "./helpers.js";
import { IMAGE_BASE_URL, API_KEY, API_URL } from "./config.js";
import { sidebar } from "./sidebar.js";
import { search } from "./search.js";
import play_img from "../Images/play_circle.png";

const pageContent = document.querySelector("[page-content]");
sidebar();
search();

fetchDataFromServer(
  `${API_URL}/genre/movie/list?api_key=${API_KEY}`,
  function ({ genres }) {
    for (const { id, name } of genres) {
      genreList[id] = name;
    }
    fetchDataFromServer(
      `${API_URL}/movie/popular?api_key=${API_KEY}&page=1`,
      heroBanner
    );
  }
);

const homePageSections = [
  {
    title: "Upcoming Movies",
    path: "/movie/upcoming",
  },
  {
    title: "Weekly Trending Movies",
    path: "/trending/movie/week",
  },
  {
    title: "Top Rated Movies",
    path: "/movie/top_rated",
  },
];
const genreList = {
  asString(genreIdList) {
    let newGenreList = [];

    for (const genreId of genreIdList) {
      this[genreId] && newGenreList.push(this[genreId]);
    }

    return newGenreList.join(", ");
  },
};

const heroBanner = function ({ results: movieList }) {
  const banner = document.createElement("section");
  banner.classList.add("banner");
  banner.ariaLabel = "Popular movies";
  banner.innerHTML = `
    <div class="banner-slider"></div>
    
    <div class="slider-control">
      <div class="control-inner"></div>
    </div>
  `;

  let controlItemIndex = 0;
  for (const [index, movie] of movieList.entries()) {
    const {
      backdrop_path,
      title,
      release_date,
      genre_ids,
      overview,
      poster_path,
      vote_average,
      id,
    } = movie;

    const sliderItem = document.createElement("div");
    sliderItem.classList.add("slider-item");
    sliderItem.setAttribute("slider-item", "");
    sliderItem.innerHTML = `
      <img src="${IMAGE_BASE_URL}w1280${backdrop_path}" alt="${title}" class="img-cover" loading=${
      index === 0 ? "eager" : "lazy"
    }>
      
      <div class="banner-content">
      
        <h2 class="heading">${title}</h2>
      
        <div class="meta-list">
          <div class="meta-item">${
            release_date?.split("-")[0] ?? "Not Released"
          }</div>
      
          <div class="meta-item card-badge">${vote_average.toFixed(1)}</div>
        </div>
      
        <p class="genre">${genreList.asString(genre_ids)}</p>
      
        <p class="banner-text">${overview}</p>
      
        <a href="./detail.html" class="btn" onclick="getMovieDetail(${id})">
          <img src=${play_img} width="24" height="24" aria-hidden="true" alt="play circle">
      
          <span class="span">Watch Now</span>
        </a>
      
      </div>
    `;

    banner.querySelector(".banner-slider").appendChild(sliderItem);

    const controlItem = document.createElement("button");
    controlItem.classList.add("poster-box", "slider-item");
    controlItem.setAttribute("slider-control", `${controlItemIndex}`);
    controlItemIndex++;
    controlItem.innerHTML = `
      <img src="${IMAGE_BASE_URL}w154${poster_path}" alt="Slide to ${title}" loading="lazy" draggable="false" class="img-cover">
    `;

    banner.querySelector(".control-inner").appendChild(controlItem);
  }

  pageContent.appendChild(banner);
  addHeroSlide();

  for (const { title, path } of homePageSections) {
    fetchDataFromServer(
      `${API_URL}${path}?api_key=${API_KEY}&page=1`,
      createMovieList,
      title
    );
  }
};
const addHeroSlide = function () {
  const sliderItems = document.querySelectorAll("[slider-item]");
  const sliderControls = document.querySelectorAll("[slider-control]");

  let lastSliderItem = sliderItems[0];
  let lastSliderControl = sliderControls[0];

  lastSliderItem.classList.add("active");
  lastSliderControl.classList.add("active");

  const sliderStart = function () {
    lastSliderItem.classList.remove("active");
    lastSliderControl.classList.remove("active");

    sliderItems[Number(this.getAttribute("slider-control"))].classList.add(
      "active"
    );
    this.classList.add("active");

    lastSliderItem = sliderItems[Number(this.getAttribute("slider-control"))];
    lastSliderControl = this;
  };

  addEventOnElements(sliderControls, "click", sliderStart);
};
const createMovieList = function ({ results: movieList }, title) {
  const movieListElem = document.createElement("section");
  movieListElem.classList.add("movie-list");
  movieListElem.ariaLabel = `${title}`;
  movieListElem.innerHTML = `
      <div class="title-wrapper">
        <h3 class="title-large">${title}</h3>
      </div>
      
      <div class="slider-list">
        <div class="slider-inner"></div>
      </div>
    `;

  appendToMovieList(movieListElem, movieList, "slider-inner");
  pageContent.appendChild(movieListElem);
};
