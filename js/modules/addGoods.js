import {table} from './elements.js';
import {getTotalPrice} from './getPrice.js';
import {closeModal} from './modal.js';
import {createRow} from './create.js';
import {goodsArr} from './data.js';
import {renderGoods} from './render.js';

renderGoods(goodsArr);
getTotalPrice();

const getNumberRow = () => {
  const rows = table.querySelectorAll('.table__row');

  [...rows].map((el, i) => {
    const cell = el.querySelector('.table__cell');
    cell.textContent = i + 1;
  });
}

table.addEventListener('click', (evt) => {
  if (evt.target.closest('.table__btn_pic')) {
    const el = evt.target.closest('.table__btn_pic').dataset.pic;
    const windowFeatures = `left=${screen.width / 2 - 400},top=${screen.height / 2 - 300},width=800,height=600`;
    const win = open('about:blank', '', windowFeatures);
    win.document.body.innerHTML = `
      <img style='width: 100%; height: 100%; object-fit: cover' src = ${el}>
    `
  };
});

table.addEventListener('click', (evt) => {
  if (evt.target.closest('.table__btn_del')) {
    const row = evt.target.closest('.table__row').remove();

    goodsArr.splice(row, 1);
    getNumberRow();
  }
});

const addGoodData = el => {
  goodsArr.push(el);
};

const addGoodPage = (el, list) => {
  list.insertAdjacentHTML('beforeend', createRow(el));
};

const addGoodForm = (form, list) => {
  form.addEventListener('submit', evt => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const newGood = Object.fromEntries(formData);

    addGoodPage(newGood, list);
    addGoodData(newGood);
    getNumberRow();
    getTotalPrice();

    form.reset();
    closeModal();
  });
};

export {
  addGoodForm,
}
