export default function Page1() {
  const COL_MAX = 5;
  const ROW_MAX = 5;

  function textIntoInput(event) {
    const tdElem = event.currentTarget;
    console.log(tdElem);
    const textNode = tdElem.childNodes[0];
    const text = textNode.textContent;
    const input = document.createElement("input");
    input.value = text;
    input.addEventListener("blur", inputIntoText);
    tdElem.removeChild(textNode);
    tdElem.appendChild(input);
    tdElem.removeEventListener("click", textIntoInput);
    input.focus();
  }

  function inputIntoText(event) {
    const input = event.currentTarget;
    const value = input.value;
    const textNode = document.createTextNode(value);
    const td = input.parentNode;
    td.removeChild(input);
    td.appendChild(textNode);
  }

  return {
    type: "table",
    children: [
      {
        type: "tbody",
        children: Array.from({ length: ROW_MAX }, (_, i) => ({
          type: "tr",
          children: Array.from({ length: COL_MAX }, (_, j) => ({
            type: "td",
            events: {
              click: [textIntoInput],
            },
            children: ["Default"],
          })),
        })),
      },
    ],
  };
}
