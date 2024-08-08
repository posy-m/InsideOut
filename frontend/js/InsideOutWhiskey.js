


///////////////////////// 중간 슬라이스 모션 주기 /////////////////////////
/////// arousel_box : 중간 이미지들 잡고있는 박스  
const carousel_box = document.querySelector("carousel_box");
/////// carousel_input_img_box : 이미지 들어갈 박스
const mainimg = document.querySelector(".mainimg");
////// carousel_image_box_btn : 크게 보일 이미지
const smollimg = document.querySelectorAll(".smollimg");


smollimg.forEach(smollimg => {
  smollimg.addEventListener("click", function () {
    mainimg.src = this.src;
  })
})
console.log(smollimg);

  let i = 0; // i 변수를 함수 외부에서 선언

  setInterval(() => {
      mainimg.src = smollimg[i].src;
      i++;
      if (i >= 5) { // i가 5 이상일 때 0으로 초기화
          i = 0;
      }
  }, 3000);




  /*명언 오른쪽왼쪽누르면 넘어가는 모션 */
const bigQuote = document.querySelector(".bigQuote");
const quoteBoxFrame = document.querySelector(".quoteBoxFrame");
const famousQuote = document.querySelector(".famousQuote");
const quoteBoxFrame2 = document.querySelector(".quoteBoxFrame2");
const quoteBoxFrame3 = document.querySelector(".quoteBoxFrame3");
const famoustext = document.querySelector(".famoustext");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const quoteFrames = bigQuote.children;
let count = 0;
next.addEventListener("click", () => {
  quoteFrames[count].style.display = "none";
  count++;
  if (count == 3) {
    count = 0;
  }
  quoteFrames[count].style.display = "block";
})
prev.addEventListener("click", () => {
  quoteFrames[count].style.display = "none";
  count--;
  if (count == -1) {
    count = 2;
  }
  quoteFrames[count].style.display = "block";
})
console.log(quoteFrames);





// let verticalBar = document.getElementById("vertical-underline");
// let horizontalBar = document.getElementById("horizontal-underline");
// let horizontalMenus = document.querySelectorAll("nav:first-child a");
// let verticalMenus = document.querySelectorAll("nav:nth-child(2) a");

// function verticalIndicator(e) {
//   verticalBar.style.left = e.offsetLeft + "px";
//   verticalBar.style.width = e.offsetWidth + "px";
//   verticalBar.style.top = e.offsetTop + e.offsetHeight + "px";
// }
// function horizontalIndicator(e) {
//   horizontalBar.style.left = e.offsetLeft + "px";
//   horizontalBar.style.width = e.offsetWidth + "px";
//   horizontalBar.style.top = e.offsetTop + e.offsetHeight + "px";
// }

// horizontalMenus.forEach((menu) =>
//   menu.addEventListener("click", (e) =>
//     horizontalIndicator(e.currentTarget)
//   )
// );

// verticalMenus.forEach((menu) =>
//   menu.addEventListener("click", (e) => verticalIndicator(e.currentTarget))
// );






const butTip =document.querySelector("#butTip");
const butInfo =document.querySelector("#butInfo");
const butqa =document.querySelector("#butqa");
const butLogin =document.querySelector("#butLogin");
const meetTip =document.querySelector("#meetTip");


/*헤더 맛팁에서 사이트로 이동  */
butTip.addEventListener("click",(e)=>{
  e.preventDefault();
  window.location.href = ""
})

/*정보사이트로 이동 */
butInfo.addEventListener("click",(e)=>{
  e.preventDefault();
  window.location.href = "infoDetail.html"
})

/*Q&A이동 */
butqa.addEventListener("click",(e)=>{
  e.preventDefault();
  window.location.href = ""
})

/*로그인으로 이동 */
butLogin.addEventListener("click",(e)=>{
  e.preventDefault();
  window.location.href = ""
})
/*중간 맛팁사이트로 이동 */
meetTip.addEventListener("click",(e)=>{
  e.preventDefault();
  window.location.href = ""
})
const loginButton = document.querySelector('.login-button');

loginButton.addEventListener('click', () => {
  var popupX = (document.body.offsetWidth / 2) - (700 / 2);
  var popupY = (window.screen.height / 2) - (500 / 2);
  var popupWindow = window.open('http://127.0.0.1:5501/frontend/login.html', '', 'status=no, height=500, width=700, left=' + popupX + ', top=' + popupY);

  // message 이벤트 리스너가 중복되지 않도록 하는 함수
  const handleMessage = async (event) => {
    if (event.data.type === 'popupClosed') {
      window.location.reload();
      // 새창 종료 후 수행할 작업을 여기에 추가
      window.removeEventListener('message', handleMessage);
    }
  };

  // message 이벤트 리스너 추가
  window.addEventListener('message', handleMessage);
});


// 로그인 후 쿠키 확인 및 처리
async function main() {
  const accessToken = document.cookie.split('; ').find(row => row.startsWith('token='));
  // if (accessToken) {
  //   console.log('Token found:', accessToken.split('=')[1]);
  //   axios.defaults.headers.common['Authorization'] = accessToken.split('=')[1];
  //   // 쿠키가 있으면 필요한 작업을 수행합니다.
  // } else {
  //   console.log('Token not found');
  // }
  try {
    // axios.defaults.authorazation = accessToken.split('=')[1]
    const response = await axios.get('http://localhost:3000/insideOutInfo', { withCredentials: true });
    if (response) {
      loginButton.classList.add('hide');
      const textBox = document.getElementById('textLine');
      const textLine = document.createElement('div');
      const logOut = document.createElement('button');
      logOut.innerHTML = '로그아웃'
      textBox.append(textLine);
      textBox.append(logOut);
      textLine.innerHTML = response.data.nick_name;

      logOut.onclick = async () => {
        const deleteCookie = await axios.post('http://localhost:3000/insideOutInfo/logout', {}, { withCredentials: true });
        console.log(deleteCookie.data.message)
        window.location.reload();
      }
    }
  } catch (error) {
    if (!error.response) {
      // network error
      this.errorStatus = 'Error: Network Error';
    } else {
      this.errorStatus = error.response.data.message;
    }
  }
}

main()

const tipBtn = document.getElementById("tipBtn")
tipBtn.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5501/frontend/html/main.html"
})

