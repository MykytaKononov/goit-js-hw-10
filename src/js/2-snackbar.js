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
        resolve(delay);
      } else {
        reject(delay);
      }
    }, fieldsetmsinput.value);
  })
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'bottomLeft',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'bottomLeft',
      });
    });
  fieldsetmsinput.value = '';
  fieldsetinput.checked = false;
});
