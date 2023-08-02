import { userDataReview, getNode } from '../../lib/index.js';

const logoutBtn = getNode('.coupon');
//const idInput = getNode('#userId');
//console.log(idInput.value);
async function renderLogout() {
  try {
    console.log('완료');
     const response = await userDataReview.get('http://localhost:3000/login');
     //const response = await userDataReview.get(`http://localhost:3000/login/${idInput.value}`);
      const userData = response.data;
      //console.log(userData.uniqueId);
      localStorage.removeItem('uniqueId');
      location.href = 'login.html';
  } catch { console.log('버튼완료');}
}
logoutBtn.addEventListener('click', renderLogout);