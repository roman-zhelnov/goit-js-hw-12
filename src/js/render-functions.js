import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderImagesCards(images, galleryList) {
  const markup = images.hits
    .map(
      image =>
        `<li
      class="gallery-item">
    <a class="gallery-link" href=${image.largeImageURL}>
    <img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}"/>
    <div class="gallery-wrap">
    <p class="gallery-text"><span class="gallery-span">Likes</span>${image.likes}</p>
    <p class="gallery-text"><span class="gallery-span">Views</span>${image.views}</p>
    <p class="gallery-text"><span class="gallery-span">Comments</span>${image.comments}</p>
    <p class="gallery-text"><span class="gallery-span">Downloads</span>${image.downloads}</p>
    </div>
    </a>
    </li>`
    )
    .join('');
  galleryList.insertAdjacentHTML('beforeend', markup);

  let gallerySL = new SimpleLightbox('.gallery-list a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  gallerySL.refresh();
}
