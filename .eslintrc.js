module.exports = {
  env: {
    browser: true, //브라우저 환경에서 작동할지 여부를 설정
    es2021: true, //ECMAScript 2021 표준을 지원할지 여부를 설정
    node: true, //Node 환경에서 작동할지 여부를 설정한다.
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn", //사용하지 않은 변수에 대해 경고 표시
    "no-var": "error", //변수 var 사용시 에러 표시
  },
  quotes: ["error", "single"],
};
