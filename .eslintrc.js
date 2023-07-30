module.exports = {
	env: {
		browser: true, //브라우저 환경에서 작동할지 여부를 설정
		es2021: true, //ECMAScript 2021 표준을 지원할지 여부를 설정
		node: true, //Node 환경에서 작동할지 여부를 설정한다.
	},
	extends: 'eslint:recommended', //ESLint의 권장 규칙을 사용하도록 설정
	overrides: [
		{
			env: {
				node: true, //Node.js 환경에서 이 설정을 사용
			},
			files: ['.eslintrc.{js,cjs}'], //.eslintrc.js 또는 .eslintrc.cjs 파일에 대해서만 이 설정을 적용
			parserOptions: {
				sourceType: 'script', //해당 파일이 스크립트 파일임을 나타냄
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest', //최신 ECMAScript 버전을 지원한다고 설정
		sourceType: 'module', //모듈 형식으로 작성된 코드를 사용한다고 설정
	},
	rules: {
		'no-unused-vars': 'warn', //사용하지 않은 변수에 대해 경고 표시
		'no-var': 'error', //변수 varA 사용시 에러 표시
		quotes: ['error', 'single'], //single quote만 사용하도록 강제
	},
};
