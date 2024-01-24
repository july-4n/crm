import {modalForm, tableBody} from './js/elements.js';
import {addGoodForm} from './js/addGoods.js';
import './js/render';
import './js/modal';
import './js/search';
import './js/fillModal';
import initCategory from './js/initCategory.js';
import './js/modalError.js'

import './css/index.css';

addGoodForm(modalForm, tableBody);
initCategory();

