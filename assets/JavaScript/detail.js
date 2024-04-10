import { API_KEY, API_URL, IMAGE_BASE_URL } from "./config.js";
import { fetchDataFromServer, addEventOnElements } from "./helpers.js";
import { sidebar } from "./sidebar.js";
import { createMovieCard } from "./movie-card.js";

sidebar();
const pageContent = document.querySelector("[page-content]");
const movieId = window.localStorage.getItem("movieId");

const getGenres = function (genreList) {
  const newGenreList = [];
  for (const { name } of genreList) {
    newGenreList.push(name);
  }
  return newGenreList.join(",");
};

const getCasts = function (castList) {
  const newCastList = [];
  for (let i = 0, len = castList.length; i < len && i < 10; i++) {
    const { name } = castList[i];
    newCastList.push(name);
  }

  return newCastList.join(",");
};

const getDirectors = function (crewList) {
  const directors = crewList.filter(({ job }) => job === "Director");
  const newDirectorList = [];
  for (const { name } of directors) {
    newDirectorList.push(name);
  }
  return newDirectorList.join(",");
};

const filterVideos = function (videoList) {
  return videoList.filter(
    ({ type, site }) =>
      (type === "Trailer" || type === "Teaser") && site === "YouTube"
  );
};

fetchDataFromServer(
  `${API_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=casts,videos,images,releases`,
  function (movie) {
    const {
      backdrop_path,
      poster_path,
      title,
      release_date,
      runtime,
      vote_average,
      releases: {
        countries: [{ certification } = { certification: "N/A" }],
      },
      genres,
      overview,
      casts: { cast, crew },
      videos: { results: videos },
    } = movie;
    console.log(certification);

    document.title = `${title} - TvFlix`;
    const movieDetail = document.createElement("div");
    movieDetail.classList.add("movie-detail");

    movieDetail.innerHTML = `
    <div class="backdrop-image" style="background-image: url('${IMAGE_BASE_URL}${
      "w1280" || "original"
    }${backdrop_path || poster_path}')">
        <figure class="poster-box movie-poster">
            <img src="${IMAGE_BASE_URL}w342${poster_path}" alt="${title} poster" class="img-cover"/>
        </figure>

        <div class="detail-box">
            <div class="detail-content">
                <h1 class="heading">${title}</h1>

                <div class="meta-list">
                <div class="meta-item">
                    <img
                    src="./assets/Images/star.png"
                    width="20"
                    height="20"
                    alt="rating"
                    />
                    <span class="span"> ${vote_average.toFixed(1)} </span>
                </div>
                <div class="separator"></div>

                <div class="meta-item">${runtime}m</div>

                <div class="separator"></div>

                <div class="meta-item">${
                  release_date?.split("-")[0] ?? "Not Released"
                }</div>

                <div class="meta-item card-badge">${certification}</div>
                </div>

                <p class="genre">${getGenres(genres)}</p>

                <p class="overview">${overview}</p>

                <ul class="detail-list">
                <div class="list-item">
                    <p class="list-name">Starring</p>

                    <p>
                    ${getCasts(cast)}}
                    </p>
                </div>
                <div class="list-item">
                    <p class="list-name">Directed By</p>

                    <p>${getDirectors(crew)}</p>
                </div>
                </ul>
            </div>

            <div class="title-wrapper">
                <h3 class="title-large">Trailers and Clips</h3>
            </div>

            <div class="slider-list">
                <div class="slider-inner"></div>
            </div>
        </div>
  </div>
    `;

    for (const { key, name } of filterVideos(videos)) {
      const videoCard = document.createElement("div");
      videoCard.classList.add("video-card");
      videoCard.innerHTML = `
      <iframe width="500" height="294" src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0"
        frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" loading="lazy"></iframe>
    `;
      movieDetail.querySelector(".slider-inner").appendChild(videoCard);
    }

    pageContent.appendChild(movieDetail);
    fetchDataFromServer(
      `${API_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&page=1`,
      addSuggestedMovies
    );
  }
);

const addSuggestedMovies = function ({ results: movieList }, title) {
  const movieListElem = document.createElement("section");
  movieListElem.classList.add("movie-list");
  movieListElem.ariaLabel = "You May Also Like";
  movieListElem.innerHTML = `
    <div class="title-wrapper">
        <h3 class="title-large">You May Also Like</h3>
    </div>

    <div class="slider-list">
        <div class="slider-inner"></div>
    </div>
    `;

  for (const movie of movieList) {
    const movieCard = createMovieCard(movie);
    movieListElem.querySelector(".slider-inner").appendChild(movieCard);
  }

  pageContent.appendChild(movieListElem);
};
