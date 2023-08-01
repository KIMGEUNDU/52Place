import { attr, getNode, renderReviewList, userDataReview } from '../../lib/index.js';

const ul = getNode('.review__contents');
const response = await userDataReview.get('http://localhost:3000/review');
const reviewData = response.data;

reviewData.forEach((item) => {
	renderReviewList(ul, item);
});

/* -------------------------------------------------------------------------- */
// 리뷰 추가하기
// const ul = getNode('review__contents');

async function createTheme(e) {
	e.preventDefault();

	// 이벤트가 발생했을 때 가까운 li 선택
	const target = e.target.closest('li');

	// li의 id값 가져오기
	const index = attr(target, 'data-index');

	let targetId;
	if (index.length > 8) {
		targetId = index.slice(-2);
	} else {
		targetId = index.slice(-1);
	}
	console.log(targetId);

	if (!target) return;

	try {
		// li의 id값을 themeEnroll_new 페이지에 전달하기
		const dataUrl = `../../pages/themeEnroll_new.html?itemId=${encodeURIComponent(targetId)}`;
		console.log(dataUrl);
		window.location.href = dataUrl;
	} catch (err) {
		console.error('클릭 이벤트에서 에러 발생', err);
	}
}

ul.addEventListener('click', createTheme);
