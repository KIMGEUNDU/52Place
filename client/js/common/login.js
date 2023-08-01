import { getNode, userDataReview } from '../../lib/index.js';

function idReg(text) {
	const re = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{3,16}$/;
	return re.test(String(text));
}

function pwdReg(text) {
	const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,16}$/;
	return re.test(String(text).toLowerCase());
}

function RandomId() {
	Math.random().toString(36).substring(2, 11);
}

const idInput = getNode('#userId');
const pwdInput = getNode('#userPassword');
const idError = getNode('.idError');
const pwdError = getNode('.pwdError');
const membersError = getNode('.membersError');
const signUpBtn = getNode('.loginBtnOff');
const loginBtn = getNode('.loginBtn');

let idCheck = false;
let pwdCheck = false;
let membersCheck = false;

function handleCheckId() {
	if (idReg(idInput.value)) {
		idError.classList.replace('invalidId', 'idError');
		idCheck = true;
	} else {
		idError.classList.replace('idError', 'invalidId');
		idCheck = false;
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
	if (idCheck && pwdCheck) {
		signUpBtn.classList.replace('loginBtnOff', 'loginBtnOn');
	} else {
		signUpBtn.classList.replace('loginBtnOn', 'loginBtnOff');
	}
}

async function renderlogin() {
	try {
		const response = await userDataReview.get('http://localhost:3000/login');
		const userData = response.data;
		userData.forEach((e) => {
			if (e.id === idInput.value) {
				if (e.password === pwdInput.value) {
					let link = 'themePage.html';
					location.href = link;
				} else {
					membersError.classList.replace('membersError', 'invalidMembers');
					membersCheck = true;
				}
			}

			if (e.password === pwdInput.value) {
				if (e.id === idInput.value) {
					console.log('e.uniqueId');
					membersError.classList.replace('invalidMembers', 'membersError');
					let link = 'themePage.html';
					location.href = link;
				} else {
					membersError.classList.replace('membersError', 'invalidMembers');
					membersCheck = true;
				}
			}
		});
	} catch {}
}

function handleLogin(e) {
	e.preventDefault();
}

idInput.addEventListener('input', handleCheckId);
pwdInput.addEventListener('input', handleCheckPwd);
signUpBtn.addEventListener('click', handleLogin);
loginBtn.addEventListener('click', renderlogin);

