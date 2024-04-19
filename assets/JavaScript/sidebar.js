"use strict";
import { API_KEY, API_URL } from "./config.js";
import { addEventOnElements, fetchDataFromServer } from "./helpers.js";

class Sidebar {
  _genreList = {};
  _fetchUrl = `${API_URL}/genre/movie/list?api_key=${API_KEY}`;
  _sidebarInner = document.createElement("div");

  constructor() {
    this.generateSidebarMarkup();
    this.fetchData();
  }
  
  fetchData() {
    fetchDataFromServer(this._fetchUrl, this.storeGenres.bind(this));
  }
  storeGenres({ genres }) {
    for (const { id, name } of genres) {
      this._genreList[id] = name;
    }
    this.genreLink();
  }
  generateSidebarMarkup() {
    this._sidebarInner.classList.add("sidebar-inner");
    this._sidebarInner.innerHTML = `
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
  }
  genreLink() {

    for (const [genreId, genreName] of Object.entries(this._genreList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", "./movie-list.html");
      link.setAttribute("menu-close", "");
      link.setAttribute(
        "onclick",
        `getMovieList("with_genres=${genreId}", "${genreName}")`
      );
      link.textContent = genreName;
      this._sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
    }
   
    const sidebar = document.querySelector("[sidebar]");
    sidebar.appendChild(this._sidebarInner);
    this.toggleSidebar(sidebar);
  }
  toggleSidebar(sidebar) {
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
  }
}

export default new Sidebar();
