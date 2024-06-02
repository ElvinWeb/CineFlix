import { createMovieCard } from "./movieCard.js";

const addEventOnElements = function (elements, eventType, callback) {
  for (const elem of elements) elem.addEventListener(eventType, callback);
};
const appendToMovieList = function (movieListElem, movieList, className) {
  for (const movie of movieList) {
    const movieListCard = createMovieCard(movie);
    movieListElem.querySelector(`.${className}`).appendChild(movieListCard);
  }
};
const fetchDataFromServer = function (url, callback, optionalParam) {
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

export {
  addEventOnElements,
  appendToMovieList,
  fetchDataFromServer,
  getCasts,
  getGenres,
  getDirectors,
  filterVideos,
};
