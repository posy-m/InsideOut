const listIndex = new URLSearchParams(location.search).get("id");  // 웹 검색창에서 id 값을 listIndex에 할당한다.

const dataNumber = document.getElementById('detailNumber'); // 글 번호
const dataName = document.getElementById('detailName'); // 작성자
const dataDate = document.getElementById('detailDate'); // 작성일
const dataTitle = document.getElementById('detailTitle'); // 제목
const dataContent = document.getElementById('detailContent'); // 내용

const detailData = async function detail() {
    const data = await axios.get(`http://127.0.0.1:3000/qn-a/detail/${listIndex}`); // QnA 게시글 목록 중에서 id 값을 통해 원하는 상세 페이지에 데이터를 받아옴, data에 할당
    // console.log(data.data);
    if (data !== null) {
        const date = new Date(data.data.createdAt); // 생성 날짜
        const month = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`; // 월 0부터 시작하는 값을 1 추가 해서 1월부터 시작
        const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`; // 일
        const str = `${date.getFullYear()}-${month}-${day}`; // 날짜 정의

        dataNumber.innerHTML = `글번호 : ${data.data.id}`; // 글번호 입력
        dataName.innerHTML = `작성자 : ${data.data.nick_name}`; // 작성자 입력
        dataDate.innerHTML = `작성일 : ${str}`; // 작성일 입력
        dataTitle.innerHTML = `${data.data.qna_title}`; // 제목 입력
        dataContent.innerHTML = `${data.data.qna_content}`; // 내용 입력
    }
}
detailData();

const modifyBtn = document.getElementById('modify'); // 수정 버튼

modifyBtn.addEventListener('click', () => { // 수정 버튼 클릭 시
    location.href = `update.html?id=${listIndex}`; // 수정 페이지로 이동
})

const backBtn = document.getElementById('back'); // 뒤로 가기 버튼

backBtn.addEventListener('click', () => { // 뒤로 가기 버튼 클릭 시
    location.href = `QnA.html`; // 글 목록 페이지로 이동
})

const deleteBtn = document.getElementById('delete'); // 삭제 버튼

deleteBtn.addEventListener('click', async () => { // 삭제 버튼 클릭 시
    // console.log(listIndex)
    const data = await axios.delete(`http://127.0.0.1:3000/qn-a/${listIndex}`); // id 값을 통해 삭제할 데이터를 서버에 Delete 요청으로 전송하여 삭제
    // console.log(data);
    location.href = 'QnA.html' // 삭제 후 글 목록 페이지로 이동

})