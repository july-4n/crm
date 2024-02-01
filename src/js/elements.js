const body = document.querySelector('body');
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
const modalDiscountCheck = modal.querySelector('#discount');
const btnClose = modal.querySelector('.modal__close');
const vendorModalId = modal.querySelector('.vendor-code__id');
const modalTotal = modal.querySelector('.modal__total-price');
const modalCount = modal.querySelector('#count');
const modalPrice = modal.querySelector('#price');
const file = modal.querySelector('.modal__file');
const modalFieldset = modal.querySelector('.modal__fieldset');
const categoryList = modal.querySelector('#category-list');
const modalDescription = modal.querySelector('#description');
const modalUnits = modal.querySelector('#units');
const modalName = modal.querySelector('#title');
const modalCategory = modal.querySelector('.modal__label_category');
const modalSelect = modal.querySelector('.modal__select');
const modalSubmit = modal.querySelector('.modal__submit');
const tableBody = table.querySelector('.table__body');

export {
  body,
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
  modalDiscountCheck,
  btnClose,
  vendorModalId,
  modalTotal,
  modalCount,
  modalPrice,
  file,
  modalFieldset,
  categoryList,
  modalDescription,
  modalUnits,
  modalName,
  modalCategory,
  modalSelect,
  modalSubmit,
  tableBody,
}
