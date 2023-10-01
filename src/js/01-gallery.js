// Described in documentation
import SimpleLightbox from 'simplelightbox';
// Additional styles import
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector('.gallery');
const markup = galleryItems
  .map(
    image => `<li class="gallery__item"><a class="gallery__link" href="${image.original}"><img
      class="gallery__image"
      src="${image.preview}"
      alt="${image.description}"
    /></a></li>`
  )
  .join('');

gallery.insertAdjacentHTML('afterbegin', markup);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
