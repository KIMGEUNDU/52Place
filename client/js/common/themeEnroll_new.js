import { getNode, insertLast, renderPlusReview, userDataReview } from '../../lib/index.js';

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
