import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '45157582-00dbe423a45a27ad3340fe116';
export async function searchImagesByQuery(query, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  });

  try {
    const response = await axios.get(`${URL}?${searchParams}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
