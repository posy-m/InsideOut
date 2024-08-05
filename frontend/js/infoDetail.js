window.onload=()=>{
  //axios로 값을 get해서
  // 가져온 데이터를 렌더
  // const {data} = axios.get("URL주소");
  // const wrap = document.querySelector(".top");
  // const div = document.createElement("div");
  // wrap.append(div)
  get();
}

const updateBtn = document.getElementById('ubutton');

updateBtn.onclick = (e) => {
  let id = 1;
  location.href = `./infoU.html?id=${id}`
  console.log(e.target)
}




async function get() {
  try {
    const frameWriting = document.querySelector(".frameWriting");
    const inn = document.querySelector(".in");
      const response = await axios.get("http://localhost:3000/information");
      const resp = response.data;

      const limitedResp = resp.slice(0,3);
      console.log(limitedResp);
      

      limitedResp.forEach(e => {
        console.log(e.img);
        const divv = document.createElement("div");
        divv.innerHTML = `    
        <figure class="snip1283">
        <img src="http://localhost:3000/${e.img}"data-set="${e.id}" alt="sample70">
        <figcaption>
        ${e.w_info}
        </figcaption>
        </figure> 
        <div class="buttons">
          <button id="ubutton" data-set="1">수정버튼</button>
          <button class="dibuttn">삭제버튼</button>
        </div>`


    //     <div class="buttons">
    //     <button id="ubutton" data-set="1">수정버튼</button>
    //     <button class="dibuttn">삭제버튼</button>
    // </div>

        inn.append(divv);

        console.log(e.img);
        
        // <h3>싱글몰트 위스키 마니아들을 위한-위스키 용어편</h3>
        // <p>지난해 맥캘란 페이스북을 통해 많은 팬들에게 위스키 용어 및 위스키 상식들을 소개한 바 있다. </p>
        // <img src="./2enProject_Main_imges/토치로불하는_위스키.webp" alt="sample70"/>
        
      });
      console.log(resp);  // 서버에서 반환된 데이터를 로그로 출력
  } catch (error) {
      console.error("get 에러났어:", error);  // 에러 메시지를 로그로 출력
  }
}