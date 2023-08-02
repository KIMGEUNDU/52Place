import { userDataReview, getNode } from '../../lib/index.js';

const logoutBtn = getNode('.coupon');
//const idInput = getNode('#userId');
//console.log(idInput.value);
async function renderLogout() {
  try {
     const response = await userDataReview.get('http://localhost:3000/login/goo123');
     //const response = await userDataReview.get(`http://localhost:3000/login/${idInput.value}`);
      const userData = response.data;
      console.log(userData.uniqueId);
      localStorage.removeItem('uniqueId');
      location.href = 'login.html';
  } catch {}
}
logoutBtn.addEventListener('click', renderLogout);