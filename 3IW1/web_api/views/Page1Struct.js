export default function Page1Struct() {
  const MAX_TR = 5;
  const MAX_TD = 5;
  const data = JSON.parse(localStorage.getItem("karl")) || {};

  function textIntoInput(event) {
    const td = event.currentTarget;
    const textNode = td.childNodes[0];
    const text = textNode.textContent;
    const input = document.createElement("input");
    input.value = text;
    td.removeChild(textNode);
    td.appendChild(input);
    td.removeEventListener("click", textIntoInput);
    input.focus();
    input.addEventListener("blur", function (event) {
      const input = event.currentTarget;
      const text = input.value;
      const td = input.parentNode;
      const textNode = document.createTextNode(text);
      //td.removeChild(input);
      //td.appendChild(textNode);
      data[td.dataset.coord] = text;
      localStorage.setItem("karl", JSON.stringify(data));
      td.replaceChild(textNode, input);
      td.addEventListener("click", textIntoInput);
    });
  }

  return {
    tag: "table",
    children: [
      {
        tag: "tbody",
        children: Array.from({ length: MAX_TR }, (_, i) => ({
          tag: "tr",
          children: Array.from({ length: MAX_TD }, (_, j) => ({
            tag: "td",
            props: {
              onClick: textIntoInput,
              dataCoord: `${i}.${j}`,
            },
            children: [data[`${i}.${j}`] ?? "Default"],
          })),
        })),
      },
    ],
  };
}
