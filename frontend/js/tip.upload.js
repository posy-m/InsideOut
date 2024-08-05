// const tipCorrecionBtn = document.querySelector("#tipCorrecionBtn")
// const cancellationBtn = document.querySelector("#cancellationBtn")

// document.addEventListener("DOMContentLoaded", () => {

const tipCorrecionBtn = document.querySelector("#tipCorrecionBtn");
const cancellationBtn = document.querySelector("#cancellationBtn");
const uploadBox = document.querySelector("#uploadBox");


uploadBox.addEventListener("submit", async (e) => {
  // e.preventDefault();
  const tipCorrecionTitle = document.querySelector("#tipCorrecionTitle").value;
  const tipCorrecionContent = document.querySelector("#tipCorrecionContent").value;
  const tipFile = document.querySelector("#tipFile").files[0];
  const category = document.querySelector("#category").value

  if (!tipCorrecionTitle || !tipCorrecionContent || !tipFile) {
    alert("세 개의 값을 모두 입력해주세요.");
    return;
  }

  const check = confirm("등록하시겠습니까?");
  if (!check) {
    // console.log("erete");
    // debugger
    return;
  }

  // const formData = new FormData();
  // formData.append("title", tipCorrecionTitle);
  // formData.append("content", tipCorrecionContent);
  // formData.append("file", tipFile);
  // formData.append("category", category)
  // debugger;
  // try {
  //   console.log(2);
  //   const response = await axios.post(`http://127.0.0.1:3000/whisky/upload`, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   });
  //   console.log(response);
  //   console.log(1);
  //   debugger;
  //   if (response.status) {
  //     const newID = response.data.id; // 서버에서 새로운 ID를 반환한다고 가정
  //     location.href = `http://127.0.0.1:5501/frontend/html/whiskytip.check.html?id=${newID}`;
  //     // location.href = "http://127.0.0.1:5501/frontend/html/whiskytip.snack.html"
  //     return;
  //   } else {
  //     alert("업로드에 실패했습니다.");
  //   }
  // } catch (error) {
  //   console.error('Error:', error);
  //   alert("업로드 중 오류가 발생했습니다.");
  // }
});



// 취소 버튼
cancellationBtn.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5501/frontend/html/whiskytip.snack.html";
});
//});







