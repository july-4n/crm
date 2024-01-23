import {createRow} from './create';
import {tableBody} from './elements';
import fetchRequest from './fetchRequest';
import {getTotalPrice} from './getPrice';


export const renderGoods = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }

  const goods = data.goods.map((elem, i) => {
    return createRow(elem, i);
  }).join('');
  return goods;
};

const initGoods = async () => {
  const goods = await fetchRequest('https://sore-wry-blade.glitch.me/api/goods', {
    callback: renderGoods,
  });

  tableBody.textContent = '';
  tableBody.insertAdjacentHTML('afterbegin', goods);
  getTotalPrice();
};

initGoods();

export default initGoods;
