import {totalPrice} from './elements';

export const calculateWithDiscount = (good) => {
  return good.price - good.discount * good.price / 100;
};

export const calculateTotalPrice = (goods) => {
  const total = goods.reduce(function(acc, good) {
    return acc + calculateWithDiscount(good) * good.count
  }, 0);

  totalPrice.textContent = total;
};
