import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const fieldsetmsinput = document.querySelector('.fieldsetmsinput');

form.addEventListener('submit', event => {
  event.preventDefault();

  const fieldsetinput = document.querySelector('input[name="state"]:checked');
  const delay = fieldsetmsinput.value;
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fieldsetinput.value === 'fulfilled') {
        resolve(
          iziToast.success({
            title: 'Success',
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'bottomLeft',
          })
        );
        console.log(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(
          iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'bottomLeft',
          })
        );
        console.log(`❌ Rejected promise in ${delay}ms`);
      }
    }, fieldsetmsinput.value);
  });
  fieldsetmsinput.value = '';
  fieldsetinput.checked = false;
});
