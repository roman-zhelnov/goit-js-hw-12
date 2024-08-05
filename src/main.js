import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { searchImagesByQuery } from './js/pixabay-api';
import { renderImagesCards } from './js/render-functions';
import axios from 'axios';

const formEl = document.querySelector('.form-gallery');
const inputEl = document.querySelector('.form-gallery-input');
const loaderEl = document.querySelector('.loader');
const galleryListEl = document.querySelector('.gallery-list');
const moreImageBtn = document.querySelector('.btn');
let page = 1;
let limit = 15;
let totalPages = 0;

formEl.addEventListener('submit', handleSubmit);
moreImageBtn.addEventListener('click', handleClick);

function handleSubmit(event) {
  event.preventDefault();
  moreImageBtn.classList.add('visually-hidden');
  galleryListEl.innerHTML = '';
  loaderEl.classList.remove('visually-hidden');
  let inputValue = inputEl.value.trim().toLowerCase();
  if (inputValue === '') {
    loaderEl.classList.add('visually-hidden');
    return;
  }

  searchImagesByQuery(inputValue, page)
    .then(images => {
      totalPages = Math.ceil(images.totalHits / limit);
      loaderEl.classList.add('visually-hidden');
      if (images.hits.length === 0) {
        iziToast.error({
          maxWidth: '370px',
          position: 'topRight',
          messageColor: 'white',
          backgroundColor: 'red',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        renderImagesCards(images, galleryListEl);
        if (page < totalPages) {
          moreImageBtn.classList.remove('visually-hidden');
        }
      }
    })
    .catch(error => {
      loaderEl.classList.add('visually-hidden');
      iziToast.error({
        maxWidth: '370px',
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'red',
        message: ' Sorry, there was an error connecting to the server!',
      });
      console.error(error);
    })
    .finally(() => {
      inputEl.value = '';
      event.target.reset();
    });
}

async function handleClick() {
  page += 1;
  let inputValue = inputEl.value.trim().toLowerCase();
  const newPage = await searchImagesByQuery(inputValue, page);
  renderImagesCards(newPage, galleryListEl);

  const firstCard = document.querySelector('.gallery-list li');
  const cardHeight = firstCard.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  if (page >= totalPages) {
    moreImageBtn.classList.add('visually-hidden');
    return iziToast.error({
      position: 'topRight',
      message: "We're sorry, there are no more posts to load",
    });
  }
}
