export const NB_ROW = 5;
export const NB_COLUMN = 5;
const storage = localStorage;

const generateTable = (rootElement) => {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  const data = JSON.parse(storage.getItem("table") || "{}");

  const handleTdClick = (event) => {
    const text = event.target.textContent;
    const input = document.createElement("input");
    input.value = text;
    event.target.replaceChild(input, event.target.childNodes[0]);
    event.target.removeEventListener("click", handleTdClick);
    input.addEventListener("blur", handleInputBlur);
    input.focus();
  };

  const handleInputBlur = (event) => {
    const value = event.target.value;
    const textNode = document.createTextNode(value);
    event.target.parentNode.addEventListener("click", handleTdClick);
    data[event.target.parentNode.dataset.id] = value;
    storage.setItem("table", JSON.stringify(data));

    event.target.parentNode.replaceChild(textNode, event.target);
  };

  for (let i = 0; i < NB_ROW; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < NB_COLUMN; j++) {
      const td = document.createElement("td");
      const text = document.createTextNode(data[`${i}-${j}`] ?? "Default");
      td.appendChild(text);
      tr.appendChild(td);

      td.dataset.id = `${i}-${j}`;

      td.addEventListener("click", handleTdClick);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  rootElement.appendChild(table);
};

export default generateTable;
