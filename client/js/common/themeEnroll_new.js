import { getNode, insertLast, renderPlusReview, userDataReview } from '../../lib/index.js';

function getUrlParameter(name) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(name);
}

// console.log(id);
const itemId = getUrlParameter('itemId');
console.log(itemId);

// review 데이터 가져오기
const response = await userDataReview.get('http://localhost:3000/review');

// 선택된 li의 데이터 가져오기
const reviewData = response.data;
const reviewDataId = reviewData[itemId - 1].id;
const newData = reviewData[itemId - 1];
console.log(newData.id);
console.log(reviewDataId);

// let isDuplicate = true;

// const isNotDuplicate = (reviewDataId, newData) => {
// 	if (newData.id === reviewDataId) {
// 		return !isDuplicate;
// 	}
// };

function keyPlusReview() {
	return {
		index: `${reviewDataId}`,
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

const url = 'http://localhost:3000/plusReview';

// 기존에 추가한 데이터가 중복되지 않는지 확인하는 함수
const isNotDuplicate = (newData) => {
	// 서버에서 현재 데이터를 가져오는 예시로 GET 요청을 보냅니다.
	return fetch('http://localhost:3000/plusReview')
		.then((response) => response.json())
		.then((data) => {
			// 중복된 값이 있는지 확인
			const isDuplicate = data.some((item) => item.id === newData.id);
			return !isDuplicate;
		})
		.catch((error) => {
			console.error('Error while fetching data:', error);
			return false;
		});
};

// 중복 여부를 확인한 후, 중복이 없는 경우에만 POST 요청 보냄
isNotDuplicate(postData).then((isNotDuplicate) => {
	if (isNotDuplicate) {
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(postData),
		})
			.then((response) => {
				if (response.ok) {
					console.log('POST request successful');
				} else {
					console.error('POST request failed:', response);
				}
			})
			.catch((error) => {
				console.error('Error while sending POST request:', error);
			});
	} else {
		console.log('Data is duplicate. Skip POST request.');
	}
});

// if (isDuplicate) {
// 	userDataReview
// 		.post('http://localhost:3000/plusReview', keyPlusReview())
// 		.then((response) => {
// 			if (response.ok) {
// 				console.log('ok');
// 			} else {
// 				console.log('no');
// 			}
// 		})
// 		.catch((err) => console.log('에러', err));
// } else {
// 	console.log('중복있다');
// }

// 새로운 데이터 보내기
// const less =

const ul = getNode('.review__plus');
const answer = await userDataReview.get('http://localhost:3000/plusReview');
const plusData = answer.data;
console.log(plusData);

plusData.forEach((item) => {
	renderPlusReview(ul, item);
});
