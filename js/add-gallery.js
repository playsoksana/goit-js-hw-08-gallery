import ulGallery from './gallery-items.js';

// Создание разметки 
const listGalleryEl = document.querySelector('.js-gallery');
const lightboxButtonEl = document.querySelector('button[data-action="close-lightbox"]');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImageEl = lightboxEl.querySelector('.lightbox__image');
const lightboxOverlayEl = lightboxEl.querySelector('.lightbox__overlay')

//makeGallery
const makeGallery = (array) => {
  const result = array.map(({ preview, original, description }) =>
    `<li class="gallery__item">
  <a class="gallery__link"
    href=${original}>
    <img class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}/>
  </a>
</li>`);
  listGalleryEl.innerHTML = result.join('');
};
makeGallery(ulGallery);

//Делигирование 
listGalleryEl.addEventListener('click', openGallery);

function openGallery(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  lightboxEl.classList.add('is-open');
  addAttributeOnLightboxImage(event);
  return;
};

function addAttributeOnLightboxImage(event) {
  lightboxEl.querySelector('.lightbox__image').src = event.target.dataset.source;
  lightboxEl.querySelector('.lightbox__image').alt = event.target.alt;
  return;
};

//закрытие модалки 
lightboxButtonEl.addEventListener('click', closeModal);


function closeModal(event) {
  if (event.target.nodeName === 'BUTTON' || event.code === 'Escape' || event.target === lightboxOverlayEl) {
    lightboxEl.classList.remove('is-open');
    lightboxImageEl.removeAttribute('src');
    lightboxImageEl.removeAttribute('alt');
    return;
  };
  return;
};

lightboxEl.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModal);

window.addEventListener('keyup', aaa);
function aaa(event) {
  console.log(event.code);
  if (event.code === 'ArrowRight') {
    console.log('ArrowRight');

    return;
  };
  if (event.code === 'ArrowLeft') {
    console.log('ArrowLeft');

    return;
  };
  return;
};