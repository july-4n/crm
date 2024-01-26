import * as elems from './elements';

// export const generateRandomId = () => Math.floor(Math.random() * 1_000_000);

export  const getNumberRow = () => {
  const rows = elems.table.querySelectorAll('.table__row');

  [...rows].map((el, i) => {
    const cell = el.querySelector('.table__cell');
    cell.textContent = i + 1;
  });
}
