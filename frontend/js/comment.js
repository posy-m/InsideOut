async function comment() {
    try {
        const _listIndex = new URLSearchParams(location.search).get("id");
        // const listParam = parseInt(_listIndex);
        // console.log(listParam);

        const commentData = await axios.get(`http://127.0.0.1:3000/comment/comments?index=${_listIndex}`); // QnA 게시글 목록 중에서 id 값을 통해 원하는 상세 페이지에 데이터를 받아옴, data에 할당
        console.log(_listIndex);
        const QnA_id = document.getElementById('QnA_ID'); // 글번호
        QnA_id.value = _listIndex; // 댓글 작성한 글의 글번호
        console.log(QnA_id.value)

        const comContainer = document.getElementById('commentView') // 댓글 렌더 할 요소
        const comGuide = document.createElement('div'); // 가이드 요소들을 담을 div 요소
        const spanGuide = document.createElement('span'); // 작성자, 내용, 작성일 가이드 담을 span 요소
        const nameGuide = document.createElement('span'); // 작성자
        nameGuide.innerText = '작성자';
        const contentGuide = document.createElement('span'); // 내용
        contentGuide.innerText = '댓글';
        const dateGuide = document.createElement('span'); // 작성일
        dateGuide.innerText = '작성일';
        spanGuide.append(nameGuide, contentGuide, dateGuide) // 생성한 요소에 가이드 담기
        comGuide.appendChild(spanGuide) // 생성한 요소에 가이드들 담기
        comContainer.appendChild(comGuide) // 가이드들 댓글뷰에 담기
        commentData.data.forEach(async (item) => { // 댓글 데이터 순회
            const comWrap = document.createElement('div'); // 전체 감싸는 요소
            const comdiv = document.createElement('div'); // 댓글 감싸는 요소
            const btndiv = document.createElement('div'); // 버튼 감싸는 요소
            const comName = document.createElement('span'); // 작성자
            const comComment = document.createElement('span'); // 내용
            const comDate = document.createElement('span'); // 작성일
            const comcomBtn = document.createElement('button'); // 대댓글 버튼
            comcomBtn.classList.add('comcomBtn');
            const modifyBtn = document.createElement('button'); // 댓글 수정 버튼
            const deleteBtn = document.createElement('button'); // 댓글 삭제 버튼

            console.log(QnA_id);

            const date = new Date(item.createdAt);
            const month = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
            const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
            const str = `${date.getFullYear()}/${month}/${day}`;

            comcomBtn.innerText = '대댓글';
            modifyBtn.innerText = '수정';
            deleteBtn.innerText = '삭제';
            comName.textContent = `${item.nick_name}` // 작성자 입력
            comComment.textContent = `${item.qna_comment}` // 댓글 입력
            comDate.textContent = `${str}` // 작성일 입력
            console.log(QnA_id.value)

            comdiv.append(comName, comComment, comDate);
            // comdiv.appendChild(comName);
            // comdiv.appendChild(comDate);
            btndiv.append(comcomBtn, modifyBtn, deleteBtn);
            // btndiv.appendChild(modifyBtn);
            // btndiv.appendChild(deleteBtn);+
            comWrap.append(comdiv, btndiv);
            comContainer.appendChild(comWrap);

            modifyBtn.addEventListener('click', () => { // 수정 버튼 클릭 시
                const _input = document.createElement("input"); // 입력창 추가
                _input.value = comComment.textContent; // 기존 댓글 텍스트를 입력창 값에 할당
                comComment.replaceWith(_input); // 댓글 보여주는 요소를 입력창으로 바꿈

                // 수정버튼 바꾸기
                const _btn = document.createElement('button'); // 버튼 생성
                _btn.innerText = '수정완료'; // 수정완료 입력
                _btn.addEventListener('click', async () => { // 수정완료 버튼 클릭 시
                    try { // 정상적으로 작동하면
                        const value = { qna_comment: _input.value } // 댓글에 입력창의 값을 할당

                        const data = await axios.put(`http://127.0.0.1:3000/comment/${item.id}`, value); // id 값을 통해 수정할 데이터를 서버에 PUT 요청으로 전송하여 수정
                        // console.log("data", data)

                        if (data.status === 200) { // 성공하면
                            location.reload(); // 페이지 새로고침
                        }

                    } catch (error) {
                        console.error(error);
                    }

                })
                modifyBtn.replaceWith(_btn); // 수정 버튼을 수정 완료 버튼으로 바꿈
            })

            deleteBtn.addEventListener('click', async () => { // 삭제 버튼 클릭 시
                try {
                    const data = await axios.delete(`http://127.0.0.1:3000/comment/${item.id}`) // id 값을 통해 삭제할 데이터를 서버에 Delete 요청으로 전송하여 삭제
                    // console.log(data);
                    location.reload(); // 삭제 후 페이지 새로고침
                } catch (error) {
                    console.error(error)
                }
            })

            // 대댓글을 로드하고 DOM에 추가
            const ccomData = await axios.get(`http://127.0.0.1:3000/ccomment/ccomments?index=${item.id}`); // id 값을 통해 원하는 댓글의 대댓글 데이터를 가져옴
            // console.log("대댓글 데이터:", ccomData.data);

            const ccomContainer = document.createElement('div'); // 요소 생성
            ccomContainer.id = 'com_commentView'; // 생성한 요소에 id 값에 'com_commentView' 입력
            comWrap.appendChild(ccomContainer);

            ccomData.data.forEach(citem => { // 대댓글 데이터 순회
                const ccomWrap = document.createElement('div');
                const ccomdiv = document.createElement('div');
                const cbtndiv = document.createElement('div');
                const ccomName = document.createElement('span');
                const ccomComment = document.createElement('span');
                const ccomDate = document.createElement('span');
                const cmodifyBtn = document.createElement('button');
                const cdeleteBtn = document.createElement('button');

                const cdate = new Date(citem.createdAt);
                const cmonth = (cdate.getMonth() + 1).toString().padStart(2, '0');
                const cday = cdate.getDate().toString().padStart(2, '0');
                const cstr = `${cdate.getFullYear()}/${cmonth}/${cday}`;

                cmodifyBtn.innerText = '수정';
                cdeleteBtn.innerText = '삭제';
                ccomName.textContent = `${citem.nick_name}`;
                ccomComment.textContent = `${citem.qna_com_comment}`;
                ccomDate.textContent = cstr;

                ccomdiv.append(ccomName, ccomComment, ccomDate);
                cbtndiv.append(cmodifyBtn, cdeleteBtn);
                ccomWrap.append(ccomdiv, cbtndiv);
                ccomContainer.appendChild(ccomWrap);

                cmodifyBtn.addEventListener('click', () => { // 수정 버튼 클릭 시
                    const _input = document.createElement("input");
                    _input.value = ccomComment.textContent;
                    ccomComment.replaceWith(_input);

                    const _btn = document.createElement('button');
                    _btn.innerText = '수정완료';
                    _btn.addEventListener('click', async () => {
                        try {
                            const value = { qna_com_comment: _input.value };
                            const data = await axios.put(`http://127.0.0.1:3000/ccomment/${citem.id}`, value);
                            console.log("수정된 데이터:", data);

                            if (data.status === 200) {
                                location.reload();
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    });
                    cmodifyBtn.replaceWith(_btn);
                });

                cdeleteBtn.addEventListener('click', async () => {
                    try {
                        const data = await axios.delete(`http://127.0.0.1:3000/ccomment/${citem.id}`);
                        console.log("삭제된 데이터:", data);
                        location.reload();
                    } catch (error) {
                        console.error(error);
                    }
                });
            });

            // 대댓글 작성 폼은 버튼 클릭 시 나타남
            comcomBtn.addEventListener('click', () => {
                comcomBtn.style.removeProperty('background-color');


                const div = comcomBtn.parentElement;
                div.innerHTML = `<form id="comComForm" action="http://127.0.0.1:3000/ccomment/create?id=${_listIndex}" method="post">
                                <input type="text" name="nick_name" value="god_kkh" hidden>
                                <div class="help">
                                <label for="">대댓글 작성</label>
                                <textarea name="qna_com_comment" id="comComment_Content" placeholder="대댓글을 입력해주세요." cols="30" rows="1"></textarea>
                                <button id="comCommentAddBtn">대댓글 작성</button>
                                <input type="text" name="qna_comment_id" id="QnA_Comment_ID" value="${item.id}" hidden>
                                </div>
                                </form>`;
            });
        });
    } catch (error) {
        console.error('댓글 불러오기 실패', error);
    }
}

comment();
