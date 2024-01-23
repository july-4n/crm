import {generateRandomId} from './utils';
import fetchRequest from './fetchRequest';
import * as elems from './elements';

const maxFileSize = 1048576;

const createOption = (text) => {
  const option = document.createElement('option');
  option.textContent = text;
  option.value = text;
  return option;
};

export const renderCategory = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }
  const categories = data.map(el => {
    const option = createOption(el);
    option.value = el;

    return option;
  });
  return categories;
};

const initCategory = async () => {
  const categories = await fetchRequest('https://sore-wry-blade.glitch.me/api/categories', {
    callback: renderCategory,
  });
  console.log(categories);
  elems.categoryList.innerHTML = '';
  elems.categoryList.append(...categories)
};

const closeModal = () => {
  elems.overlay.classList.remove('active');
  elems.modalForm.reset();
  elems.modalDescription.textContent = '';
};

const openModal = () => {
  elems.overlay.classList.add('active');
  elems.modalTotal.textContent = 0;
  elems.vendorModalId.textContent = generateRandomId();
  return elems.vendorModalId;
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
    if (selectedFile.size <= maxFileSize) {
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

initCategory();

export {
  closeModal,
  openModal,
  initCategory,
}
