import {createRow} from './create';
import {tableBody} from './elements';
import fetchRequest from './fetchRequest';
import {calculateTotalPrice} from './getPrice';

export const changeCursor = (form) => {
  if (form) {
    const elems = form.querySelectorAll('.table__btn_pic');
    elems.forEach(el => {
      if (el.dataset.pic === 'image/notimage.jpg') {
        el.style.pointerEvents = 'none';
      }
    })
  }
}

const renderGoods = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }

  const goods = data.goods.map((elem) => {
    return createRow(elem);
  }).join('');
  calculateTotalPrice(data.goods);
  return goods;
};

const initGoods = async () => {
  const goods = await fetchRequest(`/api/goods`, {
    callback: renderGoods,
  });

  tableBody.textContent = '';
  tableBody.insertAdjacentHTML('afterbegin', goods);
  changeCursor(tableBody);
};

export default initGoods;
