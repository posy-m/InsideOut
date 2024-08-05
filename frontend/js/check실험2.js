document.addEventListener("DOMContentLoaded", async (e) => {
  const id = new URLSearchParams(location.search).get("id")
  // console.log(id)
  const response = await axios.get(`http://localhost:3000/whisky/check/${id}`)

  const tips = await response.data
  // await console.log(tips);

  console.log(tips.id);


  // console.log(element);
  const checkDataWrap = document.querySelector("#checkDataWrap");
  const checkBox = document.createElement("div")

  checkBox.innerHTML = `
      <div id = "tipCorrecionTitle">${tips.tip_title}</div>
      <div id="tipCorrecionContent">
      <div id="tipContent">
      <img id="checkImg" src='http://localhost:3000/${tips.img}'>
      ${tips.tip_content}
      </div>
      </div>
      `;
  checkDataWrap.append(checkBox)

  // 조회 댓글 등록 버튼 누를시 뿌려준다.
  //const commentresult= await axios.get(`http://127.0.0.1:3000/whisky/fix/${id}`)
  const { data } = await axios.get(`http://127.0.0.1:3000/whisky/fix/${id}`)
  const commentBtnWrap = document.querySelector("#commentBtnWrap")
  data.forEach((e, index) => {
    const date = new Date(e.updatedAt);
    const month = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`
    const str = `${date.getFullYear()}/${month}/${date.getDate()}`;
    // console.log(str)
    // console.log(e);
    const a = document.createElement('div')
    a.classList.add('comment_list', `d${index}`);
    // a.classList.add(`d${index}`);
    a.innerHTML = `
    <div id="comment">
      <div id="commentSmallText">
        <div class="writer">${e.nick_name}</div>
        <div>${e.tip_comment}</div>
        <div>${str}</div >
      </div >
      <div id="icon">
        <button id="cehckDot1" class="check_btn1"><img class="checkicon" src="../img/comment.png" alt=""></button>
        <button id="cehckDot2" class="check_btn2" ><img class="checkicon" src="../img/pen.png" alt=""></button>
        <button id="cehckDot3" class="check_btn3" data-index=${index}><img class="checkicon" src="../img/trashcan.jpeg" alt=""></button>
      </div>
    </div >
    <div class="outside"></div>
      `
    commentBtnWrap.append(a)
  });
  // console.log(e.target)


  // 댓글 삭제
  const cehckDot3 = document.getElementById("cehckDot3");
  if (cehckDot3) {
    cehckDot3.onclick = async () => {
      try {
        const index = cehckDot3.getAttribute("data-index");
        const data = await axios.get(`http://127.0.0.1:3000/whisky/fix/${id}`);
        await console.log(data);
        const json = await {
          id: data.data[index].id,
          nick_name: "nick_name",
          tip_ID: data.data[index].tip_ID
        }
        // console.log(json)
        const response = await axios.delete(`http://localhost:3000/whisky/commentDelete`, { data: json })
        await console.log(response);
        const commentSelect = document.querySelector(`.d${index}`)
        await commentSelect.remove();
        await location.reload();
      } catch (error) {
        console.error('this', error)
      }
    }
  }



  // 댓글 수정
  const cehckDot2 = document.querySelectorAll(".check_btn2");
  cehckDot2.forEach((button) => {
    button.addEventListener("click", (e) => {

      // 오른쪽 닉네임___________________________머지 후 로그인 되어있는사람으로 변경
      if (tips.nick_name === "nick_name") {
        // 입력 필드와 버튼 생성
        // test.forEach((e) => {
        //   test[e].children[1].append(commentupload)
        // })
        const test = document.querySelectorAll('.comment_list')
        for (let i = 0; i < test.length; i++) {
          if (cehckDot2[i] === button) {
            const commentupload = document.createElement('input');
            commentupload.classList.add('updateInput')
            const commentUpBtn = document.createElement('button');
            commentUpBtn.classList.add('updateBtn')
            commentUpBtn.innerHTML = '등록';
            const commentCBtn = document.createElement('button');
            commentCBtn.innerHTML = '취소';
            commentCBtn.onclick = () => {
              // 취소 버튼 클릭 시 입력 필드와 버튼 제거
              commentupload.remove();
              commentUpBtn.remove();
              commentCBtn.remove();
            };
            test[i].children[1].append(commentupload, commentUpBtn, commentCBtn)
          }
        }

        const commentUpBtn = document.querySelector('.updateBtn')
        const commentValue = document.querySelector('.updateInput')

        commentUpBtn.onclick = async (e) => {
          console.log(e)
          const json = {
            nick_name: "nick_name",
            comment: commentValue.value
          };
          const result = await axios.put(`http://127.0.0.1:3000/whisky/commentupdate/${id}`, json);
          location.reload();
          // 필요한 경우 결과에 따라 추가 작업 수행
        };

        // 댓글 영역에 입력 필드와 버튼 추가
      }
    });
  });



  // 댓글
  const commentBtn = document.querySelector("#commentBtn")

  commentBtn.addEventListener("click", async (e) => {
    const date = new Date();
    const month = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`
    const str = `${date.getFullYear()} / ${month} / ${date.getDate()}`;

    //데이터에 담아서 보내야함!
    const commenText = document.querySelector("#commenText");

    // const formData = new FormData();
    // formData.append("commentText", commenText)
    // formData.append("nickname", "nick_name")
    // formData.append("id", 1);

    const json = { "commentText": commenText.value, "nickname": "nick_name", "id": id }

    // console.log(json);

    const result = await axios.post(`http://127.0.0.1:3000/whisky/comment`, json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // console.log(result);
    const a = document.createElement('div')
    const IIdex = document.querySelectorAll(".check_btn1").length;

    a.innerHTML = `
      <div id="comment">
        <div id="commentSmallText">
          <div class="writer">${result.data.nick_name}</div>
          <div>${result.data.tip_comment}</div>
          <div>${str}</div >
        </div >
        <div id="icon">
          <button id="cehckDot1" class="check_btn1"><img class="checkicon" src="../img/comment.png" alt=""></button>
          <button id="cehckDot2" class="check_btn2"><img class="checkicon" src="../img/pen.png" alt=""></button>
          <button id="cehckDot3" class="check_btn3" data-index=${IIdex}><img class="checkicon" src="../img/trashcan.jpeg" alt=""></button>
        </div>
      </div >
      <div class="outside"></div>
      `

    commentBtnWrap.appendChild(a)

    commenText.value = '';
  })
})

