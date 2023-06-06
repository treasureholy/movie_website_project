// 수정기능 만들기
// 등록창을 이용해서 수정 버튼 클릭시 비밀번호를 제외한 내용 자동 입력
// 등록버튼의 텍스트를 수정으로 변경
// 전역변수를 만들어 수정버튼이 눌렸을 경우 edit상태로 만듬
// 만약 edit이 아닌 경우 default값을 submit으로 하여 버튼에 관한 이벤트 기능을 등록으로 분기 시킨다.
// 그 전역변수가 edit 상태면 기존 정보를 불러와 감상평만 수정

window.onload = function () {
  const $_content = document.querySelector("._content");
  const $item_wrapper = document.querySelector(".item_wrapper");
  const $write_input = document.querySelector(".write_input");
  const $user_name = document.querySelector(".user_name");
  const $user_password = document.querySelector(".user_password");
  let selectId = null;

  function initInput() {
    $write_input.value = null;
    $user_name.value = null;
    $user_password.value = null;
  }

  getReviews();
  let method = "submit";
  $_content.addEventListener("submit", (event) => {
    event.preventDefault();
    // 댓글 입력 후 데이터 저장하기
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
    const reviews = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      // key 찾기
      const key = window.localStorage.key(i);
      // value 찾기
      const value = JSON.parse(localStorage.getItem(key));
      reviews.push(value);
    }

    $item_wrapper.innerHTML = reviews
      .map((review) => {
        return `<li class="review_card">
                  <div class="review_content">${review.text}</div>
                  <img data-id="${review.name}"class="close_icon" src="/assets/x.png" alt="">
                  <img data-id="${review.name}"class="edit_icon" src="/assets/edit.png" alt="">
                  <dl class="upload_info">
                    <dd>${review.name}</dd>
                    <dd>${review.date}</dd>
                  </dl>
                </li>`;
      })
      .join("");

    const $close_icon = document.querySelectorAll(".close_icon");
    const $edit_icon = document.querySelectorAll(".edit_icon");

    // 삭제 기능
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

    // 수정 기능
    $edit_icon.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        selectId = e.currentTarget.dataset.id;
        const data = JSON.parse(localStorage.getItem(selectId));
        method = "edit";
        $write_input.value = data.text;
        $user_name.value = data.name;
        document.querySelector(".write_button").textContent = "수정";
      });
    });
  }
};
