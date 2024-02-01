import * as elems from './elements';
import {formControl} from './controls.js';
import {createVendorCode} from './create';
import {fileControl, renderPreview} from './addFile';
import {renderModalErr} from './modalError.js';

export const closeModal = () => {
  elems.overlay.classList.remove('active');
  elems.modalForm.reset();
  elems.modalDescription.textContent = '';
  const vendorCode = elems.modal.querySelector('.vendor-code');
  // const previewContainer = elems.modal.querySelector('.image-container');
  // previewContainer.innerHTML = '';
  // previewContainer.style.display = 'none';
  const error = elems.modal.querySelector('.modal__label_file-error');
  console.log(error)
  if (error) {
    error.remove();
  }

  if (vendorCode) {
    vendorCode.remove();
  }
};

export const openModal = async (err, data, list) => {
  if (err) {
    renderModalErr(err);
    return;
  }

  elems.overlay.classList.add('active');

  if (data) {
    const vendorCode = createVendorCode(data.id);
    document.querySelector('.modal_top').insertAdjacentHTML('beforeend', vendorCode);
    elems.modalTitle.textContent = 'Изменить товар';
    elems.modalSubmit.textContent = 'Изменить товар';

    elems.modalInputDiscount.setAttribute('disabled', '');
    elems.modalDiscountCheck.removeAttribute('checked');
    elems.modalName.value = data.title;
    elems.modalSelect.value = data.category;
    elems.modalDescription.textContent = data.description;
    elems.modalUnits.value = data.units;
    elems.modalInputDiscount.value = data.discount;
    elems.modalCount.value = data.count;
    elems.modalPrice.value = data.price;

    if (data.discount > 0) {
      elems.modalInputDiscount.removeAttribute('disabled');
      elems.modalDiscountCheck.setAttribute('checked', '');
      let total = elems.modalCount.value * elems.modalPrice.value;
      total -= total * (data.discount / 100);
      elems.modalTotal.textContent = parseInt(total);
    } else {
      elems.modalTotal.textContent = parseInt(elems.modalCount.value * elems.modalPrice.value);
    }
  }

  if (data && data.image !== "image/notimage.jpg") {
    const containerPreview = elems.modalFieldset.querySelector('.image-container');
    const preview = renderPreview(data);
    console.log(preview)
    containerPreview.innerHTML = preview;
    containerPreview.style.display = 'block';
  }

  fileControl(data);
  if (!data) {
    formControl(elems.modalForm, 'POST', list);
    elems.modalTitle.textContent = 'Добавить товар';
    elems.modalSubmit.textContent = 'Добавить товар';
  } else {
    formControl(elems.modalForm, 'PATCH', null, data.id);
  }

  elems.overlay.addEventListener('click', (evt) => {
    if (evt.target === elems.overlay || evt.target.closest('.modal__close')) {
      closeModal();
    }
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
};

const addRequiredAttr = inputs => {
  inputs.forEach(el => {
    el.setAttribute('required', '');
  });
};

addRequiredAttr(elems.modalInputs);

elems.overlay.classList.remove('active');
