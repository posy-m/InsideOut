document.addEventListener("DOMContentLoaded", async () => {
  if (document.cookie) {
    const deleteClass = document.getElementById('tipBtn');
    deleteClass.classList.remove('hide');
  }
  const tipContentWrap = document.querySelector("#tipContentWrap");
  const searchButton = document.querySelector("#searchButton");
  const searchInput = document.querySelector("#searchInput");
  const pageNation = document.querySelector("#pageNation");

  let currentPage = 1;
  const limit = 16;

  async function getSearchData(page = 1) {
    const split = location.href.split("/")
    const path = split[split.length - 1].split('?')[0]
    let category = 1
    if (path === "whiskytip.snack.html") category = 1
    else if (path === "whiskytip.recipe.html") category = 2
    else if (path === "whiskytip.info.html") category = 3
    console.log(category);
    try {
      const response = await axios.get(`http://localhost:3000/whisky/snack`, {
        params: {
          query: searchInput.value,
          page,
          limit,
          category
        },
      });
      const { tips, totalPages } = response.data;

      console.log(response)
      tipContentWrap.innerHTML = "";
      tips.forEach((tip) => {
        const tipElement = document.createElement("div");
        tipElement.dataset.set = tip.id;
        tipElement.className = "tip";
        // <img src="/backend/uploads/${tip.img}" alt="" class="tipImg" data-set="${tip.id}">
        tipElement.innerHTML = `
        <img src="http://localhost:3000/${tip.img}" alt="" class="tipImg" data-set="${tip.id}">
          <div id="titleWD">
            <span class="tip_content_title">${tip.tip_title}</span>
            <span class="tip_content_writer tip_wd">${tip.nick_name}</span>
            <span class="tip_content_date tip_wd">${new Date(tip.createdAt).toLocaleDateString()}</span>
          </div>
        `;
        // tipElement.addEventListener("click", () => {
        //   window.location.href = `/tipDetail/${tip.id}`;
        // });
        console.log(`Image Path: http://localhost:3000/uploads/${tip.img}`);
        tipContentWrap.appendChild(tipElement);

        const tipList = document.querySelectorAll(".tip");

        tipList.forEach(el => {
          const id = el.dataset.set;
          el.onclick = (e) => {
            console.log(e.target.dataset["set"]);
            location.href = `http://127.0.0.1:5501/frontend/html/whiskytip.check.html?id=${id}`;
          };
        })
      });




      // const param = tips;
      // for (let i = 0; i < param.length; i++) {
      //   // console.log(param);
      //   tipContentWrap.onclick = (e) => {
      //     console.log(e.target.dataset["set"]);
      //     location.href = `http://127.0.0.1:5501/frontend/html/whiskytip.check.html?id=${e.target.dataset["set"]}`;
      //   };
      // }


      renderPagination(totalPages);
    } catch (error) {
      console.error("Failed to fetch tips", error);
    }
  }

  function renderPagination(totalPages) {
    pageNation.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const pageElement = document.createElement("span");
      pageElement.textContent = i;
      if (i === currentPage) {
        pageElement.style.fontWeight = "bold";
      }
      pageElement.addEventListener("click", () => {
        currentPage = i;
        getSearchData(currentPage);
      });
      pageNation.appendChild(pageElement);
    }
  }

  searchButton.addEventListener("click", async () => {
    currentPage = 1;
    getSearchData(currentPage);
  });

  getSearchData(currentPage);
});

const tipBtn = document.querySelector("#tipBtn");
tipBtn.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5501/frontend/html/whiskytip.upload.html";
});

// 이벤트 발생

// const tipImg = document.querySelectorAll(".tipImg")

// tipImg.forEach((e, index) => {
//   console.log(e)
//   e.addEventListener("mouseover", (el) => {
//     console.log(el)
//     const titleWD = document.querySelector("#titleWD")
//     titleWD.style.visibility = "visible"
//     console.log(1200);
//   })

// })

// 검색창
document.getElementById('searchButton').addEventListener('click', function () {
  const searchInput = document.getElementById('searchInput');
  const overlay = document.getElementById('overlay');

  if (searchInput.classList.contains('open')) {
    searchInput.classList.remove('open');
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
  } else {
    searchInput.classList.add('open');
    searchInput.focus();
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
  }
});

document.getElementById('overlay').addEventListener('click', function () {
  const searchInput = document.getElementById('searchInput');
  const overlay = document.getElementById('overlay');

  searchInput.classList.remove('open');
  overlay.style.opacity = '0';
  overlay.style.visibility = 'hidden';
});


const loginButton = document.querySelector('.login-button');

loginButton.addEventListener('click', () => {
  var popupX = (document.body.offsetWidth / 2) - (700 / 2);
  var popupY = (window.screen.height / 2) - (500 / 2);
  window.open('http://127.0.0.1:5501/frontend/login.html', '', 'status=no, height=500, width=700, left=' + popupX + ', top=' + popupY);
});


// 로그인 후 쿠키 확인 및 처리
async function main() {
  const accessToken = document.cookie.split('; ').find(row => row.startsWith('token='));
  if (accessToken) {
    console.log('Token found:', accessToken.split('=')[1]);
    axios.defaults.headers.common['Authorization'] = accessToken.split('=')[1];
    // 쿠키가 있으면 필요한 작업을 수행합니다.
  } else {
    console.log('Token not found');
  }
  try {
    const response = await axios.get('http://localhost:3000/insideOutInfo');
    if (response) {
      loginButton.classList.add('hide');
      const textBox = document.getElementById('textLine');
      const textLine = document.createElement('div');
      const logOut = document.createElement('button');
      logOut.innerHTML = '로그아웃'
      textBox.append(textLine);
      textBox.append(logOut);
      textLine.innerHTML = response.data.nick_name;

      logOut.onclick = () => {
        deleteCookie('token');
      }

      function deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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

const tip = document.getElementById("tip")
tip.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5501/frontend/html/main.html"
})









