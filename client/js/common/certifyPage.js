import { getNode, renderUserNewReview, userDataReview } from '../../lib/index.js';

//newReview.json 나열
const ul = getNode('.newReview__list');
const response = await userDataReview.get('http://localhost:3000/newReview');
const reviewData = response.data;

reviewData.forEach((item, index) => {
	renderUserNewReview(ul, item, index);
});

//header 시간 바꾸기
const headerTime = getNode('.headerTime');
headerTime.textContent = new Date().toLocaleTimeString('ko-KR').slice(3, -3);

setInterval(() => {
	let time = new Date().toLocaleTimeString('ko-KR');
	headerTime.textContent = time.slice(3, -3);
}, 60000);