// 목록버튼 이동
const tipCorrecionBtn = document.querySelector("#tipCorrecionBtn")
tipCorrecionBtn.addEventListener("click", () => {
  location.href = "./whiskytip.snack.html"
})


// 동일 작성자만 수정, 삭제가능
// 동일 작성자가 아닐때는 팝업창 띄어주기

//수정
const checkModify = document.querySelector(".tip_check_modify")

checkModify.addEventListener("click", async () => {
  const id = new URLSearchParams(location.search).get("id")
  console.log(id);
  location.href = `http://127.0.0.1:5501/frontend/html/whiskytip.modify.html?id=${id}`
  // await axios.put(`http://localhost:3000/whisky/modify/${id}`)
})


// 삭제
const checkDeleteList = document.querySelectorAll(".tip_check_delete")
checkDeleteList.forEach((checkDelete) => {


  checkDelete.addEventListener("click", async (el) => {
    //el에 데이타 셋에
    const category = uploadBox.getAttribute('name');
    const id = new URLSearchParams(location.search).get("id")
    const checkImg = document.querySelector("#checkImg").src
    const check = confirm("삭제하시겠습니까?")
    if (check) {
      const data = new FormData();
      // data.append("title", tipCorrecionTitle)
      // data.append("content", tipCorrecionContent)
      data.append("category", category)
      data.append("file", checkImg)
      const response = await axios.delete(`http://localhost:3000/whisky/delete/${el.target.dataset.index}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      location.href = `http://127.0.0.1:5501/frontend/html/whiskytip.snack.html`

    }

  })

})


