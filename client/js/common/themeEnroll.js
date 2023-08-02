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

//header 시간 바꾸기
const headerTime = getNode('.headerTime');
headerTime.textContent = new Date().toLocaleTimeString('ko-KR').slice(3, -3);

setInterval(() => {
	let time = new Date().toLocaleTimeString('ko-KR');
	headerTime.textContent = time.slice(3, -3);
}, 60000);

// reviewList 링크 연결 전 기본 동작 막기
const list = getNodes('.enroll__list');

function handleList(e) {
	e.preventDefault();
	console.log('안녕');
}

list.forEach((item) => {
	item.addEventListener('click', handleList);
});

// 스크롤시 menuEnroll bg-color 변경
const menuEnrollSection = getNode('.menuEnroll');
const scrollArrowImage = document.getElementById('scrollArrowImage');

// 이미지 링크를 여기에 추가
const defaultImageSrc = '/assets/icons/arrowwhite.png';
const scrolledImageSrc = '/assets/icons/leftblack.png';

window.addEventListener('scroll', () => {
	if (window.scrollY > 0) {
		menuEnrollSection.style.backgroundColor = 'white';
		scrollArrowImage.src = scrolledImageSrc;
	} else {
		menuEnrollSection.style.backgroundColor = '';
		scrollArrowImage.src = defaultImageSrc;
	}
});

//input
// function updateLength(inputElement, targetElement) {
// 	const length = inputElement.value.length;
// 	getNode(targetElement).textContent = length;
// }

// 전체삭제
function deleteAllUlElements() {
	const ulElements = document.querySelectorAll('.enroll__list > li');
	ulElements.forEach((liElement) => {
		liElement.parentNode.removeChild(liElement);
	});

	// 리뷰 카운트를 0으로 설정
	const reviewCountElement = document.querySelector('.reviewAll__count');
	if (reviewCountElement) {
		reviewCountElement.textContent = '0';
	}
}

const deleteButton = document.getElementById('deleteButton');
deleteButton.addEventListener('click', deleteAllUlElements);
