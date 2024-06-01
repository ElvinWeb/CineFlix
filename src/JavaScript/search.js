import { appendToMovieList, fetchDataFromServer } from "./helpers.js";
import { API_URL, API_KEY, SEARCH_TIMEOUT_SEC } from "./config.js";

export function search() {
  const searchWrapper = document.querySelector("[search-wrapper]");
  const searchField = document.querySelector("[search-field]");

  const searchResultModal = document.createElement("div");
  searchResultModal.classList.add("search-modal");
  document.querySelector("main").appendChild(searchResultModal);
  let searchTimeout;

  searchField.addEventListener("input", function () {
    if (!searchField.value.trim()) {
      searchResultModal.classList.remove("active");
      searchWrapper.classList.remove("searching");
      clearTimeout(searchTimeout);
      return;
    }

    searchWrapper.classList.add("searching");
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(function () {
      fetchDataFromServer(
        `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchField.value}&page=1&include_adult=false`,
        function ({ results: movieList }) {
          searchWrapper.classList.remove("searching");
          searchResultModal.classList.add("active");
          searchResultModal.innerHTML = "";

          searchResultModal.innerHTML = `
            <p class="label">Results for</p>
            
            <h1 class="heading">${searchField.value}</h1>
            
            <div class="movie-list">
              <div class="grid-list"></div>
            </div>
          `;

          appendToMovieList(searchResultModal, movieList, "grid-list");
        }
      );
    }, SEARCH_TIMEOUT_SEC);
  });
}
