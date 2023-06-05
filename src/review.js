window.onload = function () {
  const $_content = document.querySelector("._content");
  const $item_wrapper = document.querySelector(".item_wrapper");
  const $write_input = document.querySelector(".write_input");
  const $user_name = document.querySelector(".user_name");
  const $user_password = document.querySelector(".user_password");
  getReviews();

  $_content.addEventListener("submit", (event) => {
    event.preventDefault();
    // 댓글 입력 후 데이터 저장하기
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

    $write_input.value = null;
    $user_name.value = null;
    $user_password.value = null;
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
                  <img data-id="${review.name}"class="close_icon" src="/assets/X.png" alt="">
                  <dl class="upload_info">
                    <dd>${review.name}</dd>
                    <dd>${review.date}</dd>
                  </dl>
                </li>`;
      })
      .join("");

    // 삭제 기능
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
};
