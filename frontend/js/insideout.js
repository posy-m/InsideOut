//////// why so serious?? 글씨 한글자씩나오게하는 모션 /////////
const introText = document.querySelectorAll("span");

window.onload = () => {
  let timer = 100;
  introText.forEach((item) => {
    item.style.animation = `fade 500ms ${(timer += 50)}ms forwards`;
  });
};
////////////// 여기까지 한글자씩나오게하는 글씨 모션 ///////////////////



/////////////////// 메뉴창과 조커카드나오는거 눌리는거 제어하기 //////////////
menuBox.onchange = (e) => {
  if (e.target.checked) {
    mainJoker.style.pointerEvents = "none";
  }
  else {
    mainJoker.style.pointerEvents = "all";
  }
  /////////////////// 메뉴창과 조커카드나오는거 여기까지 //////////////
  
}




////////////// 가운데 이미지 슬라이드 모션주기 //////////////////

(() => {
  const time = 5000;
  const carousel = document.querySelector('.carousel');
  const jumbotron = carousel.querySelector('.jumbotron');
  const gallery = carousel.querySelector('.gallery');
  const galleryImages = [...gallery.querySelectorAll('figure')];

  let timer = 0;
  let pause = false;

  jumbotron.innerHTML = gallery.innerHTML;
  const count = gallery.childElementCount;
  carousel.style.setProperty('--count', count);

  if(count <= 1) {
    carousel.classList.add('single');
    return;
  }

  const setIndex = i => {
    index = i;
    carousel.style.setProperty('--index', i);

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setIndex(pause ? i : (i + 1) % count);
    }, time);
  }

  galleryImages.forEach(e => {
    e.addEventListener('click', ({ currentTarget }) => {
      setIndex(galleryImages.indexOf(currentTarget));
    });
  });

  carousel.addEventListener('mouseenter', () => pause = true);
  carousel.addEventListener('mouseleave', () => pause = false);

  setIndex(0);
})();