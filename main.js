window.addEventListener("load", () => {
  // 선택자 함수

  function els(selector, context) {
    if (typeof selector !== "string" || selector.trim().length === 0) {
      return null;
    }
    context = !context ? document : context.nodeType === 1 ? context : el(String(context));
    return context.querySelectorAll(selector);
  }

  function el(selector, context) {
    if (typeof selector !== "string" || selector.trim().length === 0) {
      return null;
    }
    context = !context ? document : context.nodeType === 1 ? context : el(String(context));
    return context.querySelector(selector);
  }

  // road focus
  window.onload = function () {
    el("#search").focus();
  };

  // api
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODU1ZGU0NzVhM2Y4Y2M0MDU0OGQzNjljODhjMzYxNyIsInN1YiI6IjY0NzQ0YzA3OTQwOGVjMDEwMDI2MjgwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tfdrAljrTuQf5RWCvFm4oahKfG5fNXCmzG-I3UKg99c",
    },
  };

  fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
    .then((response) => response.json())
    .then((response) => {
      let movies = response.results;
      // els(".movie_cards ul li").forEach((li) => li.remove());

      for (let i = 0; i < movies.length; i++) {
        let template = `
      <li>
        <p class="rank">${movies[i].vote_average}</p>
          <div class="movie_img">
            <img src="https://image.tmdb.org/t/p/w300${movies[i].backdrop_path}" alt="영화 포스트">
          </div>
          <h3>${movies[i].title}</h3>
        <p class="description">${movies[i].overview}</p>
      </li>
      `;
        // <div class="movie_img" style=
        // "background: url('https://image.tmdb.org/t/p/w300${movies[i].backdrop_path}') bottom center"
        // "background-size="cover"></div>
        el(".movie_cards ul").insertAdjacentHTML("beforeend", template);
        els(".movie_cards ul li")[i].addEventListener("click", () => {
          alert(`이 영화의 ID는 ? => ${movies[i].id}`);
        });
      }

      // 영화 평균점수
      average_rating = [];
      movies.forEach((e) => {
        average_rating.push(e.vote_average);
        return average_rating;
      });

      const avg = average_rating.reduce((accumulator, current, index, array) => {
        return index === array.length - 1 ? (accumulator + current) / array.length : accumulator + current;
      }, 0);
      el(".last_activity ul li:nth-child(1)").innerText = `영화 평균 점수 ${avg}`;
    })

    .catch((err) => console.error(err));

  // 검색
  function search_Event() {
    let input, filter, ul, li, h3, txtValue;
    input = el("#search");

    filter = input.value.toUpperCase();
    ul = el(".movie_cards ul");
    li = els(".movie_cards ul li");

    for (let i = 0; i < li.length; i++) {
      h3 = els(".movie_cards h3")[i];
      txtValue = h3.textContent || h3.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        continue;
      }
      li[i].style.display = "none";
    }
  }

  el("#search").addEventListener("keyup", search_Event);

  el("#search_bar button").addEventListener("click", (event) => {
    event.preventDefault();
    search_Event();
  });
});
