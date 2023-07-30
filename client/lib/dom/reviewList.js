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
