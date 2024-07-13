import {
  appendToMovieList,
  fetchData,
  addEventOnElements,
  ApiUrls,
} from "../helpers.js";
import { SEARCH_TIMEOUT_SEC } from "../config.js";

function search() {
  const searchWrapper = document.querySelector("[search-wrapper]");
  const searchField = document.querySelector("[search-field]");
  const searchBox = document.querySelector("[search-box]");
  const searchTogglers = document.querySelectorAll("[search-toggler]");
  const searchResultModal = document.createElement("div");
  let searchTimeout;

  searchResultModal.classList.add("search-modal");
  document.querySelector("main").appendChild(searchResultModal);

  const searchHandler = function () {
    if (!searchField.value.trim()) {
      searchResultModal.classList.remove("active");
      searchWrapper.classList.remove("searching");
      clearTimeout(searchTimeout);
      return;
    }
    searchWrapper.classList.add("searching");
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(setSearchTimeout, SEARCH_TIMEOUT_SEC);
  };
  const setSearchTimeout = function () {
    fetchData(ApiUrls.search(searchField.value), searchResults);
  };
  const searchResults = function ({ results: movieList }) {
    searchWrapper.classList.remove("searching");
    searchResultModal.classList.add("active");
    searchResultModal.innerHTML = "";

    if (movieList.length > 0) {
      document.title = "CineFlix ~ Search Results";
      searchResultModal.innerHTML = `
        <p class="label">Results for</p>
        
        <h1 class="heading">${searchField.value}</h1>
        
        <div class="movie-list">
          <div class="grid-list"></div>
        </div>
      `;
      appendToMovieList(searchResultModal, movieList, "grid-list");
      updateIcons();
    } else {
      movieNotFound();
    }
  };
  const movieNotFound = function () {
    document.title = "CineFlix ~ Not Available";
    searchResultModal.innerHTML = `
      <div class="error-container">
        <div id="notfound">
          <div class="notfound">
              <div class="notfound-404">
                <h1>404</h1>
              </div>
            <h2>we are sorry, but the movie you requested was not found</h2>
            <a href="/index.html" class="home-btn">Go Home</a>
          </div>
        </div>
      </div>
    `;
  };
  searchField.addEventListener("input", searchHandler);
  addEventOnElements(searchTogglers, "click", () =>
    searchBox.classList.toggle("active")
  );
}
export default search;
