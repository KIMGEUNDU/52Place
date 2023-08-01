import { userDataReview, getNode } from '../../lib/index.js';
// 비밀번호 정규식
function pwdReg(text) {
	const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,16}$/;
	return re.test(String(text).toLowerCase());
}
// 이메일 정규식
function emailReg(text) {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(text).toLowerCase());
}

// 아이디 정규식 - 영문 대소문자와 숫자 0-9만 허용하는 최소3글자 이상 16글자 이하 id
function idReg(text) {
	const re = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{3,16}$/;
	return re.test(String(text));
}

const idInput = getNode('#userId');
const idError = getNode('.idError');
const emailInput = getNode('#userEmail');
const emailError = getNode('.emailError');
const pwdInput = getNode('#userPassword');
const pwdError = getNode('.pwdError');
const pwdSame = getNode('#pwdSame');
const pwdCheckError = getNode('.pwdCheckError');
const signUpBtn = getNode('.loginBtnOff');
const loginBtn = getNode('.loginBtn');

let idCheck = false;
let pwdCheck = false;
let emailCheck = false;
let pwdSameCheck = false;

function handleCheckId() {
	if (idReg(idInput.value)) {
		idError.classList.replace('invalidId', 'idError');
		idCheck = true;
	} else {
		idError.classList.replace('idError', 'invalidId');
		idCheck = false;
	}
}
function handleCheckEmail() {
	if (emailReg(emailInput.value)) {
		emailError.classList.replace('invalidEmail', 'emailError');
		emailCheck = true;
	} else {
		emailError.classList.replace('emailError', 'invalidEmail');
		emailCheck = false;
	}
}
function handleCheckPwd() {
	if (pwdReg(pwdInput.value)) {
		pwdError.classList.replace('invalidPwd', 'pwdError');
		pwdCheck = true;
	} else {
		pwdError.classList.replace('pwdError', 'invalidPwd');
		pwdCheck = false;
	}
}

function handleSamePwd() {
	if (pwdSame.value === pwdInput.value) {
		pwdCheckError.classList.replace('invalidPwdCheck', 'pwdCheckError');
		pwdSameCheck = true;
	} else {
		pwdCheckError.classList.replace('pwdCheckError', 'invalidPwdCheck');
		pwdSameCheck = false;
	}

	if (idCheck && emailCheck) {
		if (pwdCheck && pwdSameCheck) {
			signUpBtn.classList.replace('loginBtnOff', 'loginBtnOn');
		} else {
			signUpBtn.classList.replace('loginBtnOn', 'loginBtnOff');
		}
	}
}

async function renderlogin() {
	try {
		const response = await userDataReview.get('http://localhost:3000/login');
		const userData = response.data;
		if (idCheck && emailCheck) {
			if (pwdCheck && pwdSameCheck) {
				let data = {
					email: emailInput.value,
					id: idInput.value,
					password: pwdInput.value,
					uniqueId: Math.random().toString(36).substring(2, 12)
				}
				const membership = await userDataReview.post('http://localhost:3000/login', data);
				//const uniqueIdSave = userData.uniqueId;
				//console(userData);
				localStorage.setItem('uniqueId:',data.uniqueId);
				console.log(data.uniqueId);
				let link = 'login.html';
				location.href = link;
			}
		}
	} catch {}
}


function handleLogin(e) {
	e.preventDefault();
}

idInput.addEventListener('input', handleCheckId);
emailInput.addEventListener('input', handleCheckEmail);
pwdInput.addEventListener('input', handleCheckPwd);
pwdSame.addEventListener('input', handleSamePwd);
signUpBtn.addEventListener('click', handleLogin);
loginBtn.addEventListener('click', renderlogin);
