const createModalAdd = (obj) => {
  const modal = document.createElement('div');
  modal.classList.add('modal-add', 'is-visible');

  modal.insertAdjacentHTML('beforeend', `
    <div class='modal-add__wrapper'>
      <div class='modal-add__overlay'></div>
      ${obj.svg ?
        `<div class='modal-add__icon'>
          <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62" fill="none">
            <g clip-path="url(#clip0_0_1327)">
              <path d="M23.2618 41.8332L12.4285
                30.9999L8.81738 34.611L23.2618
                49.0554L54.2142 18.1031L50.6031 14.4919L23.2618 41.8332Z"
                fill="white"/>
            </g>
          </svg>
        </div>` : ''}
      <div class='modal-add__content'>
        <p class='modal-add__text'>${obj.text}</p>
        ${obj.btns ?
          `<div class="modal-add__btns">
            <button type='button' class='modal-add__btn modal-add__btn--del'>Удалить</button>
            <button type='button' class='modal-add__btn modal-add__btn--cancel'>Отменить</button>
          </div>
          ` : ''}
      </div>
    </div>
  `);

  return modal;
};

const renderModalAdd = (body, obj) => {
  const modal = createModalAdd(obj);
  body.classList.add('overflow');
  body.append(modal);
  return modal;
};

export {
  renderModalAdd,
};
