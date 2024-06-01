export type OnChange = (name: string, val: boolean | string | number) => void;

const trueFalseCheckbox = (name: string, val: boolean, parent: HTMLElement, onchange: OnChange) => {
  const fieldset = document.createElement('fieldset');
  const field = document.createElement('input');
  field.type = 'checkbox';

  if (val) field.checked = true;

  const label = document.createElement('label');
  label.innerText = name;

  field.addEventListener('change', () => {
    if (field.checked) {
      onchange(name, true);
    } else {
      onchange(name, false);
    }
  });
  fieldset.appendChild(label);
  fieldset.appendChild(field);
  parent.appendChild(fieldset);
};

const inputRange = (
  name: string,
  val: number,
  parent: HTMLElement,
  onchange: OnChange,
  min?: number,
  max?: number,
  step?: number
) => {
  const fieldset = document.createElement('fieldset');
  const field = document.createElement('input');
  field.type = 'range';
  if (min) field.min = `${min}`;
  if (max) field.max = `${max}`;
  if (step) field.step = `${step}`;
  field.value = `${val}`;

  const label = document.createElement('label');
  label.innerText = name;

  field.addEventListener('change', () => {
    label.innerText = name + ' ' + field.value;
    onchange(name, parseFloat(field.value));
  });
  fieldset.appendChild(label);
  fieldset.appendChild(field);
  parent.appendChild(fieldset);
};

const textarea = (name: string, val: string, parent: HTMLElement, onchange: OnChange) => {
  const field = document.createElement('textarea');
  field.value = val;
  field.addEventListener('input', () => onchange(name, field.value));
  parent.appendChild(field);
};

const button = (name: string, parent: HTMLElement, onchange: OnChange) => {
  const button = document.createElement('button');
  button.innerText = name;
  button.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    onchange(name, 'click');
  });
  parent.appendChild(button);
};

export { trueFalseCheckbox, inputRange, textarea, button };
