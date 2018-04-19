var components = document.querySelectorAll('[data-uri]'),
  pageUri = document.querySelector('html').getAttribute('data-uri'),
  hiddenInput = document.createElement('input'),
  keyStroke = '',
  selectedComponent,
  hiddenInput;

hiddenInput.classList.add('slip-hidden-input');
document.querySelector('body').appendChild(hiddenInput);

components.forEach(addEvent);
addHierarchyClass();

document.addEventListener('keydown', getKeyInput);
document.addEventListener('keyup', evaluateKeystroke);

function evaluateKeystroke(e) {
  if (keystroke === e.key) {
    return;
  }

  if (e.key === 'p') {
    hiddenInput.value = pageUri;
  } else if (e.key === 'c' && selectedComponent) {
    hiddenInput.value = selectedComponent.getAttribute('data-uri');
  }

  if (keystroke === 'y') {
    copyInput();
    keystroke = '';
  } else if (keystroke === 'o') {
    uri = hiddenInput.value;
    opts = { url: `http://${uri}` };
    chrome.runtime.sendMessage(opts);
    keystroke = '';
  }
}

function getKeyInput(e) {
  if (e.key === 'y') {
    keystroke = 'y';
  } else if (e.key === 'o') {
    keystroke = 'o';
  }
}

function copyInput() {
  hiddenInput.select();
  document.execCommand('copy');
  hiddenInput.blur();
}

function addEvent(el) {
  el.addEventListener('click', clickEvent);
}

function addHierarchyClass() {
  let lastElem,
    i = 0;

  components.forEach(function(el) {
    if (lastElem && el.parentNode !== lastElem.parentNode) {
      i += 1;
    }
    el.classList.add(`color-${i % 5}`);
    lastElem = el;
  });
}

function clickEvent(e) {
  e.stopPropagation();
  e.preventDefault();
  var uri = this.getAttribute('data-uri');

  if (selectedComponent) {
    selectedComponent.classList.toggle('slip-selected');
  }

  selectedComponent = this;
  selectedComponent.classList.add('slip-selected');
  hiddenInput.value = uri;

  if (e.altKey || e.shiftKey) {
    var opts;

    opts = { url: `http://${uri}${e.altKey ? '.json' : ''}` };
    chrome.runtime.sendMessage(opts);
  }
}
