import structureToDom from "../core/structureToDom.js";

export default function BrowserRouter(rootElement, routes) {
  function managePath() {
    const currentPath = window.location.pathname;
    const elementGenerator = routes[currentPath] ?? routes["*"];
    const elem = elementGenerator();
    return elem;
  }

  rootElement.appendChild(structureToDom(managePath()));

  window.addEventListener("popstate", function () {
    rootElement.replaceChild(
      structureToDom(managePath()),
      rootElement.childNodes[0]
    );
  });
  window.addEventListener("pushstate", function () {
    rootElement.replaceChild(
      structureToDom(managePath()),
      rootElement.childNodes[0]
    );
  });
}

export function BrowserLink(title, url) {
  return {
    type: "a",
    attributes: {
      href: url,
    },
    events: {
      click: [
        (e) => {
          e.preventDefault();
          window.history.pushState(
            {},
            null,
            e.currentTarget.getAttribute("href")
          );
          window.dispatchEvent(new Event("pushstate"));
        },
      ],
    },
    children: [title],
  };
}
