import * as elems from './elements';
import {addGoodForm, editGoodForm} from './addGoods.js';

const maxFileSize = 1048576;
const delSvg = `
  <div class="image-container__overlay">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="ic:outline-delete-forever">
    <path id="Vector" d="M23.5334 17.45L20 20.9833L16.45 17.45L14.1 19.8L17.65 23.3333L14.1167 26.8667L16.4667 29.2167L20 25.6833L23.5334 29.2167L25.8834 26.8667L22.35 23.3333L25.8834 19.8L23.5334 17.45ZM25.8334 6.66667L24.1667 5H15.8334L14.1667 6.66667H8.33337V10H31.6667V6.66667H25.8334ZM10 31.6667C10 33.5 11.5 35 13.3334 35H26.6667C28.5 35 30 33.5 30 31.6667V11.6667H10V31.6667ZM13.3334 15H26.6667V31.6667H13.3334V15Z" fill="white"/>
    </g>
    </svg>
  </div>
`

const closeModal = () => {
  elems.overlay.classList.remove('active');
  elems.modalForm.reset();
  elems.modalDescription.textContent = '';
  if (elems.modalForm.querySelector('.image-container')) {
    console.log(elems.modalForm.querySelector('.image-container'))
    elems.modalForm.querySelector('.image-container').remove();
  }
};

const openModal = () => {
  elems.overlay.classList.add('active');
  elems.modalTotal.textContent = 0;
  const formData = new FormData(elems.modalForm);
  const goodTitle = Object.fromEntries(formData).title;

  if (goodTitle !== '') {
    console.log('PATCH');
    editGoodForm();
  } else {
    console.log('POST');
    addGoodForm();
  }
};

elems.overlay.addEventListener('click', (evt) => {
  if (evt.target === elems.overlay || evt.target.closest('.modal__close')) {
    closeModal();
  }
});

elems.btnAdd.addEventListener('click', () => {
  openModal();
  elems.modal.querySelector('.modal__vendor-code').style.display = 'none';
  elems.modalTitle.textContent = 'Добавить товар';
});

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
      modalPreviewContainer.insertAdjacentHTML('beforeend', delSvg);
    } else {
      modalPreviewContainer.remove();
      fileErrorMessage.classList.add('modal__label_file-error');
      fileErrorMessage.textContent = "изображение не должно превышать размер 1мб";
      elems.modalFieldset.append(fileErrorMessage);
    }
  }
})

document.addEventListener('click', ({target}) => {
  if (target.closest('.image-container__overlay svg')) {
    modalPreviewContainer.remove();
    elems.file.value = '';
  }
});

export {
  closeModal,
  openModal,
}
