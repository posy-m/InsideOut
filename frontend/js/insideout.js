const introText = document.querySelectorAll("span");

window.onload = () => {
  let timer = 100;
  introText.forEach((item) => {
    item.style.animation = `fade 900ms ${(timer += 80)}ms forwards`;
  });
};


// const togx = document.querySelector(".toggle");
// document.querySelector(".cover-image").addEventListener("mouseover",()=>{
//     document.querySelector("mainPost").style.display = 'block';
// })

// togx.addEventListener("click",()=>{
//     document.querySelector(".a").pointer-events = 'none';
// })