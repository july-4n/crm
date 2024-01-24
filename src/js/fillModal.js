import fetchRequest from './fetchRequest';
import * as elems from './elements';
import {renderModalAdd} from './modalConfirm';
import {getNumberRow} from './utils';
import initGoods from './render';
import renderModalErr from './modalError';
import {closeModal} from './modal';

const showPreview = (target) => {
  const el = target.closest('.table__btn_pic').dataset.pic;
  const windowFeatures = `left=${screen.width / 2 - 400},top=${screen.height / 2 - 300},width=800,height=600`;
  const win = open('about:blank', '', windowFeatures);
  win.document.body.innerHTML = `
    <img style='width: 100%; height: 100%; object-fit: contain' src = ${el}>
  `
};

const confirmModal = (id) => {
  const btns = document.querySelector('.modal-add__btns');
  const modalConfirm = document.querySelector('.modal-add');
  btns.addEventListener('click', ({target}) => {
    if (target.classList.contains('modal-add__btn--del')) {
      modalConfirm.remove();
      delGoods(id);
    } else if (target.classList.contains('modal-add__btn--cancel')) {
      modalConfirm.remove();
    }
  })
};

const fillModal = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }

  elems.tableBody.addEventListener('click', ({target}) => {
    if (target.closest('.table__btn_pic')) {
      showPreview(target);
    }

    const cell = target.parentNode;
    const targetRow = cell.parentNode;
    const id = targetRow.querySelector('.table__cell_name').dataset.id;
    const goods = data.goods;
    const item = goods.find(el => el.id === id);

    if (target.closest('.table__btn_del')) {
      console.log(id)
      renderModalAdd(elems.body, {text: "Вы хотите удалить товар?", btns: true});
      confirmModal(id);
      getNumberRow();
    }

    if (target.classList.contains('table__btn_edit')) {
      elems.overlay.classList.add('active');
      elems.modalTotal.textContent = 0;
      elems.modalInputDiscount.setAttribute('disabled', '');
      elems.modalDiscountCheck.removeAttribute('checked');
      elems.modalName.value = item.title;
      elems.modalCategory.value = item.category;
      elems.modalDescription.textContent = item.description;
      elems.modalUnits.value = item.units;
      elems.modalInputDiscount.value = item.discount;
      elems.modalCount.value = item.count;
      elems.modalPrice.value = item.price;
      elems.vendorModalId.textContent = item.id;

      if (item.discount > 0) {
        elems.modalInputDiscount.removeAttribute('disabled');
        elems.modalDiscountCheck.setAttribute('checked', '');
        let total = elems.modalCount.value * elems.modalPrice.value;
        total -= total * (item.discount / 100);
        elems.modalTotal.textContent = parseInt(total);
      } else {
        elems.modalTotal.textContent = parseInt(elems.modalCount.value * elems.modalPrice.value);
      }
    }
  });
}

const getDataModal = async () => {
  await fetchRequest('https://sore-wry-blade.glitch.me/api/goods?page=2', {
    callback: fillModal,
  });
  // initGoods();
};

const delGoods = async (id) => {
  await fetchRequest(`https://sore-wry-blade.glitch.me/api/goods/${id}`, {
    method: 'DELETE',
    callback: fillModal,
  });
  initGoods();
};

const editGoodForm = (form, list) => {
  form.addEventListener('submit', evt => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const editGood = Object.fromEntries(formData);
    const id = elems.vendorModalId.textContent;
    console.log(editGood)
    const params = {
      title: editGood.title,
      description: editGood.description,
      price: editGood.price,
      count: editGood.count,
      units: editGood.units,
      category: editGood.category,
    };

    fetchRequest(`https://sore-wry-blade.glitch.me/api/goods/${id}`, {
      method: 'PATCH',
      body: params,

      callback(err, data) {
        if (err) {
          renderModalErr();
        } else {
          console.log(params);

          addGoodPage(editGood, list, id);
          getNumberRow();
          getTotalPrice();
        }
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    closeModal();
    initGoods();
  });
};

getDataModal();
editGoodForm(elems.modalForm, elems.tableBody);
