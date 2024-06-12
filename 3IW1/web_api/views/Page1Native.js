export default function Page1() {
  const MAX_TR = 5;
  const MAX_TD = 5;
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
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
      td.replaceChild(textNode, input);
      td.addEventListener("click", textIntoInput);
    });
  }
  for (let i = 0; i < MAX_TR; i++) {
    const tr = document.createElement("tr");
    tbody.appendChild(tr);
    for (let j = 0; j < MAX_TD; j++) {
      const td = document.createElement("td");
      tr.appendChild(td);
      td.addEventListener("click", textIntoInput);
      const textNode = document.createTextNode("Default");
      td.appendChild(textNode);
    }
  }
  return table;
}
