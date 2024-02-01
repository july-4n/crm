import initGoods from './js/render';
import {tableBody, btnAdd} from './js/elements.js';
import {listControl, addButtonControl} from './js/controls.js';
import './js/render';
import './js/modal';
import './js/search';
import initCategory from './js/initCategory.js';
import './js/modalError.js'

import './css/index.css';


initGoods();
initCategory();
listControl(tableBody);
addButtonControl(btnAdd, tableBody);
