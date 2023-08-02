import {
	addClass,
	attr,
	getNode,
	removeClass,
	renderCountReview,
	renderPlusReview,
	userDataReview,
} from '../../lib/index.js';

function getUrlParameter(name) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(name);
}

// 전달받은 id값
const itemId = getUrlParameter('itemId');
console.log(itemId);

// review 데이터 가져오기
const response = await userDataReview.get('http://localhost:3000/review');
const reviewData = response.data;
console.log(reviewData);

// 선택된 li의 데이터 가져오기
const newData = reviewData[itemId - 1];
console.log(newData.id);

// plusReview의 데이터 가져오기
const url = 'http://localhost:3000/plusReview';
const plusReview = await userDataReview.get(url);
const plusData = plusReview.data;
console.log(plusData);

// plusReview의 데이터셋 생성
function keyPlusReview() {
	return {
		index: `${newData.id}`,
		where: `${newData.name}`,
		location: `${newData.image.src}`,
		preview: {
			src: `${newData.image.src}`,
			alt: `${newData.image.alt}`,
		},
		sub: `${newData.detail}`,
		when: `${newData.date}`,
	};
}

const postData = keyPlusReview();
console.log(postData);

// plusData의 index값과 li를 통해 가져온 데이터의 index 값이 일치하는지 확인
const hasDuplicateIndex = plusData.some((item) => item.index === postData.index);
console.log(hasDuplicateIndex);

if (hasDuplicateIndex) {
	// index 값이 동일하다면 post요청을 하지 않음
	console.log('이미 동일한 데이터가 존재합니다.');
} else {
	// index 값이 일치하지 않는 새로운 데이터라면 post요청
	fetch('http://localhost:3000/plusReview', {
		method: 'POST',
		body: JSON.stringify(postData),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	})
		.then((response) => {
			// 서버의 데이터를 가지고 오는데 성공하면 json으로 가져옴, 아니면 에러 띄우기
			if (response.ok) {
				return response.json();
			} else throw new Error('서버가 동작하지 않았습니다.');
		})
		.then((data) => {
			// 서버 응답 처리
			// 새로운 데이터를 plusData에 추가하여 최초 랜더링에 반영하도록 함
			plusData.push(data);
			renderPlusReview(ul, data);

			// 데이터의 갯수를 파악해 리뷰 개수 랜더링
			const count = getNode('.review__count');
			const reviewCount = plusData.length;
			renderCountReview(count, reviewCount);
		})
		.catch((err) => {
			// 오류 처리
			console.error('오류 발생', err);
		});
}

const ul = getNode('.review__plus');

plusData.forEach((item) => {
	renderPlusReview(ul, item);
});

/* -------------------------------------------------------------------------- */
// 스크롤시 헤더 제어
function handleHeadBtn() {
	const header = getNode('.heading');
	const btn = getNode('.enrollBtn');
	const backImg = getNode('.backBtn');
	// 스크롤된 window의 현재 y좌표 값
	const scrollY = window.scrollY;
	// 헤더의 사이즈 찾기
	const headerHeight = header.getBoundingClientRect().height;

	// y좌표 값이 헤더의 높이보다 커지면 클래스 추가, 아니면 삭제
	if (scrollY > headerHeight) {
		addClass(header, 'scrollheadingWhite');
		addClass(btn, 'activeButton');
		attr(backImg, 'src', '../assets/icons/leftblack.png');
	} else {
		removeClass(header, 'scrollheadingWhite');
		removeClass(btn, 'activeButton');
		attr(backImg, 'src', '../assets/icons/leftwhite.png');
	}
}

window.addEventListener('scroll', handleHeadBtn);

/* -------------------------------------------------------------------------- */

//header 시간 바꾸기
const headerTime = getNode('.headerTime');
headerTime.textContent = new Date().toLocaleTimeString('ko-KR').slice(3, -3);

setInterval(() => {
	let time = new Date().toLocaleTimeString('ko-KR');
	headerTime.textContent = time.slice(3, -3);
}, 60000);

/* -------------------------------------------------------------------------- */
// const list = getNode('.enroll__list');
// function deleteList(e) {
// 	const review = getNode('.enroll__list ul');

// 	const target = e.target.closest('ul');
// 	console.log(target);
// 	const ulId = target.id;
// 	console.log(ulId);

// 	if (!target) return;

// const id = attr(target, 'data-index').slice(-1);
// console.log(id);

// userDataReview.delete(url);
// }
// list.addEventListener('click', deleteList);

function deletePlusReview() {}

const deleteAll = getNode('.deleteAll');
deleteAll.addEventListener('click', deletePlusReview);
