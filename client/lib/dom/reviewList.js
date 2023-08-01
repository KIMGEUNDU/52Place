import { insertLast } from './insert.js';

export function createReview({ id, name, place, image }, index) {
	const hreflink = [
		'./kirinMap.html',
		'./mapoMap.html',
		'./newMap.html',
		'./koracMap.html',
		'./badaMap.html',
		'./samjjuMap.html',
		'./hutaMap.html',
		'./dieMap.html',
		'./gureomMap.html',
		'./opuMap.html',
		'./chunMap.html',
		'./keyescapeMap.html',
		'./beatphobiaMap.html',
	];
	const href = hreflink[index];

	let template = /* html */ `
  <li class="listSize" data-index= review-${id}>
  <a class="reviewLink " href="${href}">
  <img class="reviewImg" src="../../assets/images/${image.src}" alt="${image.alt}">
  <p class="reviewPlace">${place}</p> 
  <p class="reviewName">${name}</p>
  <img class="bookMark mark${id}" src="../../assets/icons/bookmarkactive=true.png" alt="북마크">
      </a>
  </li>`;
	return template;
}

function createNewReview({ name, place, date }, index) {
	const hreflink = ['./visiteLike1.html', './visiteLike2.html'];
	const href = hreflink[index];

	let template = /* html */ `
    <li>
    <a class="newListSize" href='${href}'>
      <div>
        <h2 class="font-semibold">${name}</h2>
        <div class="text-contentTeriary">
          <span class="border-r-2 pr-1">${place}</span>
          <span class="pl-1">${date} 방문</span>
        </div>
      </div>
      <img
        class="mt-[5px] h-[34px] w-[26px]"
        src="./../assets/icons/receipt.svg"
        alt="영수증 인증"
      />
    </a>
  </li>`;
	return template;
}

export function renderUserReview(target, data, index) {
	insertLast(target, createReview(data, index));
}

export function renderUserNewReview(target, data, index) {
	insertLast(target, createNewReview(data, index));
}
