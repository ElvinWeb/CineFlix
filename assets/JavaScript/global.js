import { addEventOnElements } from "./helpers.js";
import { sidebar } from "./sidebar.js";

const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");
sidebar();

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
