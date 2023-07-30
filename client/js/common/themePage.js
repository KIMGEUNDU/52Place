import { attr, getNode, getNodes, renderUserReview, userDataReview } from '../../lib/index.js';

//review.json 나열
const ul = getNode('.review__List');
const response = await userDataReview.get('http://localhost:3000/review');
const reviewData = response.data;

reviewData.forEach((item) => {
	renderUserReview(ul, item);
});

//bookMark 체크시 이미지 변경
const bookMark = getNodes('.bookMark');

let markChecked = false;
function handleBookMarkChecked() {
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

function handleList(e) {
	e.preventDefault();
	console.log('안녕');
}

list.forEach((item) => {
	item.addEventListener('click', handleList);
});
