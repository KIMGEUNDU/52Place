module.exports = {
	plugins: ['prettier-plugin-tailwindcss'], //Tailwind CSS와 같은 플러그인을 Prettier와 함께 사용하도록 설정

	arrowParens: 'always', // 화살표 함수 식 매개변수 () 생략 여부 (ex: (a) => a)

	// html
	htmlWhitespaceSensitivity: 'css',
	bracketSameLine: false, //inline 요소 사이의 공백 제거

	bracketSpacing: true, // 객체 표기 괄호 사이 공백 추가 여부

	printWidth: 100, // 줄 길이가 100글자 넘어가면 자동 개행

	proseWrap: 'preserve', // 산문의 줄바꿈을 원본 텍스트와 동일하게 보존

	quoteProps: 'as-needed', // 객체 속성 key 값에 인용 부호 항상 사용

	semi: true, // 세미콜론(;) 사용 여부

	singleQuote: true, // 문자열일 때 싱글 인용 부호만 사용

	tabWidth: 2, // 탭 너비 2로 설정

	useTabs: true, // 탭 사용

	trailingComma: 'es5', // 객체 마지막 속성 선언 뒷 부분에 콤마 추가
};
