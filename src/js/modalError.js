import * as elems from './elements';

const createModalErr = () => {
  const modal = document.createElement('div');
  modal.classList.add('modal-error', 'is-visible');

  modal.insertAdjacentHTML('beforeend', `
    <div class='modal-error__wrapper'>
      <button class="modal-error__close">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round" /></svg>
      </button>
      <div class='modal-error__content'>
        <div class='modal-error__svg'>
          <svg xmlns="http://www.w3.org/2000/svg" width="94" height="94" viewBox="0 0 94 94" fill="none">
          <path d="M2 2L92 92" stroke="#D80101" stroke-width="3" stroke-linecap="round"/>
          <path d="M2 92L92 2" stroke="#D80101" stroke-width="3" stroke-linecap="round"/>
          </svg>
          </div>
        <p class='modal-error__text'>Что-то пошло не так</p>
      </div>
    </div>
  `);

  return modal;
};

const renderModalErr = () => {
  const modal = createModalErr();
  elems.body.append(modal);
  return modal;
};

document.addEventListener('click', ({target}) => {
  if (target.closest('.modal-error__close')) {
    document.querySelector('.modal-error').classList.remove('is-visible');
    document.querySelector('.modal-error').remove();
  }
})

export default renderModalErr;
