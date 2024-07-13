const getMovieDetail = function (movieId) {
  window.localStorage.setItem("movieId", String(movieId));
};
const getMovieList = function (urlParam, genreName) {
  window.localStorage.setItem("urlParam", urlParam);
  window.localStorage.setItem("genreName", genreName);
};
const removeFromLocalStroage = function (key, id) {
  let watchLaterArr = window.localStorage.getItem(key).split(",");
  const index = watchLaterArr.indexOf(`${id}`);
  if (index !== -1) {
    watchLaterArr.splice(index, 1);
    window.localStorage.setItem(key, watchLaterArr.join(","));
  }
};
const addToLocalStroage = function (key, id) {
  let existBefore = window.localStorage.getItem(key);
  window.localStorage.setItem(key, `${existBefore || ""}${id},`);
};
const listToggle = function (element) {
  element.classList.toggle("added");
};
const watchList = function (element, id) {
  const key = "watchlist";
  if (!window.localStorage.getItem(key)) window.localStorage.setItem(key, "");
  const watchList = window.localStorage.getItem(key).split(",");
  if (watchList.includes(`${id}`)) {
    removeFromLocalStroage(key, id);
    listToggle(element);
  } else {
    addToLocalStroage(key, id);
    listToggle(element);
  }
};
const favorites = function (element, id) {
  const key = "favorites";
  if (!window.localStorage.getItem(key)) window.localStorage.setItem(key, "");
  const watchList = window.localStorage.getItem(key).split(",");
  if (watchList.includes(`${id}`)) {
    removeFromLocalStroage(key, id);
    listToggle(element);
  } else {
    addToLocalStroage(key, id);
    listToggle(element);
  }
};
const updateIcons = function () {
  let watchList = window.localStorage.getItem("watchlist");
  if (watchList) {
    let watchListIds = window.localStorage.getItem("watchlist").split(",");
    watchListIds.forEach((id) => {
      const movieCards = document.querySelectorAll(`[movie-id="${id}"]`);
      movieCards.forEach((card) => {
        card.querySelector(".watchlist").classList.add("added");
      });
    });
  }
  let favorites = window.localStorage.getItem("favorites");
  if (favorites) {
    let favoritesIds = window.localStorage.getItem("favorites").split(",");
    favoritesIds.forEach((id) => {
      const movieCards = document.querySelectorAll(`[movie-id="${id}"]`);
      movieCards.forEach((card) => {
        card.querySelector(".favorites").classList.add("added");
      });
    });
  }
};
