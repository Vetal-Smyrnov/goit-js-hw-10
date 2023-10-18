import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_YssGInJ9tvstGzPveelvpYD3l7bDdmu2L1zEs8utl8AZ4d6VmD3FY51Y8Xczv1Vh';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  const url = `${BASE_URL}/breeds?api_key`;
  return axios.get(url).then(response => {
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  const url = `${BASE_URL}/images/search?api_key&breed_ids=${breedId}`;

  return axios.get(url).then(response => {
    return response.data;
  });
}

// export function fetchCatByBreed(breedId) {
//   return fetch(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`).then(
//     response => {
//       if (!response.ok) {
//         throw new Error(
//           `Вимушена помилка статусу: ${response.status} | Причина: ${response.statusText}`
//         );
//       }
//       return response.json();
//     }
//   );
// }
