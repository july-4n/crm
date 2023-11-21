import {generateRandomId} from './utils.js';
import * as elems from './elements.js';

const closeModal = () => {
  elems.overlay.classList.remove('active');
};

const openModal = () => {
  elems.overlay.classList.add('active');
  elems.modalTotal.textContent = 0;
  elems.vendorModalId.textContent = generateRandomId();
};

elems.overlay.addEventListener('click', (evt) => {
  if (evt.target === elems.overlay || evt.target.closest('.modal__close')) {
    closeModal();
  }
});

elems.btnAdd.addEventListener('click', openModal);

elems.modal.addEventListener('change', evt => {
  if (evt.target.closest('.modal__checkbox')) {
    if (!elems.modalInputCheckbox.checked) {
      elems.modalInputDiscount.value = '';
      elems.modalInputDiscount.setAttribute('disabled', '');
    } else {
      elems.modalInputDiscount.removeAttribute('disabled');
    }
  }
});

const getModalTotal = () => {
  elems.modalTotal.textContent = parseInt(elems.modalCount.value * elems.modalPrice.value);
}

const addRequiredAttr = inputs => {
  inputs.forEach(el => {
    el.setAttribute('required', '');
  });
};

addRequiredAttr(elems.modalInputs);

elems.overlay.classList.remove('active');

elems.modal.addEventListener('change', getModalTotal);

export {
  closeModal,
}
