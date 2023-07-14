export { fetchBreeds, fetchCatByBreed };

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

function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const END_POINT = '/images/search';
  const API_KEY =
    'live_puvCpPqGcrbqJ1nS91kUV2yehv1IseMiX7aIc3lf5zmPob9Ws6jByk3Uw6Vv7FUJ';
  const BREED_IDS = 'breed_ids';
  return fetch(
    `${BASE_URL}${END_POINT}?${BREED_IDS}=${breedId}&api_key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
