"use strict";
import { addEventOnElements, fetchData } from "./helpers.js";
import { API_KEY, API_URL } from "./config.js";

function sidebar() {
  const genreList = {};
  const langList = {
    az: "Azerbaijan",
    en: "English",
    fr: "France",
    de: "Germany",
    ru: "Russian",
    tr: "Turkish",
    it: "Italian",
    es: "Spanish",
  };
  const sidebarBtn = document.querySelector("[menu-btn]");
  const sidebar = document.querySelector("[sidebar]");
  const sidebarTogglers = Array.from(
    document.querySelectorAll("[menu-toggler]")
  );
  const overlay = document.querySelector("[overlay]");
  const fullApiUrl = `${API_URL}/genre/movie/list?api_key=${API_KEY}`;

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");

  sidebarInner.innerHTML = `
    <div class="sidebar-list">
      <p class="title">Movie List</p>  

      <a href="/pages/favorites.html" class="favorite sidebar-link" menu-close>Favorites</a>
      <a href="/pages/watch-list.html" class="watch-list sidebar-link" menu-close>WatchList</a>
    </div>

    <div class="sidebar-list">
      <p class="title">Genres</p>  
    </div>
    
    <div class="sidebar-list">
      <p class="title">Languages</p> 
    </div>
    
    <div class="sidebar-footer">
      <img src="/src/Images/tmdb-logo.png" width="130" height="17" alt="the movie database logo">
    </div>
  `;

  const getGenreList = function ({ genres }) {
    for (const { id, name } of genres) {
      genreList[id] = name;
    }
    genreLink();
    langLink();
  };
  const genreLink = function () {
    for (const [genreId, genreName] of Object.entries(genreList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", "/pages/movie-list.html");
      link.setAttribute("menu-close", "");
      link.setAttribute(
        "onclick",
        `getMovieList("with_genres=${genreId}", "${genreName}")`
      );
      link.textContent = genreName;
      sidebarInner.querySelectorAll(".sidebar-list")[1].appendChild(link);
    }
    sidebar.appendChild(sidebarInner);
  };
  const langLink = function () {
    for (const [langId, langName] of Object.entries(langList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", "/pages/movie-list.html");
      link.setAttribute(
        "onclick",
        `getMovieList("with_original_language=${langId}", "${langName}")`
      );
      link.textContent = langName;
      sidebarInner.querySelectorAll(".sidebar-list")[2].appendChild(link);
    }
    sidebar.appendChild(sidebarInner);
  };
  const toggleSidebar = function () {
    sidebar.classList.toggle("active");
    sidebarBtn.classList.toggle("active");
    overlay.classList.toggle("active");
  };
  fetchData(fullApiUrl, getGenreList);
  addEventOnElements(sidebarTogglers, "click", toggleSidebar);
}
export default sidebar;
