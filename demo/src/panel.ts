const togglablePanel = (open: boolean, purpose: string) => {
  const elem = document.createElement("div");
  elem.classList.add("panel");
  if (open) elem.classList.add("open");

  const toggle = document.createElement("button");
  toggle.innerText = `open ${purpose}`;

  //parent.appendChild(elem);

  toggle.addEventListener("click", () => {
    open = !open;
    if (open) {
      toggle.innerText = `close ${purpose}`;
      elem.classList.add("open");
    } else {
      toggle.innerText = `open ${purpose}`;
      elem.classList.remove("open");
    }
  });

  return [elem, toggle];
};

export { togglablePanel };
