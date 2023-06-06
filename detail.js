const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
const movieContainer = document.querySelector(".movie-container");
const movieTitle = document.querySelector(".movie-title");
const url = `https://api.themoviedb.org/3/movie/${movieId}`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODU1ZGU0NzVhM2Y4Y2M0MDU0OGQzNjljODhjMzYxNyIsInN1YiI6IjY0NzQ0YzA3OTQwOGVjMDEwMDI2MjgwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tfdrAljrTuQf5RWCvFm4oahKfG5fNXCmzG-I3UKg99c",
  },
};

// Fetch
const movieFetch = async () => {
  const movieResponse = await fetch(url, options);
  const movieData = await movieResponse.json();
  const videoResponse = await fetch(`${url}/videos`, options);
  const videoData = await videoResponse.json();
  return [movieData, videoData];
};

//trailer

const clickBtn = async () => {
  const poster = document.querySelector(".posterWrapper");
  const videos = await movieFetch();
  const videoData = videos[1];
  const trailer = videoData.results.find((video) => video.type == "Trailer");
  if (trailer) {
    const videoKey = trailer.key;
    const videoUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`;
    poster.innerHTML = `
      <iframe width="900" height="500" src="${videoUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    `;
  }
};

//HTMl
const makeTemp = async () => {
  const movies = await movieFetch();
  const movieData = movies[0];
  let {
    title,
    genres,
    production_companies,
    vote_average,
    overview,
    poster_path,
  } = movieData;
  let template = `
  <div class="movieWrapper">
      <div class="title"><h1>${title}</h1></div>
      <div class="genres">
      ${((item) => {
        return item.map((x) => `<span class="genre">${x.name}</span>`).join("");
      })(genres)}
      </div>
      <div class="player">
      <button class="video" onclick="clickBtn()"><i class="fa-sharp fa-solid fa-play play-icon"></i>예고편 시청하기</button>
      <i class="fa-regular fa-heart heart-icon" onclick="clickHeart()"></i>
      </div>
      <div class="movieInfo">
        <h3 class="director">제작 : 

        ${
          production_companies[0] ? movieData.production_companies[0].name : ""
        }</h3>
        <h3>평점 : ${vote_average.toFixed(1)}</h3>
        <h3 class="overview">${overview}</h3>
        <h3 class="rating"></h3>
      </div>
  </div>
  <div class="posterWrapper">
  <img class="posterImage" src="https://image.tmdb.org/t/p/w400${poster_path}" alt="영화 포스트">
</div>`;
  document
    .getElementById("wrapperId")
    .insertAdjacentHTML("beforeend", template);
};

const clickHeart = () => {
  let heartIcon = document.querySelector(".heart-icon");
  heartIcon.classList.toggle("red-heart");
};

makeTemp();
