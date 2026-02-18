import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stateRadios = document.querySelectorAll('input[name="state"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const state = Array.from(stateRadios).find(radio => radio.checked)?.value;

  if (!state) {
    iziToast.warning({ title: 'Warning', message: 'Please select a state' });
    return;
  }

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') resolve(delay);
      else reject(delay);
    }, delay);
  })
    .then(delay => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected promise in ${delay}ms`,
      });
    });
});
