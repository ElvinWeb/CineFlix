import { fetchDataFromServer, appendToMovieList } from "./helpers.js";
import { API_KEY, API_URL } from "./config.js";
import sidebar from "./sidebar.js";
import search from "./search.js";
import intro from "./intro.js";

intro();
sidebar();
search();

function movieList() {
  let currentPage = 1;
  let totalPages = 0;
  const pageContent = document.querySelector("[page-content]");
  const genreName = window.localStorage.getItem("genreName");
  const urlParam = window.localStorage.getItem("urlParam");

  const generateMovieList = function ({ results: movieList, total_pages }) {
    totalPages = total_pages;
    document.title = `CineFlix ~ ${genreName} Movies`;
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list", "genre-list");
    movieListElem.ariaLabel = `${genreName} Movies`;

    movieListElem.innerHTML = `
      <div class="title-wrapper">
        <h1 class="heading">All ${genreName} Movies</h1>
      </div>
      <div class="grid-list"></div>
      <button class="btn load-more" load-more>Load More</button>
  `;
    appendToMovieList(movieListElem, movieList, "grid-list");
    pageContent.appendChild(movieListElem);

    const loadBtn = document.querySelector("[load-more]");
    loadBtn.addEventListener("click", () =>
      loadHandler(movieListElem, loadBtn)
    );
  };
  const loadHandler = function (movieListElem, btn) {
    if (currentPage >= totalPages) {
      btn.style.display = "none";
      return;
    }
    currentPage++;
    btn.classList.add("loading");
    fetchDataFromServer(`${API_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, ({ results: movieList }) => {
      btn.classList.remove("loading");
      appendToMovieList(movieListElem, movieList, "grid-list");
    });
  };
  fetchDataFromServer(`${API_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, generateMovieList);
}
export default movieList();
