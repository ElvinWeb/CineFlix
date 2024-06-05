"use strict";
import { addEventOnElements, fetchDataFromServer } from "./helpers.js";
import { API_KEY, API_URL } from "./config.js";

export function sidebar() {
  const genreList = {};
  const sidebarBtn = document.querySelector("[menu-btn]");
  const sidebarTogglers = Array.from(
    document.querySelectorAll("[menu-toggler]")
  );
  const sidebarClose = Array.from(document.querySelectorAll("[menu-close]"));
  const overlay = document.querySelector("[overlay]");
  
  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");

  fetchDataFromServer(
    `${API_URL}/genre/movie/list?api_key=${API_KEY}`,
    function ({ genres }) {
      for (const { id, name } of genres) {
        genreList[id] = name;
      }
      genreLink();
    }
  );
  sidebarInner.innerHTML = `
    <div class="sidebar-list">
    
      <p class="title">Genres</p>
    
    </div>
    
    <div class="sidebar-list">
    
      <p class="title">Languages</p>

      <a href="/pages/movie-list.html" menu-close class="sidebar-link"
        onclick='getMovieList("with_original_language=az", "Azerbaijan")'>Azerbaijan
      </a>
    
      <a href="/pages/movie-list.html" menu-close class="sidebar-link"
        onclick='getMovieList("with_original_language=en", "English")'>English
      </a>
    
      <a href="/pages/movie-list.html" menu-close class="sidebar-link"
        onclick='getMovieList("with_original_language=fr", "France")'>France
      </a>
    
      <a href="/pages/movie-list.html" menu-close class="sidebar-link"
        onclick='getMovieList("with_original_language=de", "Germany")'>Germany
      </a>

      <a href="/pages/movie-list.html" menu-close class="sidebar-link"
        onclick='getMovieList("with_original_language=ru", "Russian")'>Russian
      </a>

      <a href="/pages/movie-list.html" menu-close class="sidebar-link"
        onclick='getMovieList("with_original_language=tr", "Turkey")'>Turkey
      </a>

      <a href="/pages/movie-list.html" menu-close class="sidebar-link"
        onclick='getMovieList("with_original_language=it", "Italy")'>Italy
      </a>

      <a href="/pages/movie-list.html" menu-close class="sidebar-link"
        onclick='getMovieList("with_original_language=es", "Spain")'>Spain
      </a>
    </div>
    
    <div class="sidebar-footer">
      <img src="/src/Images/tmdb-logo.png" width="130" height="17" alt="the movie database logo">
    </div>
  `;
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

      sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
    }

    const sidebar = document.querySelector("[sidebar]");
    sidebar.appendChild(sidebarInner);
    toggleSidebar(sidebar);
  };
  const toggleSidebar = function (sidebar) {
    addEventOnElements(sidebarTogglers, "click", function () {
      sidebar.classList.toggle("active");
      sidebarBtn.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    addEventOnElements(sidebarClose, "click", function () {
      sidebar.classList.remove("active");
      sidebarBtn.classList.remove("active");
      overlay.classList.remove("active");
    });
  };
}
