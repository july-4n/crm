'use strict';

const goodsArr = [
  {
    'id': 1,
    'title': 'Смартфон Xiaomi 11T 8/128GB',
    'goodsID': '24601654816512',
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
    'id': 2,
    'title': 'Радиоуправляемый автомобиль Cheetan',
    'goodsID': '24601654816513',
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
    'id': 3,
    'title': 'ТВ приставка MECOOL KI',
    'goodsID': '24601654816514',
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
    'id': 4,
    'title': 'Витая пара PROConnect 01-0043-3-25',
    'goodsID': '24601654816515',
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

const modal = document.querySelector('.modal');
const modalTitle = modal.querySelector('.modal__title');
const modalForm = modal.querySelector('.modal__form');
const modalInputCheckbox = modal.querySelector('.modal__checkbox');
const modalInputDiscount = modal.querySelector('.modal__input_discount');
const overlay = document.querySelector('.overlay');
const tableBody = document.querySelector('.table__body');
const btnAdd = document.querySelector('.panel__add-goods');
const btnClose = document.querySelector('.modal__close');
const table = document.querySelector('.table');

overlay.classList.remove('active');

const createRow = (obj) => `
    <tr class="table__row">
      <td class="table__cell">${obj.id}</td>
      <td class="table__cell table__cell_left table__cell_name" data-id="${obj.goodsID}">
        <span class="table__cell-id">id: ${obj.goodsID}</span>
        ${obj.title}</td>
      <td class="table__cell table__cell_left">${obj.category}</td>
      <td class="table__cell">${obj.units}</td>
      <td class="table__cell">${obj.count}</td>
      <td class="table__cell">${obj.price}</td>
      <td class="table__cell">${obj.price * obj.count}</td>
      <td class="table__cell table__cell_btn-wrapper">
        <button class="table__btn table__btn_pic"></button>
        <button class="table__btn table__btn_edit"></button>
        <button class="table__btn table__btn_del"></button>
      </td>
    </tr>
  `;

const renderGoods = (arr) => {
  const list = arr.map(elem => {
    return createRow(elem);
  }).join('');
  tableBody.textContent = '';
  tableBody.insertAdjacentHTML('afterbegin', list);
};

renderGoods(goodsArr);

const closeModal = () => {
  overlay.classList.remove('active');
};

const openModal = () => {
  overlay.classList.add('active');
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

    console.log(goodsArr);
  }
});
