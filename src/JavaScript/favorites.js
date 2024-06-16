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
console.log(favorites);

if (favorites) {
  const favoritesIds = favorites.split(",");
  pageContent.innerHTML = `
        <h1 class="heading">My Favorite Movies</h1>
        <div class="movie-list">
            <div class="grid-list"></div>
        </div>
    `;
  favoritesIds.forEach((id) => {
    if (parseInt(id) > 0) {
      fetchData(ApiUrls.detail(parseInt(id)), (movie) => {
        const movieCard = createMovieCard(movie);
        pageContent.querySelector(".grid-list").appendChild(movieCard);
        updateIcons();
        let favoriteBtn = document.querySelectorAll(".favorites");
        addEventOnElements(favoriteBtn, eventType, (event) => {
          event.currentTarget.parentNode.parentNode.parentNode.remove();
        });
      });
    }
  });
} else {
  pageContent.innerHTML = `
    <h3 class="heading">Haven't found any favorites yet?</h3>
    <div style="margin-top:20px">
        <p>It looks like your favorites list is empty.
        To add movies to your favorites, simply browse our collection and click the heart icon  
        <img src="/src/Images/love-fill.png" style="display:inline" alt="favorite" width=15 heigth 15> for movies you love. 
        Start building your favorites list now!</p>
    </div>
  `;
}
