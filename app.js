const input = document.querySelector('input');
const preview = document.querySelector('.preview');
const dropzone = document.querySelector('.dropzone');
input.style.opacity = 0;

function updateImageDisplay() {
  // ** right since this function is responsible for updating our preview we need to make sure the preview is clean and new after each change, so the function does exactly that.
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  // ** next we store the file object we get back after each change
  let curFile = input.files;
  console.log(curFile);
  // ** here the if condition will check for several parameters
  if (curFile.length === 0) {
    let para = document.createElement('p');
    para.textContent = 'No file was Selected, try Again';
    preview.appendChild(para);
  } else {
    let list = document.createElement('ol');
    preview.appendChild(list);

    for (let file of curFile) {
      let listitem = document.createElement('li');
      let para = document.createElement('p');
      if (validFileType(file)) {
        para.textContent = `File name is ${file.name},file type ${
          file.type
        }, with a size of ${returnFileSize(file.size)}.`;

        // ** Now we deal with the image and url
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);
        listitem.appendChild(image);
        listitem.appendChild(para);
      } else {
        para.textContent = 'FileType Invalid, please choose the proper file';
        listitem.appendChild(para);
      }

      list.appendChild(listitem);
    }
  }
}

const fileTypes = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon',
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}
function returnFileSize(number) {
  if (number < 1024) {
    return number + 'bytes';
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + 'KB';
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + 'MB';
  }
}

dropzone.addEventListener(
  'dragover',
  function (event) {
    event.preventDefault();
  },
  true
);
dropzone.addEventListener(
  'drop',
  function (event) {
    event.preventDefault();
    // Ready to do something with the dropped object
  },
  true
);

input.addEventListener('change', updateImageDisplay);
