import ulGallery from './gallery-items.js';

// Создание разметки 
const listGalleryEl = document.querySelector('.js-gallery');

const lightboxButtonEl = document.querySelector('button[data-action="close-lightbox"]');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImageEl = lightboxEl.querySelector('.lightbox__image');
const lightboxOverlayEl = lightboxEl.querySelector('.lightbox__overlay');

//makeGallery
const makeGallery = (array) => {
  const result = array.map(({ preview, original, description }) =>
    `<li class="gallery__item">
  <a class="gallery__link"
    href=${original}>
    <img class="gallery__image"
      src=${preview}
      data-source=${original}
      alt='${description}'/>
  </a>
</li>`);
  listGalleryEl.innerHTML = result.join('');
};
makeGallery(ulGallery);

//loading = 'lazy';
const arrImgPreviewEl = listGalleryEl.querySelectorAll('.gallery__image');


if ('loading' in HTMLImageElement.prototype) {

  arrImgPreviewEl.forEach(img => {
    img.setAttribute('data-src', img.src);
    img.setAttribute('loading', 'lazy');
  });
} else {
  const scriptEl = document.createElement('script');
  scriptEl.src = "./js/lazysizes.min.js";
  scriptEl.async = "";
  const bodyEl = document.querySelector('body');
  bodyEl.append(scriptEl);
  img.classList.add('lazyload');
}


//Делигирование 
listGalleryEl.addEventListener('click', openGallery);

lightboxEl.removeEventListener('click', closeModal);
window.removeEventListener('keydown', closeModal);
lightboxButtonEl.removeEventListener('click', closeModal);

function openGallery(event) {
  listGalleryEl.removeEventListener('click', openGallery);
  lightboxEl.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModal);
  lightboxButtonEl.addEventListener('click', closeModal);
  window.addEventListener('keyup', flickThrough);

  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
  }
  lightboxEl.classList.add('is-open');
  addAttributeOnLightboxImage(event);
};

function addAttributeOnLightboxImage(event) {
  lightboxImageEl.src = event.target.dataset.source;
  lightboxImageEl.alt = event.target.alt;
};




//closing modal

function closeModal(event) {

  if (event.target.nodeName === 'BUTTON' || event.code === 'Escape' || event.target === lightboxOverlayEl) {
    listGalleryEl.addEventListener('click', openGallery);
    lightboxEl.classList.remove('is-open');
    lightboxImageEl.removeAttribute('src');
    lightboxImageEl.removeAttribute('alt');
    window.removeEventListener('keyup', flickThrough);
  };
};


//right and left
let indexCurrentPhoto;
function flickThrough(event) {
  findIndex();

  if (event.code === 'ArrowRight') {
    if (indexCurrentPhoto === ulGallery.length - 1) {
      indexCurrentPhoto = -1;
    };
    lightboxImageEl.src = ulGallery[indexCurrentPhoto + 1].original;
    lightboxImageEl.alt = ulGallery[indexCurrentPhoto + 1].description;
    return lightboxImageEl;
  };

  if (event.code === 'ArrowLeft') {
    if (indexCurrentPhoto === 0) {
      indexCurrentPhoto = ulGallery.length;
    };
    lightboxImageEl.src = ulGallery[indexCurrentPhoto - 1].original;
    lightboxImageEl.alt = ulGallery[indexCurrentPhoto - 1].description;
    return lightboxImageEl;
  };
};

function findIndex() {
  ulGallery.forEach((el, i) => {
    if (el.description === lightboxImageEl.getAttribute('alt')) {
      return indexCurrentPhoto = i;
    }
  });
}