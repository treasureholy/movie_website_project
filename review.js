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
    const text = $write_input.value;
    const name = $user_name.value;
    const password = $user_password.value;

    if (!text) return alert("감상평을 입력하세요");
    else if (!name) return alert("닉네임을 입력하세요");
    else if (!password) return alert("비밀번호를 입력하세요");
    else if (password.length < 4) return alert("비밀번호는 최소 4글자가 되어야 합니다.");

    const obj = {
      name,
      text,
      password,
      date: date.toLocaleString("ko-kr"),
    };
    const objString = JSON.stringify(obj);
    let num = localStorage.length++;
    localStorage.setItem(`_${num}`, objString);
    getReviews();
  });

  function getReviews() {
    // 데이터 가져오기
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
    <dl class="upload_info">
      <dd>${review.name}</dd>
      <dd>${review.date}</dd>
    </dl>
  </li>`;
      })
      .join("");
  }
};
