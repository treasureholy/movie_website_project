window.onload = function () {
  const $_content = document.querySelector("._content");
  const $item_wrapper = document.querySelector(".item_wrapper");
  const $write_input = document.querySelector(".write_input");
  const $user_name = document.querySelector(".user_name");
  const $user_password = document.querySelector(".user_password");
  const $like_sort = document.querySelector(".like_sort");
  const $time_sort = document.querySelector(".time_sort");

  let urlParams = new URLSearchParams(window.location.search);
  let movieId = urlParams.get("id");

  let selectId = null;
  let method = "submit";
  let sortWay = "like";
  function initInput() {
    $write_input.value = null;
    $user_name.value = null;
    $user_password.value = null;
  }

  $like_sort.addEventListener("click", () => {
    sortWay = "like";
    getReviews();
  });

  $time_sort.addEventListener("click", () => {
    sortWay = "time";
    getReviews();
  });

  // 댓글 입력창 기능 구현
  $_content.addEventListener("submit", (event) => {
    event.preventDefault();
    switch (method) {
      case "submit": // 등록일 때
        const date = new Date();
        let text = $write_input.value;
        let name = $user_name.value;
        let password = $user_password.value;

        if (password.length < 4) return alert("비밀번호는 최소 4글자가 되어야 합니다.");

        const obj = {
          likeCount: 0,
          name,
          text,
          password,
          date: date.toLocaleString("ko-kr"),
          movieId,
        };
        const objString = JSON.stringify(obj);
        localStorage.setItem(`${name}`, objString);
        getReviews();
        initInput();

        break;

      case "edit": // 수정일 때
        const data = JSON.parse(localStorage.getItem(selectId));
        if (data.password === $user_password.value) {
          let text = $write_input.value;
          data.text = text;
          localStorage.setItem(selectId, JSON.stringify(data));
          alert("수정이 완료되었습니다.");

          // 수정 후 등록 창으로 변환
          method = "submit";
          document.querySelector(".write_button").textContent = "등록";
          initInput();
          getReviews();
        } else {
          return alert("비밀번호가 일치하지 않습니다.");
        }
        break;

      default:
        break;
    }
  });

  // 데이터 가져오기
  function getReviews() {
    let reviews = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      // key 찾기
      const key = window.localStorage.key(i);
      // value 찾기
      const value = JSON.parse(localStorage.getItem(key));
      reviews.push(value);
    }

    // 데이터 정렬 및 렌더링
    // 영화 ID 값 필터링
    reviews = reviews.filter((review) => {
      urlParams = new URLSearchParams(window.location.search);
      movieId = urlParams.get("id");
      return review.movieId === movieId;
    });

    if (reviews.length < 2) {
      document.querySelector(".sort").classList.add("hide");
    } else {
      document.querySelector(".sort").classList.remove("hide");
    }

    let sort = "";
    if (sortWay === "like") sort = "likeCount";
    else if (sortWay === "time") sort = "date";

    reviews = reviews.sort((a, b) => {
      if (a[`${sort}`] < b[`${sort}`]) return 1;
      else if (a[`${sort}`] === b[`${sort}`]) return 0;
      else if (a[`${sort}`] > b[`${sort}`]) return -1;
    });

    $item_wrapper.innerHTML = reviews
      .map((review) => {
        return `<li class="review_card">
                      <div class="review_content">${review.text}</div>
                      <img data-id="${review.name}"class="close_icon" src="assets/X.png" alt="">
                      <img data-id="${review.name}"class="edit_icon" src="assets/edit.png" alt="">
                      <dl class="upload_info">
                        <dd>${review.name}</dd>
                        <div class="like">
                        <img data-id="${review.name}"class="like_icon" src="assets/like.png" alt="">
                        <p class="like_count">${review.likeCount}</p>
                        </div>
                        <dd>${review.date}</dd>
                      </dl>
                    </li>`;
      })
      .join("");
    deleteReview();
    editReview();
    likeReview();
  }

  // 삭제 기능
  function deleteReview() {
    const $close_icon = document.querySelectorAll(".close_icon");
    // $close_icon.forEach((e) => {
    //   console.log(1);
    // });

    $close_icon.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const selectId = e.currentTarget.dataset.id;
        // const deletePw = prompt("삭제를 원하시면 해당 비밀번호를 입력하세요", "");

        document.querySelector(".del-user__pass").classList.remove("dn");
        document.querySelector("#del-user__form").addEventListener("click", () => {
          const del__userPass = document.querySelector("#user-del__pass");

          if (data.password === del__userPass.value) {
            confirm("정말로 삭제하시겠습니까?") ? localStorage.removeItem(selectId) : 0;
            document.querySelector(".del-user__pass").classList.add("dn");
            getReviews();
            alert("삭제 되었습니다 !");
            del__userPass.value = "";
            // location.reload();
          } else if (data.password !== del__userPass.value && del__userPass.value.length !== 0) {
            alert("비밀번호가 틀립니다.");
            del__userPass.value = "";
          }
        });
        const data = JSON.parse(localStorage.getItem(selectId));
        console.log(e.target);
        console.log(e.target.id);
      });
    });
  }
  // 수정 기능
  function editReview() {
    const $edit_icon = document.querySelectorAll(".edit_icon");

    $edit_icon.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        method = "edit";
        selectId = e.currentTarget.dataset.id;
        const data = JSON.parse(localStorage.getItem(selectId));
        $write_input.value = data.text;
        $user_name.value = data.name;
        $user_name.setAttribute("readonly", true);
        document.querySelector(".write_button").textContent = "수정";
        $write_input.focus();
      });
    });
  }

  // 좋아요 기능
  function likeReview() {
    const $like_icon = document.querySelectorAll(".like_icon");
    $like_icon.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        selectId = e.currentTarget.dataset.id;
        const data = JSON.parse(localStorage.getItem(selectId));
        data.likeCount++;
        localStorage.setItem(selectId, JSON.stringify(data));
        getReviews();
      });
    });
  }
  getReviews();
};

//페이지 상단이동
const $topBtn = document.querySelector(".moveTopBtn2");

$topBtn.onclick = () => {
  // top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
  window.scrollTo({ top: 0, behavior: "smooth" });
};
