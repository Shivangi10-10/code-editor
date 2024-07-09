// Theme toggle function
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  updateEditorThemes();
}

// Update CodeMirror themes based on current mode
function updateEditorThemes() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  const theme = isDarkMode ? 'dracula' : 'default';
  
  htmlEditor.setOption('theme', theme);
  cssEditor.setOption('theme', theme);
  jsEditor.setOption('theme', theme);
}

// Share code via WhatsApp
function shareViaWhatsApp(code) {
  const encodedCode = encodeURIComponent(code);
  window.open(`https://wa.me/?text=${encodedCode}`, '_blank');
}

// Download code as file
function downloadFile(filename, content) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function run() {
  let htmlCode = htmlEditor.getValue();
  let cssCode = "<style>" + cssEditor.getValue() + "</style>";
  let jsCode = jsEditor.getValue();
  let output = document.querySelector(".editor #output");
  output.contentDocument.body.innerHTML = htmlCode + cssCode;
  output.contentWindow.eval(jsCode);
}

// CodeMirror integration
let htmlEditor = CodeMirror.fromTextArea(document.getElementById("html-code"), {
  mode: "xml",
  theme: "default",
  lineNumbers: true,
  autoCloseTags: true
});

let cssEditor = CodeMirror.fromTextArea(document.getElementById("css-code"), {
  mode: "css",
  theme: "default",
  lineNumbers: true,
  autoCloseTags: true
});

let jsEditor = CodeMirror.fromTextArea(document.getElementById("js-code"), {
  mode: "javascript",
  theme: "default",
  lineNumbers: true,
  autoCloseTags: true
});

htmlEditor.on("change", run);
cssEditor.on("change", run);
jsEditor.on("change", run);

// Event listeners for share and download buttons
document.querySelectorAll('.actions .fas.fa-share-alt').forEach(button => {
  button.addEventListener('click', function() {
    const card = this.closest('.card');
    const editor = card.querySelector('.CodeMirror').CodeMirror;
    shareViaWhatsApp(editor.getValue());
  });
});

document.querySelectorAll('.actions .fas.fa-download').forEach(button => {
  button.addEventListener('click', function() {
    const card = this.closest('.card');
    const editor = card.querySelector('.CodeMirror').CodeMirror;
    const filename = card.querySelector('h3').textContent.toLowerCase() + '.txt';
    downloadFile(filename, editor.getValue());
  });
});

// Initial run
run();