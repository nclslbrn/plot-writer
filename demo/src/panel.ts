const togglablePanel = (open: boolean, openText: string, closeText: string) => {
  const elem = document.createElement('div');
  elem.classList.add('panel');
  if (open) elem.classList.add('open');

  const toggle = document.createElement('button');
  toggle.innerText = openText;

  toggle.addEventListener('click', () => {
    open = !open;
    if (open) {
      toggle.innerText = closeText;
      elem.classList.add('open');
    } else {
      toggle.innerText = openText;
      elem.classList.remove('open');
    }
  });

  return [elem, toggle];
};

export { togglablePanel };
