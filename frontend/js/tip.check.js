document.addEventListener("DOMContentLoaded", async (e) => {
  // 글 작성시 상세페이지에 뿌려줌
  const id = new URLSearchParams(location.search).get("id");
  // console.log(id)
  let response = await axios.get(`http://localhost:3000/whisky/check/${id}`);
  let tips = await response.data;
  // console.log(tips);
  // console.log(tips.img);
  // console.log(element);
  const checkDataWrap = document.querySelector("#checkDataWrap");
  const checkBox = document.createElement("div");

  checkBox.innerHTML = `
      <div id = "tipCorrecionTitle">${tips.tip_title}</div>
      <div id="tipCorrecionContent">
      <div id="tipContent">
      <img id="checkImg" src='http://localhost:3000/${tips.img}'>
      ${tips.tip_content}
      </div>
      </div>
      `;
  checkDataWrap.append(checkBox);

  // 1.댓글 등록시 데이터 담기
  const commentBtn = document.querySelector("#commentBtn");
  const commenText = document.querySelector("#commenText");
  commentBtn.onclick = async () => {
    if (!commenText.value) {
      alert("댓글을 입력해주세요!");
      return;
    }
    const json = { commentText: commenText.value, nickname: "nick_name", id: id };
    console.log(json);
    const result = await axios.post(`http://127.0.0.1:3000/whisky/comment`, json, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    location.reload();
  };

  // 2. 댓글 그려주기
  const { data } = await axios.get(`http://127.0.0.1:3000/whisky/fix/${id}`);
  // console.log(data);
  const commentBtnWrap = document.querySelector("#commentBtnWrap");
  data.forEach((e, index) => {
    const date = new Date(e.updatedAt);
    const month = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
    const str = `${date.getFullYear()}/${month}/${date.getDate()}`;
    const a = document.createElement("div");
    // a.classList.add('comment_list', `d${index}`);
    a.classList.add("comment_list");
    a.dataset.id = e.id;
    a.innerHTML = `
    <div id="comment">
      <div id="commentSmallText">
        <div class="writer">${e.nick_name}</div>
        <div>${e.tip_comment}</div>
        <div>${str}</div >
      </div >
      <div id="icon">
      <img  id="cehckDot1" class="checkicon check_btn1" src="../img/comment.png" alt="">
      <img id="cehckDot2" class="checkicon check_btn2" src="../img/pen.png" alt="">
      <img  id="cehckDot3" class="checkicon check_btn3" src="../img/trashcan.jpeg" alt="">
      </div>
      </div >
      <div class="outside"></div>
      <div class="Ccomment"></div>
      `;
    commentBtnWrap.append(a);
  });

  // 2.댓글 수정
  // 오른쪽 닉네임___________________________머지 후 로그인 되어있는사람으로 변경
  const cehckBtn2 = document.querySelectorAll(".check_btn2");
  cehckBtn2.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (tips.nick_name === "nick_name") {
        const commentContainer = button.closest(".comment_list");
        const existingInput = commentContainer.querySelector(".updateInput");
        if (existingInput) {
          // 이미 수정 입력 필드가 있는 경우, 제거
          existingInput.remove();
          const existingUpdateBtn = commentContainer.querySelector(".updateBtn");
          const existingCancelBtn = commentContainer.querySelector(".cancelBtn");
          if (existingUpdateBtn) existingUpdateBtn.remove();
          if (existingCancelBtn) existingCancelBtn.remove();
        } else {
          // 수정 입력 필드가 없는 경우, 추가
          const commentupload = document.createElement("input");
          commentupload.classList.add("updateInput");
          const commentUpBtn = document.createElement("button");
          commentUpBtn.classList.add("updateBtn");
          commentUpBtn.dataset.id = commentContainer.dataset.id;
          commentUpBtn.innerHTML = "등록";
          const commentCBtn = document.createElement("button");
          commentCBtn.classList.add("cancelBtn");
          commentCBtn.innerHTML = "취소";
          commentCBtn.addEventListener("click", () => {
            // 취소 버튼 클릭 시 입력 필드와 버튼 제거
            commentupload.remove();
            commentUpBtn.remove();
            commentCBtn.remove();
          });
          commentContainer.children[1].append(commentupload, commentUpBtn, commentCBtn);

          commentUpBtn.addEventListener("click", async () => {
            try {
              const json = {
                nick_name: "nick_name",
                comment: commentupload.value,
                id,
                commentId: commentUpBtn.dataset.id,
              };
              const result = await axios.put(`http://127.0.0.1:3000/whisky/commentupdate/${id}`, json);
              location.reload(); // 필요한 경우 결과에 따라 추가 작업 수행
            } catch (error) {
              console.error("Error updating comment:", error);
            }
          });
        }
      } else {
        alert("아이디를 확인해주세요.");
      }
    });
  });

  //댓글 삭제
  // 오른쪽 닉네임___________________________머지 후 로그인 되어있는사람으로 변경
  const cehckDot3 = document.querySelectorAll(".check_btn3");
  // console.log(cehckDot3);
  const test = document.querySelectorAll(".comment_list");

  cehckDot3.forEach((deletecomment) => {
    for (let i = 0; i < test.length; i++) {
      if (cehckDot3[i] === deletecomment) {
        console.log(cehckDot3[i]);
        deletecomment.dataset.id = test[i].dataset.id;
        deletecomment.addEventListener("click", async (e) => {
          if (tips.nick_name === "nick_name") {
            if (cehckDot3[i] === deletecomment) {
              const json = {
                nick_name: "nick_name",
                comment_id: deletecomment.dataset.id,
                tip_ID: id,
              };
              const result = await axios.delete(`http://127.0.0.1:3000/whisky/commentDelete/${id}`, { data: json });
              location.reload();
            }
          }
        });
      }
    }
  });
  // 1. 대댓글 => 첫번재 이미지 클릭시 input창이 나옴
  const checkBtn1 = document.querySelectorAll(".check_btn1");
  checkBtn1.forEach(button => {
    button.addEventListener("click", () => {
      const commentContainer = button.closest(".comment_list");
      const Ccomment = commentContainer.querySelector(".Ccomment");
      const existingBox = Ccomment.querySelector('.Box');
      if (!existingBox) {
        const btnbox = document.createElement('div');
        btnbox.classList.add('Box');
        btnbox.innerHTML = `
        <input class="write_input" type="text" placeholder="댓글에 대한 생각을 공유해주세요">
        <button class="write_btn">등록</button>
        `;
        Ccomment.append(btnbox);
      } else {
        existingBox.remove()
      }
    });
  });

  // 1. 대댓글 데이터 전송
  const writeInput = btnbox.querySelector(".write_input")
  console.log(writeInput);
  const writeBtn = document.querySelector(".write_btn")
  // writeBtn.addEventListener("click", async () => {
  //   const writeInput = btnbox.querySelector(".write_input");
  //   if (!writeInput.value) {
  //     alert("댓글을 입력해주세요");
  //     return;
  //   }
  const json = { Ccomment: writeInput.value, nickname: "nick_name", id: id };
  console.log(json);



});

