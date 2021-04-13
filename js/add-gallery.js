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
      alt=${description}/>
  </a>
</li>`);
  listGalleryEl.innerHTML = result.join('');
};
makeGallery(ulGallery);

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

  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  lightboxEl.classList.add('is-open');
  addAttributeOnLightboxImage(event);
  return;
};

function addAttributeOnLightboxImage(event) {
  lightboxImageEl.src = event.target.dataset.source;
  lightboxImageEl.alt = event.target.alt;
  return;
};

//закрытие модалки 



function closeModal(event) {
  
  if (event.target.nodeName === 'BUTTON' || event.code === 'Escape' || event.target === lightboxOverlayEl) {
    listGalleryEl.addEventListener('click', openGallery);
    lightboxEl.classList.remove('is-open');
    lightboxImageEl.removeAttribute('src');
    lightboxImageEl.removeAttribute('alt');
    return;
  };
  return;
};


const arrImgPreview = listGalleryEl.querySelectorAll('.gallery__image');
console.log(arrImgPreview);
arrImgPreview.forEach(img => img.addEventListener('load', print));
function print (event) {
  console.log('LOAD')
};
/////////////////////////////////////////////////////



// window.addEventListener('keyup', flickThrough);
// function flickThrough(event) {
//   console.log(event.code);
//   if (event.code === 'ArrowRight') {
//             console.log('111');
//     return;
//   };
//   if (event.code === 'ArrowLeft') {
//     console.log('ArrowLeft');

//     return;
//   };
//   return;
// };
