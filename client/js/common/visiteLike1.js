import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs';
import { attr, css, getNode, getNodes, insertLast, userDataReview } from '../../lib/index.js';

//header 시간 바꾸기
const headerTime = getNode('.headerTime');
headerTime.textContent = new Date().toLocaleTimeString('ko-KR').slice(3, -3);

setInterval(() => {
	let time = new Date().toLocaleTimeString('ko-KR');
	headerTime.textContent = time.slice(3, -3);
}, 60000);

//textarea 글자수 세기
const reviewLength = getNode('.reviewLength');
const reviewTextArea = getNode('.reviewTextArea');

function handleTextArea() {
	let text = reviewTextArea.value;
	reviewLength.textContent = text.length;
}

reviewTextArea.addEventListener('input', handleTextArea);

//이런곳좋아요 버튼
const likeBtn = getNode('.likeBtn');

let likeBtnClicked = false;
function handleLikeBtn() {
	if (!likeBtnClicked) {
		likeBtn.classList = 'likeBtnClicked';
	} else {
		likeBtn.classList = 'likeBtn';
	}

	likeBtnClicked = !likeBtnClicked;
}

likeBtn.addEventListener('click', handleLikeBtn);

//어떤점이좋았나요 버튼
const choiceBtn = getNodes('.choiceBtn');

choiceBtn.forEach((item) => {
	item.addEventListener('click', handleChoiceBtn);

	let choiceBtnClicked = false;
	function handleChoiceBtn() {
		if (!choiceBtnClicked) {
			item.classList = 'choiceBtnClicked';
		} else {
			item.classList = 'choiceBtn';
		}

		choiceBtnClicked = !choiceBtnClicked;
	}
});

//스와이퍼
const swiper = new Swiper('.swiper', {
	// Optional parameters
	direction: 'horizontal',
	mousewheel: true,
	debugger: true,
	slidesPerView: 'auto',

	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

//사진 업로드시 리스트 나오게하기
const upLoadBtn = getNode('#review__photoFile');
const upLoadBox = getNode('.photo__upload');

function handleUpload(e) {
	const uploadFiles = [];
	const files = e.currentTarget.files;

	//파일 3개 이상 업로드 금지
	if ([...files].length > 3) {
		alert('이미지는 최대 3개까지 업로드가 가능합니다.');
		return;
	}

	// 파일 타입 검사
	[...files].forEach((file) => {
		if (!file.type.match('image/.*')) {
			alert('이미지 파일만 업로드가 가능합니다.');
			return;
		}

		// 파일 갯수 검사
		if (uploadFiles.length < 4) {
			uploadFiles.push(file);
			const reader = new FileReader();
			reader.onload = (e) => {
				const preview = createElement(e, file);
				upLoadBox.appendChild(preview);
			};
			reader.readAsDataURL(file);
		}
	});
}

const response = await userDataReview.get('http://localhost:3000/newReview');
const reviewData = response.data;

// 이미지 컨테이너 보이게하기 + 새로운 이미지 데이터 저장하기
function createElement(e, file) {
	const div = getNode('.upload__div');
	div.classList.add('uploadImgBox');

	const img = document.createElement('img');
	img.classList.add('uploadImg');
	attr(img, 'src', e.target.result);
	attr(img, 'alt', file.name);

	div.appendChild(img);

	for (let i = 0; i < 3; i++) {
		reviewData[0].image[i].src = e.target.result;
		reviewData[0].image[i].alt = file.name.slice(0, -4);
	}
	return div;
}

upLoadBtn.addEventListener('change', handleUpload);

// 등록버튼 클릭시 글자수 검사하고 데이터 추가하기
const newReview = await userDataReview.get('http://localhost:3000/review');
const newReviewData = newReview.data;

const newReviewSubmit = getNode('.newReviewSubmit');

function keyEscapeImg() {
	return {
		id: '12',
		name: '키이스케이프',
		place: '서울시 강남구',
		image: { src: 'keyEscape.jpg', alt: '키이스케이프' },
		state: 'true',
	};
}

const URL = 'http://localhost:3000/review';
const reviewText = getNode('#review__text');

async function handleNewReviewAdd(e) {
	e.preventDefault();
	try {
		if (reviewText.value.length >= 30) {
			const response = await userDataReview.post(URL, keyEscapeImg());
			if (!response.ok) {
				alert('리뷰 작성에 실패했습니다. 다시 시도해주세요');
				location.href = 'themePage.html';
			} else {
				alert('리뷰를 저장하였습니다.');
				location.href = 'themePage.html';
			}
		} else {
			e.preventDefault();
			alert('리뷰를 30자 이상 작성해주세요');
		}
	} catch (err) {
		console.log(err);
	}
}

newReviewSubmit.addEventListener('click', handleNewReviewAdd);
