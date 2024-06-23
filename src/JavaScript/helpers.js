import createMovieCard from "./movieCard.js";
import { API_KEY, API_URL } from "./config.js";

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
  genreList: `${API_URL}/genre/movie/list?api_key=${API_KEY}`,
  popular: `${API_URL}/movie/popular?api_key=${API_KEY}&page=1`,
  topRated: `${API_URL}/movie/top_rated?api_key=${API_KEY}&page=1`,
  upcoming: `${API_URL}/movie/upcoming?api_key=${API_KEY}&page=1`,
  trending: `${API_URL}/trending/movie/week?api_key=${API_KEY}&page=1`,
  recommendations(id) {
    return `${API_URL}/movie/${id}/recommendations?api_key=${API_KEY}&page=1`;
  },
  discover(urlParam, currentPage) {
    return `${API_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`;
  },
  detail(id) {
    return `${API_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=casts,videos,images,releases`;
  },
  search(query) {
    return `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=1&include_adult=false`;
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
