import ulGallery from './gallery-items.js';

// Создание разметки 
const body = document.querySelector('body');
const ulEl = document.createElement('ul');
ulEl.classList.add('gallery');

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
body.prepend(ulEl);

const photoEl = document.querySelector('.gallery__item');
//Делигирование 
function clickOnGallery(event) {
  if (!event.target.classList.contains('gallery__link')) {
    return
  }
  console.log('фото');
}
body.addEventListener('click', clickOnGallery);