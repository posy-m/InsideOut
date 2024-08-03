


document.addEventListener("DOMContentLoaded", async () => {
  const id = new URLSearchParams(location.search).get("id")
  // console.log(id);

  const response = await axios.get(`http://localhost:3000/whisky/modify/${id}`)
  const tips = response.data;
  // console.log(tips);

  const uploadBox = document.querySelector("#uploadBox")
  const modifyCheck = document.createElement("div")
  modifyCheck.className = 'modifyUpWrap'
  // debugger;
  modifyCheck.innerHTML = `
  <select name="category" id="category">
  <option value="1" ${tips.category === 1 && 'selected'}>snack</option>
  <option value="2" ${tips.category === 2 && 'selected'}>recipe</option>
  <option value="3" ${tips.category === 3 && 'selected'}>Information</option>
</select>
  <input type="text" value="${tips.tip_title}" id="tipModifyTitle" name="title">
  <div id ="modifyBox">
  <img id="checkImg" src='http://localhost:3000/${tips.img}'>
  <textarea name="content" id="tipCorrecionContent">${tips.tip_content}</textarea>
  </div>

  <!-- 버튼 쪽 -->
  <div id="uploadBoxBtn">
    <input type="file" id="tipFile" >
    <div>
      <button id="cancellationBtn" type="button">취소</button>
      <button type="button" id="tipModifyBtn">확인</button>
    </div>
  </div>
  `

  uploadBox.appendChild(modifyCheck)

  // 수정 보내기
  const tipModifyBtn1 = document.querySelector("#tipModifyBtn")
  tipModifyBtn1.onclick = async () => {
    console.log("test")
    const tipModifyTitle = document.querySelector("#tipModifyTitle").value
    // console.log(document.querySelector("#checkImg"));
    const _checkImg = document.querySelector("#tipFile").files[0]
    const tipCorrecionContent = document.querySelector("#tipCorrecionContent").value
    const category = document.querySelector("#category").value



    const id = new URLSearchParams(location.search).get("id")
    if (_checkImg != null) {
      const formData = new FormData();
      formData.append("title", tipModifyTitle);
      formData.append("content", tipCorrecionContent);
      formData.append("file", _checkImg);
      formData.append("category", category);
      const data = await axios.put(`http://localhost:3000/whisky/modify/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } else {
      // debugger;
      const data = {
        title: tipModifyTitle,
        content: tipCorrecionContent,
        category: category,
        img: document.querySelector("#checkImg").src
      }
      const response = await axios.put(`http://localhost:3000/whisky/modify/${id}`, data);
    }


    location.href = `http://127.0.0.1:5501/frontend/html/whiskytip.snack.html`
  }
})



