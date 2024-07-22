const tipCorrecionBtn = document.querySelector("#tipCorrecionBtn")


tipCorrecionBtn.addEventListener("click", (e) => {
  e.preventDefault()
  const tipCorrecionTitle = document.querySelector("#tipCorrecionTitle").values
  const tipCorrecionContent = document.querySelector("#tipCorrecionContent").values
  const tipFile = document.querySelector("#ripFile")


  axios.post(`http://127.0.0.1:3000/whisky`).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.log(error);
  })
  // 요청을 보내고 싶은 주소
  // post 전달할 바디 내용 
})
