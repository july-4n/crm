import * as elems from './elements';
import {getNumberRow} from './utils';
import {getTotalPrice} from './getPrice';
import {closeModal} from './modal';
import {createRow} from './create';
import fetchRequest from './fetchRequest';
import initGoods from './render';
import renderModalErr from './modalError';

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
      id: vendorId,
    };

    fetchRequest('https://sore-wry-blade.glitch.me/api/goods', {
      method: 'POST',
      body: params,

      callback(err, data) {
        if (err) {
          console.warn(err, data);
          renderModalErr();
        } else {
          console.log(params);

          addGoodPage(newGood, list, vendorId);
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

export {
  addGoodForm,
}
