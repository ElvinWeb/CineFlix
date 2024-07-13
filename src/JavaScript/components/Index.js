import {
  addEventOnElements,
  fetchData,
  appendToMovieList,
  ApiUrls,
} from "../helpers.js";
import { IMAGE_BASE_URL } from "../config.js";
import search from "./Search.js";
import sidebar from "./Sidebar.js";
import intro from "./Intro.js";

intro();
sidebar();
search();

function index() {
  const pageContent = document.querySelector("[page-content]");
  let controlItemIndex = 0;
  const homePageSections = [
    {
      title: "Upcoming Movies",
      url: ApiUrls.upcoming,
    },
    {
      title: "Weekly Trending Movies",
      url: ApiUrls.trending,
    },
    {
      title: "Top Rated Movies",
      url: ApiUrls.topRated,
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

    heroBannerMarkup(banner, movieList);

    pageContent.appendChild(banner);
    addHeroSlide();

    for (const { title, url } of homePageSections) {
      fetchData(url, createMovieList, title);
    }
  };
  const heroBannerMarkup = function (banner, movieList) {
    for (const [index, movie] of Object.entries(movieList)) {
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
      
        <a href="/pages/detail.html" class="btn" onclick="getMovieDetail(${id})">
          <img src="/src/Images/play_circle.png" width="24" height="24" aria-hidden="true" alt="play circle">
      
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
    updateIcons();
  };
  fetchData(ApiUrls.genreList, function ({ genres }) {
    for (const { id, name } of genres) {
      genreList[id] = name;
    }
    fetchData(ApiUrls.popular, heroBanner);
  });
}
export default index();
