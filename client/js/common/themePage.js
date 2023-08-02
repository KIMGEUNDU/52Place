import { attr, getNode, getNodes, renderUserReview, userDataReview } from '../../lib/index.js';

//review.json 나열
const ul = getNode('.review__list');
const response = await userDataReview.get('http://localhost:3000/review');
const reviewData = response.data;

reviewData.forEach((item, index) => {
	renderUserReview(ul, item, index);
});

//bookMark 체크시 이미지 변경
const bookMark = getNodes('.bookMark');

let markChecked = false;
function handleBookMarkChecked(e) {
	e.preventDefault();
	if (!markChecked) {
		attr(this, 'src', '../../assets/icons/bookmarkactive=false.png');
	} else {
		attr(this, 'src', '../../assets/icons/bookmarkactive=true.png');
	}
	markChecked = !markChecked;
}

bookMark.forEach((mark) => {
	mark.addEventListener('click', handleBookMarkChecked);
});

//최신순 버튼 클릭하기
const newDateBtn = getNode('.newDateBtn');
const text = getNode('.newDateBtn__text');

let newSort = false;
function handlesort() {
	if (!newSort) {
		text.textContent = '최신순';
		attr('.newClick', 'src', '../assets/icons/up.png');
		attr('.newClick', 'alt', '최신순 보기');
	} else {
		text.textContent = '조회수순';
		attr('.newClick', 'src', '../assets/icons/down.png');
		attr('.newClick', 'alt', '조회수순 보기');
	}
	newSort = !newSort;
}

newDateBtn.addEventListener('click', handlesort);

//리뷰 개수 카운트
const reviewCount = getNode('.review__count');
const photoCount = getNode('.photo__count');

function setCount(review) {
	review.textContent = reviewData.length;
}

setCount(reviewCount);
setCount(photoCount);

//reviewList 링크 연결 전 기본 동작 막기
const list = getNodes('.listSize');

//header 시간 바꾸기
const headerTime = getNode('.headerTime');
headerTime.textContent = new Date().toLocaleTimeString('ko-KR').slice(3, -3);

setInterval(() => {
	let time = new Date().toLocaleTimeString('ko-KR');
	headerTime.textContent = time.slice(3, -3);
}, 60000);

// 조회수 카운트하기
const reviewImage1 = getNode('.reviewImage1');
const viewCount = getNode('.view__count');
let viewCountUp = parseInt(localStorage.getItem('조회수'));

if (localStorage.getItem('조회수') === null) {
	viewCount.textContent = 0;
} else {
	viewCount.textContent = localStorage.getItem('조회수');
}

function setViewsCount() {
	if (localStorage.getItem('조회수') === null) {
		localStorage.setItem('조회수', 1);
		viewCountUp = 1;
	} else {
		viewCountUp += 1;
		localStorage.setItem('조회수', viewCountUp);
	}
}

reviewImage1.addEventListener('click', setViewsCount);

//리스트 선택시 지우기
// const dataList = getNodes('.listSize');

// dataList.forEach((item) => {
// 	function handleRemoveList() {
// 		item.classList.remove('listSize');
// 		item.classList.add('listHidden');
// 	}
// 	item.addEventListener('click', handleRemoveList);
// });
