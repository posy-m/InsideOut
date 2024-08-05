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
    // console.log(json);
    const result = await axios.post(`http://127.0.0.1:3000/whisky/comment`, json, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    location.reload();
  };


  // 댓글
  const { data } = await axios.get(`http://127.0.0.1:3000/whisky/fix/${id}`);
  // 대댓글 
  const response2 = await axios.get(`http://127.0.0.1:3000/whisky/Ccomments/${id}`);
  const commentData = response2.data;
  // console.log(data);
  const commentBtnWrap = document.querySelector("#commentBtnWrap");
  data.forEach((e, index) => {
    const date = new Date(e.updatedAt);
    const month = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
    const str = `${date.getFullYear()}/${month}/${date.getDate()}`;
    const commentwrap = document.createElement('div')
    commentwrap.classList.add('commentBox')
    // a.classList.add('comment_list', `d${index}`);
    const a = document.createElement("div");
    a.classList.add("comment_list");
    a.dataset.id = e.id;
    a.innerHTML = `
    <div class="comment-text-icon">
      <div id="commentSmallText">
        <div class="writer">${e.nick_name}</div>
        <div class="write_content">${e.tip_comment}</div>
        <div>${str}</div>
      </div>
      <div id="icon">
        <img  id="cehckDot1" class="checkicon check_btn1" src="../img/comment.png" alt="">
        <img id="cehckDot2" class="checkicon check_btn2" src="../img/pen.png" alt="">
        <img  id="cehckDot3" class="checkicon check_btn3" src="../img/trashcan.jpeg" alt="">
      </div>
    </div>
      <div class="outside"></div>
      <div class="Ccomment"></div>
   
      `;
    commentwrap.append(a)
    commentBtnWrap.append(commentwrap);


    // 대댓글
    commentData.forEach((reply) => {
      const comment = document.querySelectorAll(".commentBox")
      if (e.id === reply.tip_comment_ID) {
        // console.log(e.id === reply.tip_comment_ID);
        // console.log(e.id);
        // console.log(reply.tip_comment_ID);
        const date = new Date(reply.updatedAt);
        const month = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
        const str = `${date.getFullYear()}/${month}/${date.getDate()}`;
        const replyElement = document.createElement("div");
        replyElement.classList.add("reply");
        replyElement.dataset.id = reply.id;
        replyElement.innerHTML = `
        <img  id="lineImg" class="checkicon check_btn3" src="../img/line.png" alt="">
      <div id="replyBBox">
      <div class="replyWCM">
        <div class="writer">${reply.nick_name}</div>
        <div>${reply.tip_com_comment}</div>
        <div>${str}</div>
      </div>
      <div class="replyBtnBox">
        <div>
          <button class="reply_correction reply-btn" data-id=${reply.id}>수정</button>
          <button class="reply_delete reply-btn">삭제</button>
        </div>
      </div>
      </div>
      `;
        // console.log("replyElement")
        commentwrap.appendChild(replyElement)
        // // 대댓글을 소속된 댓글 아래에 추가
        // const parentComment = document.querySelector(`.comment_list[data-id='${reply.tip_comment_Id}'] .Ccomment`);
        // if (parentComment) {
        //   parentComment.append(replyElement);
        // }

      }
    });
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
          commentupload.placeholder = "댓글을 수정해주세요"
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
          const outside = document.querySelector(".outside")
          outside.append(commentupload, commentUpBtn, commentCBtn)
          // commentContainer.children[1].append(commentupload, commentUpBtn, commentCBtn);

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
        // console.log(cehckDot3[i]);
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
    button.addEventListener("click", (e) => {
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

        const writeBtn = btnbox.querySelector(".write_btn");
        writeBtn.addEventListener("click", async (e) => {
          const writeInput = btnbox.querySelector(".write_input");
          if (!writeInput.value) {
            alert("댓글을 입력해주세요");
            return;
          }

          const commentId = commentContainer.dataset.id; // 댓글의 ID 가져오기
          const json = { tip_comment_Id: commentId, Ccomment: writeInput.value, nickname: "nick_name", category: id };
          // console.log(json);
          const result = await axios.post(`http://127.0.0.1:3000/whisky/Ccomment`, json, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          location.reload()
        });
      } else {
        existingBox.remove();
      }
    });
  });

  const replyCorrectionBtn = document.querySelectorAll(".reply_correction");
  replyCorrectionBtn.forEach((replyBtn) => {
    replyBtn.addEventListener("click", (e) => {
      // console.log(tips.nick_name);
      console.log(replyBtn.dataset.id);
      if (tips.nick_name === "nick_name") {
        const replyBtnBox = replyBtn.closest(".replyBtnBox");

        let existingInput = replyBtnBox.querySelector('input');
        // let existingCheckBtn = replyBtnBox.querySelector('.last_check_btn');
        // let existingCancelBtn = replyBtnBox.querySelector('.last_cancel_btn');

        if (!existingInput) {
          const replyCorrentInput = document.createElement('input');
          replyCorrentInput.classList.add("last_check_input")
          const replycheckBtn = document.createElement('button');
          replycheckBtn.innerHTML = "확인";
          replycheckBtn.classList.add("last_check_btn", "lastCheck");
          const replycancleBtn = document.createElement('button');
          replycancleBtn.innerHTML = "취소";
          replycancleBtn.classList.add("last_cancel_btn", "lastCheck");

          replyBtnBox.append(replyCorrentInput, replycheckBtn, replycancleBtn);
          // replyBtnBox.append(replyCorrentInput, replycheckBtn, replycancleBtn);

          replycheckBtn.addEventListener("click", async (e) => {
            const replyInputValue = replyCorrentInput.value;
            const commentContainer = replyBtn.closest(".reply");
            console.log(commentContainer);
            const replyId = commentContainer.dataset.id;
            console.log(replyId);

            const replyData = {
              id: replyId,
              comment: replyInputValue
            };
            console.log(replyData);
            const response = await axios.put(`http://127.0.0.1:3000/whisky/Ccommentupdate/${replyId}`, replyData);
            location.reload()

          });

          replycancleBtn.addEventListener("click", (e) => {
            replyCorrentInput.remove();
            replycheckBtn.remove();
            replycancleBtn.remove();
          });
        }
      }
    });
  });



  // 4. 대댓글 삭제
  const replyDeleteBtn = document.querySelectorAll(".reply_delete")
  console.log(replyDeleteBtn);

  replyDeleteBtn.forEach(async (replyDBtn) => {
    replyDBtn.addEventListener("click", async (gd) => {
      if (tips.nick_name === "nick_name") {
        const commentContainer = replyDBtn.closest(".reply");
        console.log(commentContainer);
        const replyId = commentContainer.dataset.id;
        console.log(replyId);

        if (!confirm("삭제하시겠습니까?")) { return }
        const response = await axios.delete(`http://127.0.0.1:3000/whisky/CcommentDelete/${replyId}`)
        if (response.status === 200) {
          location.reload()
        }
      }
    })
  })






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
    // console.log(id);
    location.href = `http://127.0.0.1:5501/frontend/html/whiskytip.modify.html?id=${id}`;
    // await axios.put(`http://localhost:3000/whisky/modify/${id}`)
    // location.href = `http://127.0.0.1:5501/frontend/html/whiskytip.check.html?id=${id}`
  });

  // 상세페이지 삭제
  const checkDeleteList = document.querySelectorAll(".tip_check_delete");
  checkDeleteList.forEach((checkDelete) => {
    checkDelete.addEventListener("click", async (el) => {
      console.log(tips.id);
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
        const response = await axios.delete(`http://localhost:3000/whisky/delete/${tips.id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        location.href = `http://127.0.0.1:5501/frontend/html/whiskytip.snack.html`;
      }
    });
  });
});

