export const createRow = (obj, i) => {
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
