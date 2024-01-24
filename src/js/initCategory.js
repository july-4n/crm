import fetchRequest from './fetchRequest';
import * as elems from './elements';
import renderModalErr from './modalError';

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
  const categories = await fetchRequest('https://sore-wry-blade.glitch.me/api/categories', {
    callback: renderCategory,
  });

  const firstOption = createFirstOption();
  elems.categoryList.innerHTML = '';
  elems.categoryList.append(firstOption)
  elems.categoryList.append(...categories)
};

export default initCategory;
