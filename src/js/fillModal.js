import fetchRequest from './fetchRequest';
import * as elems from './elements';
import {openModal, initCategory} from './modal';

const fillModal = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }

  elems.tableBody.addEventListener('click', ({target}) => {
    if (target.classList.contains('table__btn_edit')) {
      const cell = target.parentNode;
      const targetRow = cell.parentNode;
      const id = targetRow.querySelector('.table__cell_name').dataset.id;

      const goods = data.goods;
      const item = goods.find(el => el.id === id);

      console.log(item)
      openModal();
      elems.modalInputDiscount.setAttribute('disabled', '');
      elems.modalDiscountCheck.removeAttribute('checked');


      elems.modalName.value = item.title;
      elems.modalCategory.value = item.category;
      console.log(initCategory())
      initCategory();
      const selectDropdown = document.getElementById('category');

      selectDropdown.addEventListener('change', (event) => {
        const selectedOption = event.target.value;

        Array.from(selectDropdown.options).forEach(option => {
          option.style.display = 'block';
        });
      });


      elems.modalDescription.textContent = item.description;
      elems.modalUnits.value = item.units;
      elems.modalInputDiscount.value = item.discount;

      elems.modalCount.value = item.count;
      elems.modalPrice.value = item.price;
      elems.vendorModalId.textContent = item.id;

      if (item.discount > 0) {
        elems.modalInputDiscount.removeAttribute('disabled');
        elems.modalDiscountCheck.setAttribute('checked', '');
        let total = elems.modalCount.value * elems.modalPrice.value;
        total -= total * (item.discount / 100);
        elems.modalTotal.textContent = parseInt(total);
      } else {
        elems.modalTotal.textContent = parseInt(elems.modalCount.value * elems.modalPrice.value);
      }
    }
  });
}

const getDataModal = async () => {
  const goods = await fetchRequest('https://sore-wry-blade.glitch.me/api/goods', {
    callback: fillModal,
  });
};

getDataModal();
