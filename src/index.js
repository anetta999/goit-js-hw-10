// live_puvCpPqGcrbqJ1nS91kUV2yehv1IseMiX7aIc3lf5zmPob9Ws6jByk3Uw6Vv7FUJ

const selectors = {
  breedsList: document.querySelector('.breed-select'),
  breedInfo: document.querySelector('.cat-info'),
};

fetchBreeds()
  .then(breeds => {
    selectors.breedsList.innerHTML = createBreedsListMarkup(breeds);
  })
  .catch(error => console.log(error));

function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const END_POINT = '/breeds';
  const API_KEY =
    'live_puvCpPqGcrbqJ1nS91kUV2yehv1IseMiX7aIc3lf5zmPob9Ws6jByk3Uw6Vv7FUJ';

  return fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

function createBreedsListMarkup(breeds) {
  return breeds
    .map(({ id, name }) => {
      `<option value="${id}">${name}</option>`;
    })
    .join('');
}
