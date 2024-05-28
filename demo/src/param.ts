export type OnChange = (name: string, val: boolean | string | number) => void;

const trueFalseCheckbox = (
  name: string,
  val: boolean,
  parent: HTMLElement,
  onchange: OnChange,
) => {
  const field = document.createElement("input");
  field.type = "checkbox";

  if (val) field.checked = true;

  const label = document.createElement("label");
  label.innerText = name;

  field.addEventListener("change", () => {
    if (field.checked) {
      onchange(name, true);
    } else {
      onchange(name, false);
    }
  });
  parent.appendChild(label);
  parent.appendChild(field);
};

const inputRange = (
  name: string,
  val: number,
  parent: HTMLElement,
  onchange: OnChange,
  min?: number,
  max?: number,
  step?: number,
) => {
  const field = document.createElement("input");
  field.type = "range";
  field.value = `${val}`;
  if (min) field.min = `${min}`;
  if (max) field.max = `${max}`;
  if (step) field.step = `${step}`;

  const label = document.createElement("label");
  label.innerText = name;

  field.addEventListener("change", () =>
    onchange(name, parseFloat(field.value)),
  );
  parent.appendChild(label);
  parent.appendChild(field);
};

const textarea = (
  name: string,
  val: string,
  parent: HTMLElement,
  onchange: OnChange,
) => {
  const field = document.createElement("textarea");
  field.value = val;

  field.addEventListener("input", () => onchange(name, field.value));
  parent.appendChild(field);
};

export { trueFalseCheckbox, inputRange, textarea };