// 목록버튼 이동
const tipCorrecionBtn = document.querySelector("#tipCorrecionBtn");
tipCorrecionBtn.addEventListener("click", () => {
  location.href = "./whiskytip.snack.html";
});

// 동일 작성자만 수정, 삭제가능
// 동일 작성자가 아닐때는 팝업창 띄어주기

// 상세페이지 수정
const checkModify = document.querySelector(".tip_check_modify");

checkModify.addEventListener("click", async () => {
  const id = new URLSearchParams(location.search).get("id");
  console.log(id);
  location.href = `http://127.0.0.1:5501/frontend/html/whiskytip.modify.html?id=${id}`;
  // await axios.put(`http://localhost:3000/whisky/modify/${id}`)
});

// 상세페이지 삭제
const checkDeleteList = document.querySelectorAll(".tip_check_delete");
checkDeleteList.forEach((checkDelete) => {
  checkDelete.addEventListener("click", async (el) => {
    //el에 데이타 셋에
    const category = uploadBox.getAttribute("name");
    const id = new URLSearchParams(location.search).get("id");
    const checkImg = document.querySelector("#checkImg").src;
    const check = confirm("삭제하시겠습니까?");
    if (check) {
      const data = new FormData();
      // data.append("title", tipCorrecionTitle)
      // data.append("content", tipCorrecionContent)
      data.append("category", category);
      data.append("file", checkImg);
      const response = await axios.delete(`http://localhost:3000/whisky/delete/${el.target.dataset.index}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      location.href = `http://127.0.0.1:5501/frontend/html/whiskytip.snack.html`;
    }
  });
});
