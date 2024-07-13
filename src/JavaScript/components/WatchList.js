import intro from "./Intro.js";
import sidebar from "./Sidebar.js";
import search from "./Search.js";
import createMovieCard from "./MovieCard.js";
import { ApiUrls, fetchData } from "../helpers.js";
intro();
search();
sidebar();

const watchlist = localStorage.getItem("watchlist");
const pageContent = document.querySelector("[page-content]");
const movieListElem = document.createElement("section");
movieListElem.classList.add("movie-list", "genre-list");

if (watchlist) {
  const watchlistIds = watchlist.split(",");
  movieListElem.innerHTML = `
      <div class="title-wrapper">
        <h1 class="heading">My Watchlist</h1>
      </div>
      <div class="grid-list"></div>
  `;
  watchlistIds.forEach((id) => {
    if (parseInt(id) > 0) {
      fetchData(ApiUrls.detail(parseInt(id)), (movie) => {
        const movieCard = createMovieCard(movie);
        movieListElem.querySelector(".grid-list").appendChild(movieCard);
        let watchlistBtn = document.querySelectorAll(".watchlist");
        updateIcons();
        addEventOnElements(watchlistBtn, "click", (event) => {
          event.currentTarget.parentNode.parentNode.parentNode.remove();
        });
      });
    }
  });
  pageContent.appendChild(movieListElem);
} else {
  pageContent.innerHTML = `
    <div class="title-wrapper">
      <h1 class="heading">Ready to plan your movie marathon?</h1>
    </div>
    <div class="content">
        <p>
          Your watchlist is currently empty. To start curating your personalized movie queue,
          explore our movie collection and click on save icon <img src="/src/Images/watch-later-stroke.png" style="display:inline" alt="favorite" width=15 heigth 15>.
          That way, you will never miss out on the films you are excited to watch.
          Let's begin adding to your watchlist🚀
        </p>
    </div>
  `;
}
