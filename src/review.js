// [댓글 저장]
let saveComment = (name, comment, password) => {
  //이전에 저장된 댓글 데이터를 불러오기
  //JSON.parse : JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 객체를 생성
  let comments = JSON.parse(localStorage.getItem("comments"));

  //새로운 댓글 객체를 생성 (key - value)
  let newComment = {
    name: name,
    comment: comment,
    password: password,
  };

  //댓글을 배열에 추가
  comments.push(newComment);

  //배열을 다시 localStorage에 저장
  localStorage.setItem("comments", JSON.stringify(comments));
};

// [댓글 불러오기]
let loadComments = () => {
  //이전에 저장된 댓글 데이터를 불러오기
  let comments = JSON.parse(localStorage.getItem("comments"));

  // 댓글을 표시할 HTML 요소를 선택
  let commentContainer = document.getElementById("comment-container");

  // 댓글을 HTML에 추가
  comments.forEach(function (comment) {
    let commentElement = document.createElement("div");
    commentElement.innerHTML =
      "<b>" + comment.name + "</b> : " + comment.comment;
    commentContainer.appendChild(commentElement);
  });
};

// 페이지가 로드될 때 댓글을 불러오기
window.onload = function () {
  loadComments();
};
