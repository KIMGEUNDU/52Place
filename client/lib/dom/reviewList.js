import { insertLast } from './insert.js';

export function createRiview({ id, name, place, image }) {
	let template = /* html */ `
  <li class="listSize" data-index= review-${id}>
  <a class="reviewLink " href="#">
  <img class="reviewImg" src="../../assets/images/${image.src}" alt="${image.alt}">
  <p class="reviewPlace">${place}</p> 
  <p class="reviewName">${name}</p>
  <img class="bookMark mark${id}" src="../../assets/icons/bookmarkactive=true.png" alt="북마크">
      </a>
  </li>`;
	return template;
}

export function renderUserReview(target, data) {
	insertLast(target, createRiview(data));
}

export function saveRiview({ id, name, place, image }) {
	let template = /* html */ `
  <ul class="enroll__list">
  <li class="Enroll__number">
    <img src="/assets/icons/paper.png" alt="icon-paper" />
    <p class="enroll__number">NO.${id}</p>
  </li>
  <li class="Enroll__img">
    <img
      class="enroll__img"
      src="/assets/images/${image.src}"
      alt="아이스아메리카노"
    />
  </li>
  <li class="enroll__time">
    <p class="enroll__time__p">22.11.4 금<strong class="enroll__time__tag">방문</strong></p>
    <span class="enroll__text">
      <p>지나가다 보고 너무 예뻐서 저장해 놓았다가</p>
      <p>이번에 가게 되었는데 너무 예쁘고 좋았어요.</p>
      <p>분위기도 힙하고 새로 생겼는데 오래 동안...</p>
    </span>
    <div class="enroll__tag">
      <p class="enroll__tag__p">
        <img
          class="enroll__tag__p__img"
          src="/assets/icons/time.png"
          alt="icon-sm-time"
        />수업 시간이 충분해요
      </p>
      <p class="enroll__tag__p">+5</p>
    </div>
  </li>
  <li class="Enroll__title">
    <strong class="enroll__title">${name}</strong>
    <span class="flex text-xs text-slate-500">
      <p>리뷰 <strong class="mr-1">5 l </strong></p>
      <p class="enroll__place">${place}</p>
    </span>
    <button class="heartButton1"></button>
  </li>
  <li class="enroll__zig">
    <img class="enroll__zag" src="/assets/icons/zigzag.svg" alt="zig-zag" />
  </li>
</ul>`;
	return template;
}

export function renderSaveReview(target, data) {
	insertLast(target, saveRiview(data));
}
