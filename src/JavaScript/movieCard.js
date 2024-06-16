import { IMAGE_BASE_URL } from "./config.js";

function createMovieCard(movie) {
  const { poster_path, title, vote_average, release_date, id } = movie;
  const card = document.createElement("div");
  card.classList.add("movie-card");
  card.setAttribute("movie-id", `${id}`);

  card.innerHTML = `
  <div class="icons">
      <span class="icon">
        <span class="favorites" onclick=favorites(this,${id})></span>
      </span>
      <span class="icon">
        <span class="watchlist" onclick=watchList(this,${id})></span>
      </span>
    </div>
  <a href="/pages/detail.html" class="card-btn" title="${title}" onclick="getMovieDetail(${id})">
    <figure class="poster-box card-banner">
      <img src="${IMAGE_BASE_URL}w342${poster_path}" alt="${title}" class="img-cover" loading="lazy">
    </figure>
    <h4 class="title">${title}</h4>
    <div class="meta-list">
      <div class="meta-item">
        <img src="/src/Images/star.png" width="20" height="20" loading="lazy" alt="rating">
        <span class="span">${
          vote_average.toFixed(1) === "0.0" ? 6.2 : vote_average.toFixed(1)
        }</span>
      </div>
      <div class="card-badge">${release_date.split("-")[0]}</div>
    </div>
  </a>
`;
  return card;
}
export default createMovieCard;
