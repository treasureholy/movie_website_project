// [댓글 저장]
let saveComment = (name, comment, password) => {
  //이전에 저장된 댓글 데이터를 불러오기
  //JSON.parse : JSON 문자열을 객체로 전개
  let comments = JSON.parse(localStorage.getItem("comments"));

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
  let comments = JSON.parse(localStorage.getItem("comments"));

  // 댓글을 표시할 HTML 요소를 선택
  let commentContainer = document.getElementById("comment-container");

  // 댓글을 HTML에 추가
  comments.forEach(function (comment) {
    let commentElement = document.createElement("div"); // 각 댓글 요소를 생성
    commentElement.classList.add("comment"); // "comment" 클래스 추가(css 추가용)

    let commentText = document.createElement("span"); // <div> 요소에 댓글내용 <span>요소를 자식으로 추가)
    commentElement.innerHTML =
      "<b>" + comment.name + "</b> : " + comment.comment;
    commentElement.appendChild(commentText);
    // 댓글 요소를 댓글 컨테이너에 추가
    commentContainer.appendChild(commentElement);
  });
};

// 페이지가 로드될 때 댓글을 불러오기
window.onload = function () {
  loadComments();
};
