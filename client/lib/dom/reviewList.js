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

export function createReviewList({ id, name, place, image, detail, date }) {
	let template = /* html */ `
    <li class="reivewList reviewContent" data-index= review-${id}>
      <figure class="review__preview figureSize">
        <img
          src="../assets/images/${image.src}"
          alt=""
          class="review__previewImg figureSize"
          aria-labelledby="review__previewCap"
        />
        <figcaption id="review__previewCap" class="sr-only">${image.alt}</figcaption>
      </figure>
      <div class="reviewBox">
        <h2 class="reviewTitle">${name}</h2>
        <p class="reviewDetail">${detail}</p>
        <span class="reviewLocation text-contentTeriary"
          >${place} | <time datetime="04-01" class="reviewDate">${date}&nbsp방문</time></span
        >
        <button class="callButton">
          <img src="../assets/icons/call.png" alt="전화걸기" />
        </button>
      </div>
    </li>
  `;
	return template;
}

export function renderReviewList(target, data) {
	insertLast(target, createReviewList(data));
}

export function createPlusReview({ id, where, location, preview, sub, when }) {
	let template = /* html */ `
  <ul class="enroll__list">
  <li class="Enroll__number">
    <img src="/assets/icons/paper.png" alt="icon-paper" />
    <p class="enroll__number">NO.${id}</p>
  </li>
  <li class="Enroll__img">
    <img
      class="enroll__img"
      src="/assets/images/${preview.src}"
      alt="${preview.alt}"
    />
  </li>
  <li class="enroll__time">
    <p class="enroll__time__p">${when}<strong class="enroll__time__tag">방문</strong></p>
    <span class="enroll__text">
      ${sub}
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
    <strong class="enroll__title">${where}</strong>
    <span class="flex text-xs text-slate-500">
      <p>리뷰 <strong class="mr-1">5 l </strong></p>
      <p class="enroll__location">${location}</p>
    </span>
    <button class="heartButton1"></button>
  </li>
  <li class="enroll__zig">
    <img class="enroll__zag" src="/assets/icons/zigzag.svg" alt="zig-zag" />
  </li>
</ul>`;
	return template;
}

export function renderPlusReview(target, data) {
	insertLast(target, createPlusReview(data));
}
