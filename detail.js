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
  console.log([movieData, videoData]);
  return [movieData, videoData];
};

//trailer
// const videoFetch = async () => {
//   return videoData.results;
// };

const trailerBtn = document.querySelector(".btn");
const poster = document.querySelector(".poster");

const clickBtn = async () => {
  const videoData = await movieFetch();
  const a = videoData[1].results;
  const trailer = a.find((video) => video.type == "Trailer");
  if (trailer) {
    const videoKey = trailer.key;
    const videoUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`;
    poster.innerHTML = `
      <iframe width="500" height="400" src="${videoUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    `;
  }
};
trailerBtn.addEventListener("click", clickBtn);

//HTMl
// const makeCard = async () => {
//   const movieData = await movieFetch();
//     let tempHtml =
// };

movieFetch();
