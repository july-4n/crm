import fetchRequest from './fetchRequest';
import * as elems from './elements';
import {createRow} from './create';

const form = document.querySelector('.panel__search');
const searchInput = form.querySelector('.panel__input')

export const renderSearchList = (phrase) => fetchRequest(`https://sore-wry-blade.glitch.me/api/goods?page=1&search=${phrase}`, {

  callback(err, data) {
    if (err) {
      console.warn(err, data);
      return;
    }

    elems.tableBody.innerHTML = '';
    const goods = data.goods;
    const res = goods.map((el, i) => createRow(el, i)).join('');
    elems.tableBody.insertAdjacentHTML('beforeend', res);
  },
});

let timeoutId;

searchInput.addEventListener('input', () => {
  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    const searchQuery = searchInput.value;
    renderSearchList(searchQuery)
  }, 300);
  console.log(timeoutId)
});

