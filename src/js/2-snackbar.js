import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateRadios = form.querySelectorAll('input[name="state"]');

function createPromise(delay, shouldFulfill) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFulfill) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const selectedState = [...stateRadios].find(radio => radio.checked).value;
  const shouldFulfill = selectedState === 'fulfilled';

  createPromise(delay, shouldFulfill)
    .then(delay => {
      iziToast.success({
        title: '✅ Success',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        timeout: 4000,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌ Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 4000,
      });
    });
}
