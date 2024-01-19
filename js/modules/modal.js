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

const fileErrorMessage = document.createElement('p');
const modalPreviewContainer = document.createElement('div');
const modalPreview = document.createElement('img');

elems.file.addEventListener('change', () => {
  if (elems.file.files.length > 0) {
    const selectedFile = elems.file.files[0];
    if (selectedFile.size <= 1048576) {
      fileErrorMessage.innerHTML = '';

      modalPreviewContainer.classList.add('image-container');
      elems.modalFieldset.append(modalPreviewContainer);
      modalPreviewContainer.innerHTML = '';

      modalPreview.classList.add('modal__label_file-add');
      modalPreview.innerHTML = '';
      const src = URL.createObjectURL(selectedFile);
      modalPreviewContainer.append(modalPreview);
      modalPreview.src = src;
      modalPreviewContainer.style.display = 'block';
    } else {
      modalPreviewContainer.remove();
      fileErrorMessage.classList.add('modal__label_file-error');
      fileErrorMessage.textContent = "изображение не должно превышать размер 1мб";
      elems.modalFieldset.append(fileErrorMessage);

    }
  }
})

export {
  closeModal,
}
