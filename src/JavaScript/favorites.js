import intro from "./intro.js";
import sidebar from "./sidebar.js";
import search from "./search.js";
import createMovieCard from "./movieCard.js";
import { ApiUrls, fetchData } from "./helpers.js";
intro();
search();
sidebar();

const favorites = localStorage.getItem("favorites");
const pageContent = document.querySelector("[page-content]");
const movieListElem = document.createElement("section");
movieListElem.classList.add("movie-list", "genre-list");

if (favorites) {
  const favoritesIds = favorites.split(",");
  movieListElem.innerHTML = `
      <div class="title-wrapper">
        <h1 class="heading">My Favorite Movies</h1>
      </div>
      <div class="grid-list"></div>
  `;

  favoritesIds.forEach((id) => {
    if (parseInt(id) > 0) {
      fetchData(ApiUrls.detail(parseInt(id)), (movie) => {
        const movieCard = createMovieCard(movie);
        movieListElem.querySelector(".grid-list").appendChild(movieCard);
        let favoriteBtn = document.querySelectorAll(".favorites");
        updateIcons();
        addEventOnElements(favoriteBtn, "click", (event) => {
          event.currentTarget.parentNode.parentNode.parentNode.remove();
        });
      });
    }
  });
  pageContent.appendChild(movieListElem);
} else {
  pageContent.innerHTML = `
    <div class="title-wrapper">
      <h1 class="heading">Have not found any favorites yet?</h1>
    </div>
    <div class="content">
        <p>
          It looks like your favorites list is empty.
          To add movies to your favorites, simply browse our movie collection and click the heart icon  
          <img src="/src/Images/love-stroke.png" style="display:inline" alt="favorite" width=15 heigth 15> for movies you love. 
          Start building your favorites list now✨
        </p>
    </div>
  `;
}
