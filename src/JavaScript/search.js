import {
  appendToMovieList,
  fetchDataFromServer,
  addEventOnElements,
} from "./helpers.js";
import { API_URL, API_KEY, SEARCH_TIMEOUT_SEC } from "./config.js";

export function search() {
  const searchWrapper = document.querySelector("[search-wrapper]");
  const searchField = document.querySelector("[search-field]");
  const searchBox = document.querySelector("[search-box]");
  const searchTogglers = document.querySelectorAll("[search-toggler]");

  const searchResultModal = document.createElement("div");
  searchResultModal.classList.add("search-modal");
  document.querySelector("main").appendChild(searchResultModal);
  let searchTimeout;

  addEventOnElements(searchTogglers, "click", function () {
    searchBox.classList.toggle("active");
  });

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
          console.log(movieList);
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
          } else {
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
          }
        }
      );
    }, SEARCH_TIMEOUT_SEC);
  });
}
