window.onload = function () {
  const $_content = document.querySelector("._content");
  const $item_wrapper = document.querySelector(".item_wrapper");
  const $write_input = document.querySelector(".write_input");
  const $user_name = document.querySelector(".user_name");
  const $user_password = document.querySelector(".user_password");
  let selectId = null;
  let method = "submit";

  function initInput() {
    $write_input.value = null;
    $user_name.value = null;
    $user_password.value = null;
  }

  // 댓글 입력창 기능 구현
  $_content.addEventListener("submit", (event) => {
    event.preventDefault();
    if (method === "submit") {
      // 등록일 때
      const date = new Date();
      let text = $write_input.value;
      let name = $user_name.value;
      let password = $user_password.value;

      if (password.length < 4)
        return alert("비밀번호는 최소 4글자가 되어야 합니다.");

      const obj = {
        name,
        text,
        password,
        date: date.toLocaleString("ko-kr"),
      };
      const objString = JSON.stringify(obj);
      localStorage.setItem(`${name}`, objString);
      getReviews();
      initInput();
    } else if (method === "edit") {
      // 수정일 때
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
    $item_wrapper.innerHTML = reviews
      .sort((a, b) => {
        if (a.date < b.date) return 1;
        else if (a.date === b.date) return 0;
        else if (a.date > b.date) return -1;
      })
      .map((review) => {
        return `<li class="review_card">
                      <div class="review_content">${review.text}</div>
                      <img data-id="${review.name}"class="close_icon" src="assets/X.png" alt="">
                      <img data-id="${review.name}"class="edit_icon" src="assets/edit.png" alt="">
                      <dl class="upload_info">
                        <dd>${review.name}</dd>
                        <dd>${review.date}</dd>
                      </dl>
                    </li>`;
      })
      .join("");
    deleteReview();
    editReview();
  }

  // 삭제 기능
  function deleteReview() {
    const $close_icon = document.querySelectorAll(".close_icon");

    $close_icon.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const selectId = e.currentTarget.dataset.id;
        const deletePw = prompt(
          "삭제를 원하시면 해당 비밀번호를 입력하세요",
          ""
        );

        const data = JSON.parse(localStorage.getItem(selectId));
        if (data.password === deletePw) {
          confirm("정말로 삭제하시겠습니까?")
            ? localStorage.removeItem(selectId)
            : 0;
          getReviews();
        } else if (data.password !== deletePw && deletePw.length !== 0) {
          alert("비밀번호가 틀립니다.");
        }
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
        window.scrollTo(0, 0); // 스크롤이 아래 있을 때 수정창으로 바로 이동
      });
    });
  }

  getReviews();
};
