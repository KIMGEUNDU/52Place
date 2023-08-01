import { attr, getNode, getNodes, userDataReview, renderSaveReview } from '../../lib/index.js';

// review.json 나열
const ul = getNode('.enroll__list');
const response = await userDataReview.get('http://localhost:3000/save');
const saveData = response.data;

saveData.forEach((item) => {
	renderSaveReview(ul, item);
});

// 이벤트 위임을 사용하여 ul에서 하트 버튼 클릭 이벤트 처리
ul.addEventListener('click', (e) => {
	if (e.target.classList.contains('heartButton1') || e.target.classList.contains('heartButton2')) {
		e.target.classList.toggle('heartButton1');
		e.target.classList.toggle('heartButton2');
	}
});

// reviewList 링크 연결 전 기본 동작 막기
const list = getNodes('.enroll__list');

function handleList(e) {
	e.preventDefault();
	console.log('안녕');
}

list.forEach((item) => {
	item.addEventListener('click', handleList);
});

//스크롤시 menuEnroll bg-color 변경
const menuEnrollSection = document.querySelector('.menuEnroll');

window.addEventListener('scroll', () => {
	if (window.scrollY > 0) {
		menuEnrollSection.style.backgroundColor = 'white';
	} else {
		menuEnrollSection.style.backgroundColor = '';
	}
});
