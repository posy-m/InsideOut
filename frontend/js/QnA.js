let currentPage = 1; // 현재 페이지
const limit = 5; // 한 페이지당 보여줄 게시글의 수
const maxVisibleButtons = 5; // 페이지네이션을 통해 보여줄 버튼의 개수

async function get(page = 1, search = '') {
    try {
        const response = await axios.get('http://127.0.0.1:3000/qn-a', { // QnA 목록 데이터 요청, response에 할당
            params: { // 요청 URL의 쿼리 문자열로 포함될 파라미터들
                page: page, // 현재 페이지 번호
                limit: limit, // 페이지당 항목 수 (제한)
                search: search // 검색어
            }
        });

        console.log('서버 응답 데이터', response.data);

        const { results, totalPages } = response.data; // QnA 데이터에서 results, totalPages를 추출
        console.log(response);
        renderQnAList(results); // renderQnAList 함수 호출, items 매개변수에 추출한 results를 인자로 전달
        createPagination(totalPages); // createPagination 함수 호출, totalPages를 인자로 전달

    } catch (error) {
        console.error('QnA 목록 불러오기 실패', error);
    }
}

function renderQnAList(items) {
    const dataContainer = document.getElementById('list'); // list라는 id를 가지고 있는 요소를 dataContainer에 할당
    dataContainer.innerHTML = ''; // 기존 목록 초기화

    items.forEach(item => { // 매개변수로 받은 items 배열을 순회
        const div = document.createElement('div'); // 새로운 div 요소 생성
        const spanID = document.createElement('span'); // 글번호를 담을 새로운 span 요소 생성
        const spanName = document.createElement('span'); // 작성자를 담을 새로운 span 요소 생성
        const spanTitle = document.createElement('span'); // 제목을 담을 새로운 span 요소 생성
        const spanContent = document.createElement('span'); // 내용을 담을 새로운 span 요소 생성
        const spanMove = document.createElement('span'); // 내용만 클릭하고 싶어서 span 요소 생성
        spanMove.addEventListener('click', () => { // 내용을 클릭 했을 때 이벤트 리스너 추가
            location.href = `detail.html?id=${item.id}`; // 클릭한 내용의 글번호, id를 쿼리 파라미터로 전달하여 상세 페이지로 이동
        });
        spanID.textContent = item.id // 글번호
        spanName.textContent = item.nick_name // 작성자
        spanTitle.textContent = item.qna_title // 글제목
        spanMove.textContent = item.qna_content // 글내용
        spanContent.appendChild(spanMove); // 글내용을 Span 태그에 삽입
        div.append(spanID, spanName, spanTitle, spanContent) // 글번호, 작성자, 제목, 내용을 생성한 div에 추가
        dataContainer.appendChild(div); // i글번호, 작성자, 제목, 내용 값을 가지고 있는 div를 dataContainer 요소에 추가
    });
}

function createPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination'); // pagination id를 가지고 있는 요소
    paginationContainer.innerHTML = ''; // 요소에 빈 공백 추가

    // 페이지 버튼의 시작과 끝을 계산
    const startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    // 처음 페이지로 가는 버튼을 생성 후 설정
    if (currentPage > 1) {
        const firstPageBtn = document.createElement('button'); // 새로운 버튼 요소 생성
        firstPageBtn.textContent = '<<'; // 버튼 요소에 << 텍스트 입력
        firstPageBtn.addEventListener('click', () => { // << 버튼 클릭 했을 때 이벤트 리스너 추가
            currentPage = 1; // 현재 페이지에 1을 할당, 즉 1번 처음 페이지로 이동
            get(currentPage, document.getElementById('searchInput').value); // 페이지 업데이트를 위해 데이터를 새로 요청
        });
        paginationContainer.appendChild(firstPageBtn); // pagination 요소에 첫 페이지로 가는 버튼 추가
    }

    // 이전 페이지로 가는 버튼
    if (currentPage > 1) {
        const prevPageBtn = document.createElement('button'); // 새로운 버튼 요소 생성
        prevPageBtn.textContent = '<'; // 버튼 요소에 < 텍스트 입력
        prevPageBtn.addEventListener('click', () => { // < 버튼 클릭 했을 때 이벤트 리스너 추가
            currentPage -= 1; // 현재 페이지에서 - 1, 만약 2번 페이지라면 1번 페이지로 이동
            get(currentPage, document.getElementById('searchInput').value); // 페이지 업데이트를 위해 데이터를 새로 요청
        });
        paginationContainer.appendChild(prevPageBtn); // pagination 요소에 이전 페이지로 가는 버튼 추가
    }

    // 페이지 번호 버튼
    for (let i = startPage; i <= endPage; i++) { // 현재 i는 시작 페이지, 끝 페이지보다 작거나 같을 때까지 i를 증가 
        const pageBtn = document.createElement('button'); // 새로운 버튼 요소 생성
        pageBtn.textContent = i; // 페이지 번호 버튼에 1부터 추가
        if (i === currentPage) { // i와 현재 페이지가 맞으면
            pageBtn.disabled = true; // 현재 페이지는 비활성화
        }
        pageBtn.addEventListener('click', () => { // 페이지 버튼 클릭 시 이벤트 리스너 추가
            currentPage = i; // 현재 페이지에 i를 할당, 즉 원하는 페이지로 이동
            get(currentPage, document.getElementById('searchInput').value); // 페이지 업데이트를 위해 데이터를 새로 요청
        });
        paginationContainer.appendChild(pageBtn); // pagination 요소에 페이지 버튼 추가
    }

    // 다음 페이지로 가는 버튼
    if (currentPage < totalPages) { // 현재 페이지가 전체 페이지의 수보다 작으면
        const nextPageBtn = document.createElement('button');
        nextPageBtn.textContent = '>';
        nextPageBtn.addEventListener('click', () => {
            currentPage += 1; // 현재 페이지에 1을 더하고 할당
            get(currentPage, document.getElementById('searchInput').value);
        });
        paginationContainer.appendChild(nextPageBtn);
    }

    // 마지막 페이지로 가는 버튼
    if (currentPage < totalPages) {
        const lastPageBtn = document.createElement('button');
        lastPageBtn.textContent = '>>';
        lastPageBtn.addEventListener('click', () => {
            currentPage = totalPages; // 현재 페이지에 전체 페이지 수를 할당, 즉 마지막 페이지를 할당
            get(currentPage, document.getElementById('searchInput').value);
        });
        paginationContainer.appendChild(lastPageBtn);
    }
}

// 초기 로드 시 데이터 가져오기
document.addEventListener('DOMContentLoaded', () => get(currentPage, ''));

// 검색 버튼 클릭 시 검색어에 따라 데이터 가져오기
document.getElementById('searchBtn').addEventListener('click', () => { // 검색 버튼을 클릭 했을 때 이벤트 리스너 추가
    const search = document.getElementById('searchInput').value; // 검색창에 입력한 값을 search에 할당
    currentPage = 1; // 검색 시 첫 페이지로 초기화
    get(currentPage, search); // 첫 페이지, 검색값
});

const createBtn = document.getElementById('createBtn'); // 문의 글 작성 버튼
createBtn.addEventListener('click', () => { // 문의 글 작성 클릭 시
    location.href = './create.html'; // create 페이지로 이동
});
