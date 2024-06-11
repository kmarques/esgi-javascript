function Page1() {
  const MAX_TR = 5;
  const MAX_TD = 5;
  const root = document.getElementById("root");
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

function Page404() {
  const h1 = document.createElement("h1");
  const i = document.createElement("i");
  i.appendChild(document.createTextNode("Page 404"));
  h1.appendChild(i);
  const a = document.createElement("a");
  a.href = "/page1";
  a.appendChild(document.createTextNode("Page 1"));
  a.addEventListener("click", (e) => {
    e.preventDefault();
    window.history.pushState({}, undefined, e.currentTarget.href);
    window.dispatchEvent(new Event("pushstate"));
  });
  h1.appendChild(a);
  return h1;
}

function HashRouter(rootElement, routes) {
  function managePath() {
    const path = window.location.hash.slice(1);
    const pageGenerator = routes[path] ?? routes["*"];
    return pageGenerator();
  }

  window.addEventListener("hashchange", function () {
    rootElement.replaceChild(managePath(), rootElement.childNodes[0]);
  });
  rootElement.appendChild(managePath());
}

function BrowserRouter(rootElement, routes) {
  //const oldPushState = window.history.pushState;
  //window.history.pushState = function (data, title, url) {
  //  oldPushState.call(window.history, data, title, url);
  //  window.dispatchEvent(new Event("popstate"));
  //};
  function managePath() {
    const path = window.location.pathname;
    const pageGenerator = routes[path] ?? routes["*"];
    return pageGenerator();
  }

  window.addEventListener("popstate", function () {
    rootElement.replaceChild(managePath(), rootElement.childNodes[0]);
  });
  window.addEventListener("pushstate", function () {
    rootElement.replaceChild(managePath(), rootElement.childNodes[0]);
  });
  rootElement.appendChild(managePath());
}

const routes = {
  "/page1": Page1,
  "*": Page404,
};
BrowserRouter(document.getElementById("root"), routes);
