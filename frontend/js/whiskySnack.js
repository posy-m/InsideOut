document.addEventListener("DOMContentLoaded", async () => {
  async function getSearchData() {
    const tipBtn = document.querySelector("#tipBtn");
    const tipContentWrap = document.querySelector("#tipContentWrap");
    const searchButton = document.querySelector("#searchButton");
    const searchInput = document.querySelector("#searchInput");
    //
    // console.log(tips);
    let response = await axios.get(`http://localhost:3000/whisky/search?query=${searchInput.value}`);
    let tips = response.data;
    try {
      tipContentWrap.innerHTML = "";
      tips.forEach((tip) => {
        const tipElement = document.createElement("div");

        tipElement.className = "tip";
        tipElement.innerHTML = `
        <img src="/backend/uploads/${tip.img}" alt="" class="tipImg" data-set="${tip.id}">
        <div id="titleWD">
          <span class="tip_content_title">${tip.tip_title}</span>
          <span class="tip_content_writer tip_wd">${tip.nick_name}</span>
          <span class="tip_content_date tip_wd">${new Date(tip.createdAt).toLocaleDateString()}</span>
        </div>
        `;
        tipContentWrap.appendChild(tipElement);
        // tipContentWrap.innerHTML += tipElement.innerHTML;
        // debugger;
      });
    } catch (error) {
      console.error("Failed to fetch tips", error);
    }
    const param = tips;
    for (let i = 0; i < param.length; i++) {
      console.log(param);
      tipContentWrap.onclick = (e) => {
        console.log(e.target.dataset["set"]);
        location.href = `http://127.0.0.1:5501/frontend/html/whiskytip.check.html?id=${e.target.dataset["set"]}`;
      };
    }
  }

  //검색기능
  searchButton.addEventListener("click", async () => {
    getSearchData();
  });
  getSearchData();
});

tipBtn.addEventListener("click", () => {
  location.href = "./whiskytip.upload.html";
});



