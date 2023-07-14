// live_puvCpPqGcrbqJ1nS91kUV2yehv1IseMiX7aIc3lf5zmPob9Ws6jByk3Uw6Vv7FUJ
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import 'notiflix/src/notiflix.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

Notiflix.Notify.init({
  position: 'center-top',
  timeout: 3600000,
  backOverlay: true,
});

Notiflix.Loading.init({ backgroundColor: 'rgba(0,0,0,0.7)' });

const selectors = {
  breedsList: document.querySelector('.breed-select'),
  breedInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
};

showLoader(selectors.breedsList);
fetchBreeds()
  .then(breeds => {
    if (!breeds.length) {
      throw new Error();
    }
    selectors.breedsList.innerHTML = createBreedsListMarkup(breeds);
    new SlimSelect({
      select: selectors.breedsList,
      settings: { showSearch: false },
    });
    selectors.breedsList.classList.remove('hidden');
  })
  .catch(handleError)
  .finally(hideLoader);

function createBreedsListMarkup(breeds) {
  return breeds
    .map(({ id, name }) => {
      return `<option value="${id}" class ="select-option">${name}</option>`;
    })
    .join('');
}

selectors.breedsList.addEventListener('change', onBreedSearch);

function onBreedSearch(evt) {
  showLoader(selectors.breedInfo);

  fetchCatByBreed(evt.target.value)
    .then(data => {
      // console.log(data);
      if (!data.length) {
        throw new Error();
      }
      selectors.breedInfo.innerHTML = createBreedInfoMarkup(data);
      selectors.breedInfo.classList.remove('hidden');
    })
    .catch(handleError)
    .finally(hideLoader);
}

function createBreedInfoMarkup(data) {
  return data
    .map(({ url, breeds }) => {
      return `
    <img src="${url}" alt="${breeds[0].name}" width="300px" />
    <div class="cat-info-text">
      <h2 class="cat-name">${breeds[0].name}</h2>
      <p class="cat-description">${breeds[0].description}</p>
      <p class="cat-temperament">
        <span class="cat-temperament-title">Temperament:</span>
      ${breeds[0].temperament}</p>
    </div>`;
    })
    .join('');
}

function showLoader(element) {
  element.classList.add('hidden');
  Notiflix.Loading.circle();
}

function hideLoader() {
  Notiflix.Loading.remove(500);
}

function handleError() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
