import createMovieCard from "./components/MovieCard.js";
import {
  API_KEY,
  API_URL,
  INITIAL_ANIMATION_STEP,
  ADD_FADEANIMATION_STEP,
} from "./config.js";

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
const addActiveClass = function (spans) {
  spans.forEach((span, index) => {
    setTimeout(() => {
      span.classList.add("active");
    }, (index + 1) * INITIAL_ANIMATION_STEP);
  });
};
const addFadeClass = function (spans) {
  spans.forEach((span, index) => {
    setTimeout(() => {
      span.classList.remove("active");
      span.classList.add("fade");
    }, (index + 1) * ADD_FADEANIMATION_STEP);
  });
};
const hideIntroOverlay = function (introElement) {
  introElement.style.top = "-100vh";
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
  addActiveClass,
  addFadeClass,
  hideIntroOverlay,
  ApiUrls,
};
