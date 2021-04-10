import ulGallery from './gallery-items.js';
const body = document.querySelector('body');
const ulEl = document.createElement('ul');
ulEl.classList.add('gallery');


const makeGallery = (gal) => {

    const result = gal.map(el => {
        console.log(el);
        const { preview, original, description } = el;
        return `<li class="gallery__item">
  <a class="gallery__link"
    href=${original}>
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}/>
  </a>
</li>`});
    ulEl.innerHTML = result.join('');
    return ulEl;
};

makeGallery(ulGallery);
console.log(ulEl);
console.log(makeGallery(ulGallery));
console.log(body)
body.prepend(ulEl);
