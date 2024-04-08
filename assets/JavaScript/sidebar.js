"use strict";
import { API_KEY, API_URL } from "./config.js";
import { addEventOnElements, fetchDataFromServer } from "./helpers.js";

export const sidebar = function () {
  const genreList = {};

  fetchDataFromServer(
    `${API_URL}genre/movie/list?api_key=${API_KEY}`,
    function ({ genres }) {
      for (const { id, name } of genres) {
        genreList[id] = name;
      }

      genreLink();
    }
  );

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");
  sidebarInner.innerHTML = `
    <div class="sidebar-list">
    
      <p class="title">Genre</p>
    
    </div>
    
    <div class="sidebar-list">
    
      <p class="title">Language</p>
    
      <a href="./movie-list.html" menu-close class="sidebar-link"
        onclick='getMovieList("with_original_language=en", "English")'>English</a>
    
      <a href="./movie-list.html" menu-close class="sidebar-link"
        onclick='getMovieList("with_original_language=hi", "Hindi")'>Hindi</a>
    
      <a href="./movie-list.html" menu-close class="sidebar-link"
        onclick='getMovieList("with_original_language=bn", "Bengali")'>Bengali</a>
    
    </div>
    
    <div class="sidebar-footer">
      <img src="./assets/images/tmdb-logo.svg" width="130" height="17" alt="the movie database logo">
    </div>
  `;

  const genreLink = function () {
    for (const [genreId, genreName] of Object.entries(genreList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", "./movie-list.html");
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
    const sidebarBtn = document.querySelector("[menu-btn]");
    const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
    const sidebarClose = document.querySelector("[menu-close]");
    const overlay = document.querySelector("[overlay]");

    addEventOnElements(sidebarTogglers, "click", function () {
      sidebar.classList.toggle("active");
      sidebarBtn.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    addEventOnElements(Array.from(sidebarClose), "click", function () {
      sidebar.classList.remove("active");
      sidebarBtn.classList.remove("active");
      overlay.classList.remove("active");
    });
  };
};
