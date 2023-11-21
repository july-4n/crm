import {createRow} from './create.js';
import {tableBody} from './elements.js';

export const renderGoods = (arr) => {
  const list = arr.map((elem, i) => {
    return createRow(elem, i);
  }).join('');
  tableBody.textContent = '';
  tableBody.insertAdjacentHTML('afterbegin', list);
};
