import * as elems from './elements';
import {address} from './fetchRequest.js';

const maxFileSize = 1048576;
const delSvg = `
  <div class="image-container__overlay">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="ic:outline-delete-forever">
    <path id="Vector" d="M23.5334 17.45L20 20.9833L16.45 17.45L14.1 19.8L17.65 23.3333L14.1167 26.8667L16.4667 29.2167L20 25.6833L23.5334 29.2167L25.8834 26.8667L22.35 23.3333L25.8834 19.8L23.5334 17.45ZM25.8334 6.66667L24.1667 5H15.8334L14.1667 6.66667H8.33337V10H31.6667V6.66667H25.8334ZM10 31.6667C10 33.5 11.5 35 13.3334 35H26.6667C28.5 35 30 33.5 30 31.6667V11.6667H10V31.6667ZM13.3334 15H26.6667V31.6667H13.3334V15Z" fill="white"/>
    </g>
    </svg>
  </div>
`
export const renderPreview = (data) => {
  return ` <img class="modal__label_file-add" ${data && data.image && data.image !== 'image/notimage.jpg' ? `src="${address}/${data.image}"` : ''}>`
}

export const fileControl = (data) => {
  const fileErrorMessage = document.createElement('p');
  const containerPreview = elems.modalFieldset.querySelector('.image-container');

  elems.file.addEventListener('change', () => {
    if (elems.file.files.length > 0) {
      const selectedFile = elems.file.files[0];
      const src = URL.createObjectURL(selectedFile);

      if (selectedFile.size <= maxFileSize) {
        console.log(selectedFile.size)
        fileErrorMessage.remove();
        containerPreview.innerHTML = '';

        const preview = renderPreview(data);
        containerPreview.innerHTML = preview;
        const modalPreview = containerPreview.querySelector('.modal__label_file-add');
        modalPreview.src = src;
        containerPreview.style.display = 'block';
        containerPreview.insertAdjacentHTML('beforeend', delSvg);
      } else {
        fileErrorMessage.classList.add('modal__label_file-error');
        fileErrorMessage.textContent = "изображение не должно превышать размер 1мб";
        elems.modalFieldset.append(fileErrorMessage);
        if (containerPreview) {
          containerPreview.remove();
        }
      }
    }
  })

  document.addEventListener('click', ({target}) => {
    if (target.closest('.image-container__overlay svg')) {
      containerPreview.remove();
      elems.file.value = '';
    }
  });
};
