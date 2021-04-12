import ulGallery from './gallery-items.js';

// Создание разметки 
const body = document.querySelector('body');
const ulEl = document.createElement('ul');
ulEl.classList.add('gallery');
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
  ulEl.innerHTML = result.join('');
  return ulEl;
};
makeGallery(ulGallery);

//makeModal

  const lightboxEl = document.createElement('div')
  lightboxEl.classList.add('lightbox');

  const lightboxOverlayEl = document.createElement('div');
  lightboxOverlayEl.classList.add('lightbox__overlay');

const lightboxContentEl = document.createElement('div');
lightboxContentEl.classList.add('lightbox__content')

const lightboxImageEl = document.createElement('img');
lightboxImageEl.classList.add('lightbox__image');

const lightboxButtonEl = document.createElement('button');
lightboxButtonEl.classList.add('lightbox__button');
lightboxButtonEl.setAttribute('type', 'button');
lightboxButtonEl.setAttribute('data-action', 'close-lightbox');
lightboxContentEl.append(lightboxImageEl);
lightboxOverlayEl.append(lightboxContentEl);
lightboxEl.append(lightboxOverlayEl, lightboxButtonEl);


body.prepend(ulEl, lightboxEl);

const photoEl = document.querySelector('.gallery__item');
//Делигирование 
function clickOnGallery(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    console.log('мимо');
  }
  //открітие модалки
 lightboxEl.classList.add('is-open');
 lightboxEl.querySelector('.lightbox__image').src = event.target.dataset.source;
 lightboxEl.querySelector('.lightbox__image').alt = event.target.alt;
console.log(lightboxEl);

};
ulEl.addEventListener('click', clickOnGallery);


//закрытие модалки 

function closeBtn () {
  lightboxEl.classList.remove('is-open');
  lightboxEl.querySelector('.lightbox__image').removeAttribute('src');
 lightboxEl.querySelector('.lightbox__image').removeAttribute('alt');
};

lightboxButtonEl.addEventListener('click', closeBtn);
