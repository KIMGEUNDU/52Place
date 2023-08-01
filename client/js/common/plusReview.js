import {
	getNode,
	insertFirst,
	attr,
	insertBefore,
	addClass,
	removeClass,
	toggleClass,
	getInputValue,
	getTextareaValue,
	userDataReview,
} from '../../lib/index.js';

const title = getNode('.coverTitle');
const sub = getNode('.coverSub');

// title 글자수
function handleInputTitle() {
	const countTitle = getNode('.coverTitle__count');
	let content = title.value;

	countTitle.textContent = `${content.length}`;

	if (content.length > 20) {
		content = content.substring(0, 20);
		title.value = content;
		countTitle.textContent = '20';
	}
}

// sub 글자수
function handleInputSub() {
	const countSub = getNode('.coverSub__count');
	let content = sub.value;

	countSub.textContent = `${content.length}`;

	if (content.length > 100) {
		content = content.substring(0, 100);
		sub.value = content;
		countSub.textContent = '100';
	}
}

// textarea 높이
function calcHeight() {
	// textarea의 높이를 데이터 높이에 맞게 초기화
	sub.style.height = '24px';
	// textarea의 높이가 스크롤 높이와 동일하도록
	sub.style.height = `${sub.scrollHeight}px`;
}

title.addEventListener('input', handleInputTitle);
sub.addEventListener('input', handleInputSub);
sub.addEventListener('input', calcHeight);

/* -------------------------------------------------------------------------- */
// 이미지 input
const uploadBtn = getNode('.btn__upload');

function getImgFiles(e) {
	// change 이벤트가 일어나면 선택된 파일 가져오기
	const files = e.target.files;

	// 이미지 파일인지 확인하기
	[...files].forEach((file) => {
		if (!file.type.match('image/.*')) {
			alert('이미지 파일만 업로드 가능합니다!!');

			return;
		} else {
			// 이미지 파일 업로드에 성공했을 때
			const reader = new FileReader();

			reader.onload = (e) => {
				const preview = createImg(e, file);
				const coverBox = getNode('.cover__container');

				// coverBox 아래에 img태그 추가
				coverBox.prepend(preview);
				removeClass(coverBox, 'coverBg');
			};
			reader.readAsDataURL(file);
		}
	});
}

// 이미지 태그 생성
function createImg(e, file) {
	const img = document.createElement('img');

	// 이미지 경로, 이름 설정
	attr(img, 'src', e.target.result);
	attr(img, 'data-file', file.name);
	addClass(img, 'coverImg');

	return img;
}

uploadBtn.addEventListener('change', getImgFiles);

/* -------------------------------------------------------------------------- */
// 헤더 애니메이션
function handleHeading() {
	const header = getNode('.heading');
	// 스크롤된 window의 현재 y좌표 값
	const scrollY = window.scrollY;
	// 헤더의 사이즈 찾기
	const headerHeight = header.getBoundingClientRect().height;
	// const absoluteHeader = headerHeight + scrollY;

	// y좌표 값이 헤더의 높이보다 커지면 클래스 추가, 아니면 삭제
	scrollY > headerHeight ? addClass(header, 'scrollheading') : removeClass(header, 'scrollheading');
}

window.addEventListener('scroll', handleHeading);

// 스크롤 시 리뷰 박스 올리기
// const reviewBox = getNode('.plus__container');
// const main = getNode('.cover__container');
// const mainHeight = main.getBoundingClientRect().height;
// const windowHeight = window.innerHeight;
// reviewBox.style.height = `${windowHeight}-${headerHeight}-${mainHeight}px`;

// reviewBox.style.transform = `translate(0, -${scrollY / 2}px)`;

// // 높이 자동으로 늘리기
// const finalHeight = 294 + scrollY * 1.5;

// reviewBox.style.height = `${finalHeight}px`;
// mainHeight.style.height = `${windowHeight}px`;
// if (finalHeight >= 480) {
// 	reviewBox.style.height = '480px';
// 	mainHeight.style.maxHeight = '640px';
// 	// reviewBox.style.overflow = 'hidden';
// } else {
// 	reviewBox.style.height = 'auto';
// 	mainHeight.style.height = `${windowHeight}px`;
// }

/* -------------------------------------------------------------------------- */
// 등록 버튼 활성화
const enrollBtn = getNode('.enrollBtn');
const coverForm = getNode('.coverForm');

function checkRequired(e) {
	e.preventDefault();

	const title = getNode('.coverTitle');
	const inputTitle = getInputValue(title);
	const cover = getNode('.btn__upload');

	if (inputTitle.trim() !== '' && inputTitle.length > 0 && cover.value.length > 0) {
		addClass(enrollBtn, 'activeButton');
	} else {
		removeClass(enrollBtn, 'activeButton');
	}
}

coverForm.addEventListener('change', checkRequired);

/* -------------------------------------------------------------------------- */
// 테마 등록
async function postTheme(e) {
	e.preventDefault();

	const title = getNode('.coverTitle');
	const inputTitle = getInputValue(title);
	const sub = getNode('.coverSub');
	const inputSub = getTextareaValue(sub);
	const cover = getNode('.btn__upload');
	const coverImg = cover.value;

	function keyTheme() {
		return {
			title: `${inputTitle}`,
			sub: `${inputSub}`,
			coverImg: `${coverImg}`,
		};
	}

	const less = await userDataReview.post('http://localhost:3000/theme', keyTheme());

	if (less.ok) {
		console.log('ok');
	} else {
		console.log('no');
	}
}

enrollBtn.addEventListener('click', postTheme);
