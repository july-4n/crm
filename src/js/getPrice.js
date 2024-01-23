import {table, totalPrice} from './elements';

export const getTotalPrice = () => {
  const allGoods = table.querySelectorAll('[data-total-good]');
  const total = [...allGoods].reduce(function(acc, val) {
    return acc + parseInt(val.dataset.totalGood)
  }, 0);

  totalPrice.textContent = total;
};
