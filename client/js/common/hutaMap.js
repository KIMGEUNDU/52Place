import { getNode } from '../../lib/index.js';

//header 시간 바꾸기
const headerTime = getNode('.headerTime');
headerTime.textContent = new Date().toLocaleTimeString('ko-KR').slice(3, -3);

setInterval(() => {
	let time = new Date().toLocaleTimeString('ko-KR');
	headerTime.textContent = time.slice(3, -3);
}, 60000);

//하트바꾸기
const mapHeart = getNode('.mapHeartFalse');

let heartToggle = false;
function handleHeart() {
	if (!heartToggle) {
		mapHeart.className = 'mapHeartTrue';
	} else {
		mapHeart.className = 'mapHeartFalse';
	}
	heartToggle = !heartToggle;
}

mapHeart.addEventListener('click', handleHeart);

//카카오 지도API
/* global kakao */
const mapContainer = document.getElementById('map'),
	mapOption = {
		center: new kakao.maps.LatLng(37.646346, 127.034144),
		level: 1,
	};

const map = new kakao.maps.Map(mapContainer, mapOption);

const imageSrc = '../../assets/images/mappin.png',
	imageSize = new kakao.maps.Size(40, 60),
	imageOption = { offset: new kakao.maps.Point(30, 60) };

const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
	markerPosition = new kakao.maps.LatLng(37.646346, 127.034144);

const marker = new kakao.maps.Marker({
	position: markerPosition,
	image: markerImage,
});

marker.setMap(map);

const mapTypeControl = new kakao.maps.MapTypeControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
