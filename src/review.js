// [댓글 저장]
let saveComment = (name, comment, password) => {
  //JSON.parse : JSON 문자열을 객체로 전개
  // 이전에 저장된 댓글 데이터 불러오기 또는 빈 배열로 초기화
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  //새로운 댓글 객체를 생성 (key - value)
  let newComment = {
    name: name,
    comment: comment,
    password: password,
  };

  //댓글을 배열에 추가
  comments.push(newComment);

  //배열을 다시 localStorage에 저장(객체를 JSON문자열로 변환)
  localStorage.setItem("comments", JSON.stringify(comments));
};

// [댓글 불러오기]
let loadComments = () => {
  //이전에 저장된 댓글 데이터를 불러오기
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  // 댓글을 표시할 HTML 요소를 선택
  let commentContainer = document.getElementById("comment-container");

  commentContainer.innerHTML = ""; // 이전에 표시된 댓글들을 초기화

  // 댓글을 HTML에 추가
  comments.forEach(function (comment, index) {
    let commentElement = document.createElement("div"); // 각 댓글 요소를 생성
    commentElement.classList.add("comment"); // "comment" 클래스 추가(css 추가용)

    let commentText = document.createElement("span"); // <div> 요소에 댓글내용 <span>요소를 자식으로 추가)
    commentText.innerHTML = "<b>" + comment.name + "</b> : " + comment.comment;

    // 수정 삭제 버튼 추가
    let editButton = document.createElement("button");
    editButton.innerHTML = "수정";
    editButton.addEventListener("click", function () {
      let password = prompt("비밀번호를 입력하세요.");

      if (password !== null && password === comment.password) {
        let newComment = prompt(
          "수정할 댓글 내용을 입력하세요.",
          comment.comment
        );
        if (newComment !== null) {
          editComment(index, newComment);
        }
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    });

    // 댓글 삭제 버튼 추가
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "삭제";
    deleteButton.addEventListener("click", function () {
      let password = prompt("비밀번호를 입력하세요.");

      if (password !== null && password === comment.password) {
        if (confirm("댓글을 삭제하시겠습니까?")) {
          deleteComment(index);
        }
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    });

    commentElement.appendChild(commentText);
    commentElement.appendChild(deleteButton);
    commentElement.appendChild(editButton);
    commentContainer.appendChild(commentElement); // 댓글 요소를 댓글 컨테이너에 추가
  });
};

// 댓글 수정 함수
let editComment = (index, newComment) => {
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  comments[index].comment = newComment;

  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments();
};

// 댓글 삭제 함수
let deleteComment = (index) => {
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  comments.splice(index, 1);
  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments();
};

// [페이지가 로드될 때 댓글을 불러오기]
window.onload = function () {
  loadComments();
};
