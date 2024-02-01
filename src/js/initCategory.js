import fetchRequest from './fetchRequest';
import {categoryList} from './elements';
import {renderModalErr} from './modalError.js';

const createOption = (text) => {
  const option = document.createElement('option');
  option.textContent = text;
  option.value = text;
  return option;
};

const createFirstOption = () => {
  return createOption('');
}

const renderCategory = (err, data) => {
  if (err) {
    renderModalErr();
    return;
  }

  const categories = data.map(el => {
    const option = createOption(el);
    option.value = el;

    return option;
  });
  return categories;
};

const initCategory = async () => {
  const categories = await fetchRequest(`/api/categories`, {
    callback: renderCategory,
  });

  const firstOption = createFirstOption();
  categoryList.innerHTML = '';
  categoryList.append(firstOption)
  categoryList.append(...categories)
};

export default initCategory;
