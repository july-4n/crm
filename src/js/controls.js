import fetchRequest from './fetchRequest';
import * as elems from './elements';
import {calculateTotalPrice} from './getPrice';
import toBase64 from './base64';
import {address} from './fetchRequest';
import {renderModalConfirm, delGoods} from './modalConfirm';
import {openModal, closeModal} from './modal';
import {createRow} from './create';
import {renderModalErr} from './modalError';
import {changeCursor} from './render';

const updateRow = (id, data) => {
  const row = document.querySelector(`[data-id="${id}"]`);
  const updatedRow = createRow(data);
  row.innerHTML = updatedRow;
  changeCursor(elems.tableBody);
};

export const getTotalPrice = () => {
  fetchRequest(`/api/goods`, {
    method: 'GET',
    callback(err, data) {
      if (err) return;

      calculateTotalPrice(data.goods);
    },
  });
};

export const formControl = (form, method, list, id) => {
  form.addEventListener('input', ({target}) => {
    if (
      target === form.discount
      || target === form.count
      || target === form.price
    ) {
      target.value = target.value.replace(/\D/, '');
    } else if (target === form.units) {
      target.value = target.value.replace(/[^а-я]/i, '');
    }
  });

  form.addEventListener('change', () => {
    if (form.discount[1].value > 0) {
      let total = elems.modalCount.value * elems.modalPrice.value;
      total -= total * (form.discount[1].value / 100);
      elems.modalTotal.textContent = parseInt(total);
    } else {
      elems.modalTotal.textContent = parseInt(elems.modalCount.value * elems.modalPrice.value);
    }
  });

  form.addEventListener('submit', async evt => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const body = Object.fromEntries(formData);
    body.image = await toBase64(body.image);
    if (body.image === 'data:') delete body.image;

    fetchRequest(`/api/goods${id ? '/' + id : ''}`, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      callback(err, data) {
        if (err) {
          renderModalErr(err);
          return;
        }
        form.reset();
        closeModal();

        if (list) {
          console.log(data)
          list.insertAdjacentHTML('beforeend', createRow(data));
          changeCursor(list);
        } else if (id) {
          updateRow(data.id, data);
        }

        getTotalPrice();
      },
    });

    const error = elems.modal.querySelector('.modal__label_file-error');
    if (error) {
      error.remove();
    }
  });
};

const showPreview = (target) => {
  const el = target.closest('.table__btn_pic').dataset.pic;
  const windowFeatures = `left=${screen.width / 2 - 400},top=${screen.height / 2 - 300},width=800,height=600`;
  const win = open('about:blank', '', windowFeatures);
  win.document.body.innerHTML = `
    <img style='width: 100%; height: 100%; object-fit: contain' src = ${address}/${el}>
  `
};

export const listControl = list => {
  list.addEventListener('click', evt => {
    const target = evt.target;
    const row = target.closest('tr');
    const currentId = row.dataset.id;

    if (target.closest('.table__btn_del')) {
      renderModalConfirm(elems.body, {text: "Вы хотите удалить товар?", btns: true});
      const modalConfirm = document.querySelector('.modal-add');
      delGoods(modalConfirm, row, currentId)
    } else if (target.closest('.table__btn_pic') && target.closest('.table__btn_pic').dataset.pic) {
      showPreview(target);
    } else if (target.closest('.table__btn_edit')) {
      fetchRequest(`/api/goods/${currentId}`, {
        callback(err, data) {
          openModal(err, data, list);
        },
      });
    }
  });
};

export const addButtonControl = (addButton, list) => {
  addButton.addEventListener('click', () => {
    openModal(null, null, list);
  });
};
