import {
  fetchData,
  getCasts,
  getDirectors,
  getGenres,
  filterVideos,
  appendToMovieList,
  ApiUrls,
} from "../helpers.js";
import { IMAGE_BASE_URL } from "../config.js";
import sidebar from "./Sidebar.js";
import search from "./Search.js";
import intro from "./Intro.js";

intro();
sidebar();
search();

function movieDetail() {
  const movieId = window.localStorage.getItem("movieId");
  const pageContent = document.querySelector("[page-content]");

  const addSuggestedMovies = function ({ results: movieList }) {
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list");
    movieListElem.ariaLabel = "You May Also Like";
    movieListElem.innerHTML = `
    <div class="title-wrapper">
      <h3 class="title-large">You May Also Like</h3>
    </div>
    <div class="slider-list">
      <div class="slider-inner"></div>
    </div>
  `;
    appendToMovieList(movieListElem, movieList, "slider-inner");
    pageContent.appendChild(movieListElem);
    updateIcons();
  };
  const movieReleatedVideos = function (movieDetail, videos) {
    for (const { key, name } of filterVideos(videos)) {
      const videoCard = document.createElement("div");
      videoCard.classList.add("video-card");
      videoCard.innerHTML = `
      <iframe width="500" height="294" src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0"
        frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" loading="lazy"></iframe>
    `;
      movieDetail.querySelector(".slider-inner").appendChild(videoCard);
      updateIcons();
    }
  };
  const movieDetailMarkup = function (movie) {
    const {
      id,
      backdrop_path,
      poster_path,
      title,
      release_date,
      runtime,
      vote_average,
      releases: {
        countries: [{ certification } = { certification: "N/A" }],
      },
      genres,
      overview,
      casts: { cast, crew },
      videos: { results: videos },
    } = movie;
    document.title = `CineFlix | ${title}`;

    const movieDetail = document.createElement("div");
    movieDetail.classList.add("movie-detail");
    movieDetail.innerHTML = `
    <div class="backdrop-image" style="background-image: url('${IMAGE_BASE_URL}${
      "w1280" || "original"
    }${backdrop_path || poster_path}')"></div>
    
    <figure class="poster-box movie-poster movie-card" movie-id=${id}>
      <div class="icons">
        <span class="icon">
          <span class="favorites" onclick=favorites(this,${id})></span>
        </span>
        <span class="icon">
          <span class="watchlist" onclick=watchList(this,${id})></span>
        </span>
      </div>
      <img src="${IMAGE_BASE_URL}w342${poster_path}" alt="${title} poster" class="img-cover">
    </figure>
    
    <div class="detail-box">
    
      <div class="detail-content">
        <h1 class="heading">${title}</h1>
    
        <div class="meta-list">
    
          <div class="meta-item">
            <img src="/src/Images/star.png" width="20" height="20" alt="rating">
    
            <span class="span">${vote_average.toFixed(1)}</span>
          </div>
    
          <div class="separator"></div>
    
          <div class="meta-item">${runtime}m</div>
    
          <div class="separator"></div>
    
          <div class="meta-item">${
            release_date?.split("-")[0] ?? "Not Released"
          }</div>
    
          <div class="meta-item card-badge">${certification}</div>
    
        </div>
    
        <p class="genre">${getGenres(genres)}</p>
    
        <p class="overview">${overview}</p>
    
        <ul class="detail-list">
    
          <div class="list-item">
            <p class="list-name">Starring</p>
    
            <p>${getCasts(cast)}</p>
          </div>
    
          <div class="list-item">
            <p class="list-name">Directed By</p>
    
            <p>${getDirectors(crew)}</p>
          </div>
    
        </ul>
    
      </div>
    
      <div class="title-wrapper">
        <h3 class="title-large">Trailers and Clips</h3>
      </div>
    
      <div class="slider-list">
        <div class="slider-inner"></div>
      </div>
    
    </div>
    `;
    pageContent.appendChild(movieDetail);
    updateIcons();
    movieReleatedVideos(movieDetail, videos);
  };
  const generateMovieDetail = function (movie) {
    movieDetailMarkup(movie);

    fetchData(ApiUrls.recommendations(movieId), addSuggestedMovies);
  };
  fetchData(ApiUrls.detail(movieId), generateMovieDetail);
}
export default movieDetail();
