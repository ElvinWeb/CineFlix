import { addEventOnElements } from "./helpers.js";

const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");

addEventOnElements(searchTogglers, "click", function () {
  searchBox.classList.toggle("active");
});
const getMovieDetails = function (movieId) {
  window.localStorage.setItem("movieId", String(movieId));
};
