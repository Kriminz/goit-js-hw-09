import Notiflix from 'notiflix';

const formPromise = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {

    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({position, delay});
      } else {
        // Reject
        reject({position, delay});
      }
    }, delay);
  });
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

formPromise.addEventListener('submit', (e) => {
  e.preventDefault();

  var delay = Number(formPromise.elements.delay.value);
  const step = Number(formPromise.elements.step.value);
  const amount = Number(formPromise.elements.amount.value);

  var position = 0;
  var promiseDelay = 0;

  for(let i = 1; i <= amount; i += 1){
    position = i;
    promiseDelay = delay;

  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    
    delay += step;
  }
});

