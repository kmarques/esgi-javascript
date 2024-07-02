import structureToDom from "../core/structureToDom.js";

export default function HashRouter(rootElement, routes) {
  function managePath() {
    const currentPath = window.location.hash.slice(1);
    const elementGenerator = routes[currentPath] ?? routes["*"];
    const elem = elementGenerator();
    return elem;
  }

  rootElement.appendChild(structureToDom(managePath()));

  window.addEventListener("hashchange", function () {
    rootElement.replaceChild(
      structureToDom(managePath()),
      rootElement.childNodes[0]
    );
  });
}
