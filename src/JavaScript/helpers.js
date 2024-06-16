import createMovieCard from "./movieCard.js";
import { API_KEY } from "./config.js";

const addEventOnElements = function (elements, eventType, callback) {
  for (const elem of elements) elem.addEventListener(eventType, callback);
};
const appendToMovieList = function (movieListElem, movieList, className) {
  for (const movie of movieList) {
    const movieListCard = createMovieCard(movie);
    movieListElem.querySelector(`.${className}`).appendChild(movieListCard);
  }
};
const fetchData = function (url, callback, optionalParam) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data, optionalParam))
    .catch((error) => console.log(error));
};
const getGenres = function (genreList) {
  const newGenreList = [];
  for (const { name } of genreList) {
    newGenreList.push(name);
  }
  return newGenreList.join(",");
};
const getCasts = function (castList) {
  const newCastList = [];
  for (let i = 0, len = castList.length; i < len && i < 10; i++) {
    const { name } = castList[i];
    newCastList.push(name);
  }

  return newCastList.join(",");
};
const getDirectors = function (crewList) {
  const directors = crewList.filter(({ job }) => job === "Director");
  const newDirectorList = [];
  for (const { name } of directors) {
    newDirectorList.push(name);
  }
  return newDirectorList.join(",");
};
const filterVideos = function (videoList) {
  return videoList.filter(
    ({ type, site }) =>
      (type === "Trailer" || type === "Teaser") && site === "YouTube"
  );
};
const animateSpans = function (spans, step) {
  spans.forEach((span, i) => {
    setTimeout(() => {
      span.classList.add("active");
    }, (i + 1) * step);
  });
};
const removeAndAddClass = function (spans, delay, step) {
  setTimeout(() => {
    spans.forEach((span, i) => {
      setTimeout(() => {
        span.classList.remove("active");
        span.classList.add("fade");
      }, (i + 1) * step);
    });
  }, delay);
};
const hideElement = function (element, delay) {
  setTimeout(() => {
    element.style.top = "-100vh";
  }, delay);
};
const ApiUrls = {
  genreList: `https://api.themoviedb.org/3/genre/movie/list?`,
  popular: `https://api.themoviedb.org/3/movie/popular?`,
  topRated: `https://api.themoviedb.org/3/movie/top_rated?`,
  upcoming: `https://api.themoviedb.org/3/movie/upcoming?`,
  trending: `https://api.themoviedb.org/3/trending/movie/week?`,
  genre: `https://api.themoviedb.org/3/genre/movie/list?`,
  recommendations(id) {
    return `https://api.themoviedb.org/3/movie/${id}/recommendations?page=1`;
  },
  discover(urlParam, currentPage) {
    return `https://api.themoviedb.org/3/discover/movie?&page=${currentPage}&${urlParam}`;
  },
  detail(id) {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=casts,videos,images,releases`;
  },
  search(query) {
    return `https://api.themoviedb.org/3/search/movie?query=${query}`;
  },
};

export {
  addEventOnElements,
  appendToMovieList,
  fetchData,
  getCasts,
  getGenres,
  getDirectors,
  filterVideos,
  animateSpans,
  removeAndAddClass,
  hideElement,
  ApiUrls,
};
