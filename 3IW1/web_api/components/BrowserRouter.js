import generateStructure from "../core/generateStructure.js";

export default function BrowserRouter(rootElement, routes) {
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
    rootElement.replaceChild(
      generateStructure(managePath()),
      rootElement.childNodes[0]
    );
  });
  window.addEventListener("pushstate", function () {
    rootElement.replaceChild(
      generateStructure(managePath()),
      rootElement.childNodes[0]
    );
  });
  rootElement.appendChild(generateStructure(managePath()));
}

export function BrowserLink(props) {
  return {
    tag: "a",
    props: {
      href: props.path,
      onClick: (e) => {
        e.preventDefault();
        window.history.pushState({}, null, props.path);
        window.dispatchEvent(new Event("pushstate"));
      },
    },
    children: [props.title],
  };
}
