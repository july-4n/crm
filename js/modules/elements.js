const cms = document.querySelector('.cms');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const table = cms.querySelector('.table');
const totalPrice = cms.querySelector('.cms__total-price');
const btnAdd = cms.querySelector('.panel__add-goods');
const modalTitle = modal.querySelector('.modal__title');
const modalForm = modal.querySelector('.modal__form');
const modalInputs = modal.querySelectorAll('.modal__input');
const modalInputCheckbox = modal.querySelector('.modal__checkbox');
const modalInputDiscount = modal.querySelector('.modal__input_discount');
const btnClose = modal.querySelector('.modal__close');
const vendorModalId = modal.querySelector('.vendor-code__id');
const modalTotal = modal.querySelector('.modal__total-price');
const modalCount = modal.querySelector('#count');
const modalPrice = modal.querySelector('#price');
const tableBody = table.querySelector('.table__body');
const file = document.querySelector('.modal__file');
const modalFieldset = document.querySelector('.modal__fieldset');

export {
  cms,
  modal,
  overlay,
  table,
  totalPrice,
  btnAdd,
  modalTitle,
  modalForm,
  modalInputs,
  modalInputCheckbox,
  modalInputDiscount,
  btnClose,
  vendorModalId,
  modalTotal,
  modalCount,
  modalPrice,
  tableBody,
  file,
  modalFieldset
}
