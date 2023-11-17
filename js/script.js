'use strict';

const goodsArr = [
  {
    'vendorId': '254365',
    'name': 'Смартфон Xiaomi 11T 8/128GB',
    'price': 27000,
    'description': 'Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.',
    'category': 'Мобильные телефоны',
    'discont': false,
    'count': 3,
    'units': 'шт',
    'images': {
      'small': 'img/smrtxiaomi11t-m.jpg',
      'big': 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    'vendorId': '254875',
    'name': 'Радиоуправляемый автомобиль Cheetan',
    'price': 4000,
    'description': 'Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет',
    'category': 'Игрушки',
    'discont': 5,
    'count': 1,
    'units': 'шт',
    'images': {
      'small': 'img/cheetancar-m.jpg',
      'big': 'img/cheetancar-b.jpg',
    },
  },
  {
    'vendorId': '254376',
    'name': 'ТВ приставка MECOOL KI',
    'price': 12400,
    'description': 'Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D',
    'category': 'ТВ приставки',
    'discont': 15,
    'count': 4,
    'units': 'шт',
    'images': {
      'small': 'img/tvboxmecool-m.jpg',
      'big': 'img/tvboxmecool-b.jpg',
    },
  },
  {
    'vendorId': '354369',
    'name': 'Витая пара PROConnect 01-0043-3-25',
    'price': 22,
    'description': 'Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.',
    'category': 'Кабеля',
    'discont': false,
    'count': 420,
    'units': 'шт',
    'images': {
      'small': 'img/lan_proconnect43-3-25.jpg',
      'big': 'img/lan_proconnect43-3-25-b.jpg',
    },
  },
];

const cms = document.querySelector('.cms');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const table = cms.querySelector('.table');
const totalPrice = cms.querySelector('.cms__total-price');
const btnAdd = cms.querySelector('.panel__add-goods');
const modalTitle = modal.querySelector('.modal__title');
const modalForm = modal.querySelector('.modal__form');
const modalInputs = modal.querySelectorAll('.modal__input');
const modalInputCheckbox = modal.querySelector('.modal__checkbox');
const modalInputDiscount = modal.querySelector('.modal__input_discount');
const btnClose = modal.querySelector('.modal__close');
const vendorModalId = modal.querySelector('.vendor-code__id');
const modalTotal = modal.querySelector('.modal__total-price');
const modalCount = modal.querySelector('#count');
const modalPrice = modal.querySelector('#price');
const tableBody = table.querySelector('.table__body');

overlay.classList.remove('active');

const addGoodData = el => {
  goodsArr.push(el);
};

const generateRandomId = () => Math.floor(Math.random() * 1_000_000);

const createRow = (obj, i) => {
  return `
    <tr class="table__row">
      <td class="table__cell">${i+1}</td>
      <td class="table__cell table__cell_left table__cell_name" data-id="${obj.vendorId}">
        <span class="table__cell-id">id: ${obj.vendorId}</span>
        ${obj.name}</td>
      <td class="table__cell table__cell_left">${obj.category}</td>
      <td class="table__cell">${obj.units}</td>
      <td class="table__cell">${obj.count}</td>
      <td class="table__cell">${obj.price}</td>
      <td class="table__cell" data-total-good ='${obj.price * obj.count}'>${obj.price * obj.count}</td>
      <td class="table__cell table__cell_btn-wrapper">
        <button class="table__btn table__btn_pic"></button>
        <button class="table__btn table__btn_edit"></button>
        <button class="table__btn table__btn_del"></button>
      </td>
    </tr>
  `;
}

const renderGoods = (arr) => {
  const list = arr.map((elem, i) => {
    return createRow(elem, i);
  }).join('');
  tableBody.textContent = '';
  tableBody.insertAdjacentHTML('afterbegin', list);
};

renderGoods(goodsArr);

const getNumberRow = () => {
  const rows = table.querySelectorAll('.table__row');

  [...rows].map((el, i) => {
    const cell = el.querySelector('.table__cell');
    cell.textContent = i + 1;
  });
}

const closeModal = () => {
  overlay.classList.remove('active');
};

const openModal = () => {
  overlay.classList.add('active');
  modalTotal.textContent = 0;
  vendorModalId.textContent = generateRandomId();
};

overlay.addEventListener('click', (evt) => {
  if (evt.target === overlay || evt.target.closest('.modal__close')) {
    closeModal();
  }
});

btnAdd.addEventListener('click', openModal);

table.addEventListener('click', (evt) => {
  if (evt.target.closest('.table__btn_del')) {
    const row = evt.target.closest('.table__row').remove();

    goodsArr.splice(row, 1);
    getNumberRow();

    console.log(goodsArr);
  }
});

modal.addEventListener('change', evt => {
  if (evt.target.closest('.modal__checkbox')) {
    if (!modalInputCheckbox.checked) {
      modalInputDiscount.value = '';
      modalInputDiscount.setAttribute('disabled', '');
    } else {
      modalInputDiscount.removeAttribute('disabled');
    }
  }
});

const getModalTotal = () => {
  modalTotal.textContent = parseInt(modalCount.value * modalPrice.value);
}

modal.addEventListener('change', getModalTotal);

const getTotalPrice = () => {
  const allGoods = table.querySelectorAll('[data-total-good]');
  const total = [...allGoods].reduce(function(acc, val) {
    return acc + parseInt(val.dataset.totalGood)
  }, 0);

  totalPrice.textContent = total;
};

getTotalPrice();

const addRequiredAttr = inputs => {
  inputs.forEach(el => {
    el.setAttribute('required', '');
  });
};

addRequiredAttr(modalInputs);

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

addGoodForm(modalForm, tableBody);
