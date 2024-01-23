import * as elems from './elements';
import {getNumberRow} from './utils';
import {getTotalPrice} from './getPrice';
import {closeModal} from './modal';
import {createRow} from './create';
import {renderModalAdd} from './modalConfirm';
import fetchRequest from './fetchRequest';
import initGoods from './render';

elems.table.addEventListener('click', (evt) => {
  if (evt.target.closest('.table__btn_pic')) {
    const el = evt.target.closest('.table__btn_pic').dataset.pic;
    const windowFeatures = `left=${screen.width / 2 - 400},top=${screen.height / 2 - 300},width=800,height=600`;
    const win = open('about:blank', '', windowFeatures);
    win.document.body.innerHTML = `
      <img style='width: 100%; height: 100%; object-fit: contain' src = ${el}>
    `
  };
});

const confirmModal = (evt) => {
  const btns = document.querySelector('.modal-add__btns');
  const modalConfirm = document.querySelector('.modal-add');
  btns.addEventListener('click', ({target}) => {
    if (target.classList.contains('modal-add__btn--del')) {
      modalConfirm.remove();
      const row = evt.target.closest('.table__row').remove();
    } else if (target.classList.contains('modal-add__btn--cancel')) {
      modalConfirm.remove();
    }
  })
};

elems.table.addEventListener('click', evt => {
  if (evt.target.closest('.table__btn_del')) {
    renderModalAdd(elems.body, {text: "Вы хотите удалить товар?", btns: true});
    confirmModal(evt);


    // goodsArr.splice(row, 1);
    getNumberRow();
  }
});

const addGoodPage = (el, list, id) => {
  el.id = id;
  list.insertAdjacentHTML('beforeend', createRow(el));
};

const addGoodForm = (form, list) => {
  form.addEventListener('submit', evt => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const newGood = Object.fromEntries(formData);
    const vendorId = elems.vendorModalId.textContent;
    const params = {
      title: newGood.title,
      description: newGood.description,
      price: newGood.price,
      count: newGood.count,
      units: newGood.units,
      category: newGood.category,
    };
    console.log(params)

    fetchRequest('https://sore-wry-blade.glitch.me/api/goods', {
      method: 'POST',
      body: params,

      callback(err, data) {
        if (err) {
          console.log('err');
        } else {
        console.log('ok');
        console.log(params);

        addGoodPage(newGood, list, vendorId);
        // initGoods();

        getNumberRow();
        getTotalPrice();
        }
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // form.reset();
    closeModal();
    initGoods();
  });
};

// для проверки добавлен ли товар
const getGood = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }
  console.log(data)
}

const getNewGood = async () => {
  const newGood = await fetchRequest('https://sore-wry-blade.glitch.me/api/goods/4644327664', {
    callback: getGood,
  });
  await fetch('https://sore-wry-blade.glitch.me/api/goods')
};
getNewGood();

export {
  addGoodForm,
}
