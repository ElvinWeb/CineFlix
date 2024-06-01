import { addEventOnElements } from "./helpers.js";
import "core-js/actual";
import "regenerator-runtime/runtime";

const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");

addEventOnElements(searchTogglers, "click", function () {
  searchBox.classList.toggle("active");
});

export const getMovieDetail = function (movieId) {
  window.localStorage.setItem("movieId", String(movieId));
};

export const getMovieList = function (urlParam, genreName) {
  window.localStorage.setItem("urlParam", urlParam);
  window.localStorage.setItem("genreName", genreName);
};
