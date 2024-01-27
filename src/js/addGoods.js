import * as elems from './elements';
import {getNumberRow} from './utils';
import {getTotalPrice} from './getPrice';
import {closeModal} from './modal';
import fetchRequest from './fetchRequest';
import initGoods from './render';
import renderModalErr from './modalError';

const addGoodForm = () => {
  elems.modalForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const newGood = Object.fromEntries(formData);
    console.log(newGood)
    const params = {
      title: newGood.title,
      description: newGood.description,
      price: newGood.price,
      count: newGood.count,
      units: newGood.units,
      category: newGood.category,
      image: `image/${newGood.image.name}`,
    };
    console.log(params.image)

    fetchRequest('https://sore-wry-blade.glitch.me/api/goods?page=2', {
      method: 'POST',
      body: params,

      callback(err, data) {
        if (err) {
          console.warn(err, data);
          // renderModalErr();
        } else {
          console.log(params);
          closeModal();
          initGoods();
          getNumberRow();
          getTotalPrice();
        }
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
};

const editGoodForm = () => {
  elems.modalForm.addEventListener('submit', evt => {
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
      id: editGood.id,
      image: editGood.image,
    };

    fetchRequest(`https://sore-wry-blade.glitch.me/api/goods/${id}`, {
      method: 'PATCH',
      body: params,

      callback(err, data) {
        if (err) {
          // renderModalErr();
          console.warn(err, data);
        } else {
          console.log(params);
          initGoods();
          getNumberRow();
          getTotalPrice();
        }
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    closeModal();
  });
};

export {
  addGoodForm,
  editGoodForm
}
