import { getNode, userDataReview } from '../../lib/index.js';

//header 시간 바꾸기
const headerTime = getNode('.headerTime');
headerTime.textContent = new Date().toLocaleTimeString('ko-KR').slice(3, -3);

setInterval(() => {
	let time = new Date().toLocaleTimeString('ko-KR');
	headerTime.textContent = time.slice(3, -3);
}, 60000);

//카카오 지도API 생성
/* global kakao */
const mapContainer = document.getElementById('map'),
	mapOption = {
		center: new kakao.maps.LatLng(37.557044, 126.916801),
		level: 6,
	};

const map = new kakao.maps.Map(mapContainer, mapOption);

//카카오 지도API 여러개 핀 생성
const response = await userDataReview.get('http://localhost:3000/map');
const mapData = response.data;

function mapArr() {
	const positions = mapData.map((item) => {
		const latlng = item.latlng.split(',').map((coord) => parseFloat(coord));
		return {
			title: item.title,
			latlng: new kakao.maps.LatLng(latlng[0], latlng[1]),
		};
	});

	return positions;
}

const positions = mapArr();

const imageSrc = '../../assets/images/mappin.png';

for (let i = 0; i < positions.length; i++) {
	const imageSize = new kakao.maps.Size(40, 60);

	const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

	let marker = new kakao.maps.Marker({
		map: map,
		position: positions[i].latlng,
		title: positions[i].title,
		image: markerImage,
	});
}

//카카오 지도API 확대표시바
const mapTypeControl = new kakao.maps.MapTypeControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
