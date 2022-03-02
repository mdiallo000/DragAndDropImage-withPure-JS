const input = document.querySelector('input');
const preview = document.querySelector('.preview');
const dropzone = document.querySelector('.dropzone');
input.style.opacity = 0;
const canvas = document.querySelector('canvas');
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
// ************************************************************************************************************************************************************************************************************************

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
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    let curFile = event.dataTransfer.files;
    console.log(curFile);

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

          const image = document.createElement('img');
          image.src = URL.createObjectURL(file);
          listitem.appendChild(image);
          listitem.appendChild(para);

          // ** Here is code to manipulate the image we get
          var MAX_WIDTH = 800;
          var MAX_HEIGHT = 600;
          var width = image.width;
          var height = image.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;

          let ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, width, height);
          var imgData = ctx.createImageData(width, height);
          var data = imgData.data;
          var pixels = ctx.getImageData(0, 0, width, height);
          for (var i = 0, ii = pixels.data.length; i < ii; i += 4) {
            var r = pixels.data[i + 0];
            var g = pixels.data[i + 1];
            var b = this.pixels.data[i + 2];
            data[i + 0] = r * 0.393 + g * 0.769 + b * 0.189;
            data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
            data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
            data[i + 3] = 255;
          }
          ctx.putImageData(imgData, 0, 0);
        } else {
          para.textContent = 'FileType Invalid, please choose the proper file';
          listitem.appendChild(para);
        }

        list.appendChild(listitem);
      }
    }
  },
  true
);

input.addEventListener('change', updateImageDisplay);
