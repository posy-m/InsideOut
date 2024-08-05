const listIndex = new URLSearchParams(location.search).get("id") // 웹 검색창에서 id 값을 listIndex에 할당한다.
console.log(listIndex);

const title = document.getElementById('titleInput'); // 수정할 제목을 작성하는 textarea
const content = document.getElementById('contentInput'); // 수정할 내용을 작성하는 textarea
const updateBtn = document.getElementById('updateBtn'); // 수정 버튼
const backBtn = document.getElementById('backBtn'); // 뒤로가기 버튼

async function get() {
    const data = await axios.get(`http://127.0.0.1:3000/qn-a/detail/${listIndex}`); // QnA 게시글 목록 중에서 id 값을 통해 원하는 상세 페이지에 데이터를 받아옴, data에 할당
    console.log(data.data);
    console.log(data.data.qna_title);
    title.placeholder = data.data.qna_title // 제목을 작성하는 textarea에 전의 내용을 placeholder로 표시
    content.placeholder = data.data.qna_content // 내용을 작성하는 textarea에 전의 내용을 placeholder로 표시
}
get();


updateBtn.addEventListener('click', async () => { // 수정 버튼에 클릭 이벤트 추가
    const value = { // 수정 하려고 입력한 값을 기존의 값에 재할당
        qna_title: title.value,
        qna_content: content.value
    }
    const data = await axios.put(`http://127.0.0.1:3000/qn-a/${listIndex}`, value); // id 값을 통해 수정할 데이터를 서버에 PUT 요청으로 전송하여 수정
    if (data.data > 0) { // 수정에 성공하면 수정 페이지에서 상세 페이지로 이동
        location.href = `http://127.0.0.1:5501/frontend/views/detail.html?id=${listIndex}`;
    }
})

backBtn.addEventListener('click', async () => { // 뒤로가기 버튼에 클릭 이벤트 추가
    location.href = `detail.html?id=${listIndex}` // 뒤로가기 버튼을 클릭하면 수정 페이지에서 상세 페이지로 이동
})