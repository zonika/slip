var components = document.querySelectorAll('[data-uri]');

components.forEach(addEvent);

addHierarchyClass();

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
  if (e.altKey || e.shiftKey) {
    e.stopPropagation();
    e.preventDefault();
    var opts;

    opts = { url: `http://${this.getAttribute('data-uri')}${e.altKey ? '.json' : ''}` };
    chrome.runtime.sendMessage(opts);
  }
}
