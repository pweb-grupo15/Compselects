const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const fileSelect = document.getElementById('file-select');
const preview = document.getElementById('preview');

// Clica no texto e abre o file picker
fileSelect.addEventListener('click', () => fileInput.click());

// Quando arquivo for selecionado pelo picker
fileInput.addEventListener('change', handleFiles);

// Drag events
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, e => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.add('highlight');
  }, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, e => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.remove('highlight');
  }, false);
});

dropArea.addEventListener('drop', e => {
  const files = e.dataTransfer.files;
  handleFiles({ target: { files } });
});

function handleFiles(e) {
  const files = e.target.files;
  if (files.length) {
    preview.innerHTML = ''; // limpa preview anterior
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (file.type.startsWith('image/')) {
          const img = document.createElement('img');
          img.src = reader.result;
          preview.appendChild(img);
        } else {
          const div = document.createElement('div');
          div.textContent = `Arquivo: ${file.name}`;
          preview.appendChild(div);
        }
      };
      reader.readAsDataURL(file);
    });
  }
}