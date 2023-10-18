import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
let arrOptions = [{ text: '', value: '', placeholder: true }];

breedSelect.classList.replace('breed-select', 'unloader');
changeErrorStatus();

breedSelect.style.color = '#008000';
breedSelect.style.maxWidth = '400px';

catInfo.style.display = 'flex';
catInfo.style.gap = '20px';

fetchBreeds()
  .then(date => {
    date.forEach(element => {
      arrOptions.push({
        text: element.name,
        value: element.id,
        style: 'background-color: YellowGreen',
      });
    });
    new SlimSelect({
      select: breedSelect,
      data: arrOptions,
      settings: {
        allowDeselect: true,
      },
    });
    changeLoadingStatus();

    breedSelect.classList.replace('unloader', 'breed-select');
  })
  .catch(fnErr);

function fnErr(err) {
  // if (!arrOptions.placeholder.value || !ind) {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
  changeUnErrorStatus();
  changeLoadingStatus();
  // }
}

breedSelect.addEventListener('change', () => {
  changeErrorStatus();
  changeUnLoadingStatus();
  const breedId = breedSelect.value;
  if (breedId !== '') {
    fetchCatByBreed(breedId)
      .then(data => {
        changeLoadingStatus();
        catInfo.innerHTML = `<div><img src="${data[0].url}" alt="${data[0].breeds[0].name}" width="400" /></div>
                <div><b><h2> ${data[0].breeds[0].name}</h2></b>
                <p> ${data[0].breeds[0].description}</p>
                <p><b>Temperament:</b> ${data[0].breeds[0].temperament}</p></div>`;
      })
      .catch(fnErr);
  } else {
    changeLoadingStatus();
    catInfo.innerHTML = '';
  }
});

function changeLoadingStatus() {
  loader.classList.replace('loader', 'unloader');
}

function changeUnLoadingStatus() {
  loader.classList.replace('unloader', 'loader');
}
function changeUnErrorStatus() {
  error.classList.replace('unloader', 'error');
}
function changeErrorStatus() {
  error.classList.replace('error', 'unloader');
}
