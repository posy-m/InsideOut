// //////// why so serious?? 글씨 한글자씩나오게하는 모션 /////////
// const introText = document.querySelectorAll("span");

// window.onload = () => {
//   let timer = 100;
//   introText.forEach((item) => {
//     item.style.animation = `fade 500ms ${(timer += 50)}ms forwards`;
//   });
// };
// ////////////// 여기까지 한글자씩나오게하는 글씨 모션 ///////////////////



// /////////////////// 메뉴창과 조커카드나오는거 눌리는거 제어하기 //////////////

// menuBox.onchange = (e) => {
//   if (e.target.checked) {
//     mainJoker.style.pointerEvents = "none";
//   }
//   else {
//     mainJoker.style.pointerEvents = "all";
//   }
//   /////////////////// 메뉴창과 조커카드나오는거 여기까지 //////////////
  
// }











// ///////////////////////// 중간 슬라이스 모션 주기 /////////////////////////
// /////// arousel_box : 중간 이미지들 잡고있는 박스  
// const carousel_box = document.querySelector("carousel_box");
// /////// carousel_input_img_box : 이미지 들어갈 박스
// const mainimg = document.querySelector(".mainimg");
// ////// carousel_image_box_btn : 크게 보일 이미지
// const smollimg = document.querySelectorAll(".smollimg");


// smollimg.forEach(smollimg=>{
//   smollimg.addEventListener("click",function(){
//     mainimg.src = this.src;
//   })
// })

// console.log(smollimg);

//   // for (let i = 0; i < smollimg.length; i++) {
//   //   if(i === smollimg[i].childElementCount){
//   //     setInterval(()=> {
        
//   //     })
//   //   }
      
//   //     return mainimg.src = smollimg[i]
//   // }

//   let i = 0; // i 변수를 함수 외부에서 선언

//   setInterval(() => {
//       mainimg.src = smollimg[i].src;
//       i++;
//       if (i >= 5) { // i가 5 이상일 때 0으로 초기화
//           i = 0;
//       }
//   }, 2000);
  

// const bigQuote = document.querySelector(".bigQuote");
// const quoteBoxFrame = document.querySelector(".quoteBoxFrame");
// const famousQuote = document.querySelector(".famousQuote");
// const quoteBoxFrame2 = document.querySelector(".quoteBoxFrame2");
// const quoteBoxFrame3 = document.querySelector(".quoteBoxFrame3");
// const famoustext = document.querySelector(".famoustext");
// const prev = document.querySelector(".prev");
// const next = document.querySelector(".next");

// const quoteFrames = bigQuote.children;
// let count = 0;
// next.addEventListener("click",()=>{
//   quoteFrames[count].style.display = "none";
//   count++;
//   if (count == 3) {
//     count = 0;
//   }
//   quoteFrames[count].style.display = "block";
// })
//   prev.addEventListener("click",()=>{
//     quoteFrames[count].style.display = "none";
//     count--;
//     if (count == -1) {
//       count = 2;
//     }
//     quoteFrames[count].style.display = "block";
// })
// console.log(quoteFrames);











// ////////////// 참고용 가운데 이미지 슬라이드 모션주기 //////////////////

// // (() => {
//   // // const time = 5000;
//   // const carousel = document.querySelector('.carousel');
//   // const jumbotron = carousel.querySelector('.jumbotron');
//   // const gallery = carousel.querySelector('.gallery');
//   // const galleryImages = [...gallery.querySelectorAll('figure')];

// //   let timer = 0;
// //   let pause = false;

// //   input_img_box.innerHTML = image_box_btn.innerHTML;
// //   const count = image_box_btn.childElementCount;
// //   carousel_box.style.setProperty('--count', count);

// //   if(count <= 1) {
// //     carousel_box.classList.add('single');
// //     return;
// //   }

// //   const setIndex = i => {
// //     index = i;
// //     carousel_box.style.setProperty('--index', i);

// //     if (timer) clearTimeout(timer);
// //     timer = setTimeout(() => {
// //       setIndex(pause ? i : (i + 1) % count);
// //     }, time);
// //   }

// //   galleryImages.forEach(e => {
// //     e.addEventListener('click', ({ currentTarget }) => {
// //       setIndex(galleryImages.indexOf(currentTarget));
// //     });
// //   });

// //   carousel_box.addEventListener('mouseenter', () => pause = true);
// //   carousel_box.addEventListener('mouseleave', () => pause = false);

// //   setIndex(0);
// // })();




