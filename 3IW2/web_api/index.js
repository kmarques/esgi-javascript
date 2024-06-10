function Page1() {
  const COL_MAX = 5;
  const ROW_MAX = 5;
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

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

  for (let i = 0; i < ROW_MAX; i++) {
    const tr = document.createElement("tr");
    tbody.appendChild(tr);
    for (let j = 0; j < COL_MAX; j++) {
      const td = document.createElement("td");
      const textNode = document.createTextNode("Default");
      tr.appendChild(td);
      td.appendChild(textNode);
      td.addEventListener("click", textIntoInput);
    }
  }

  return table;
}

function Page404() {
  const h1 = document.createElement("h1");
  const title = document.createTextNode("Page 404");
  h1.appendChild(title);

  return h1;
}

const root = document.getElementById("root");
const routes = {
  "/page1": Page1,
  "*": Page404,
};

function HashRouter(rootElement, routes) {
  function managePath() {
    const currentPath = window.location.hash.slice(1);
    const elementGenerator = routes[currentPath] ?? routes["*"];
    const elem = elementGenerator();
    return elem;
  }

  rootElement.appendChild(managePath());

  window.addEventListener("hashchange", function () {
    rootElement.replaceChild(managePath(), rootElement.childNodes[0]);
  });
}

HashRouter(root, routes);
