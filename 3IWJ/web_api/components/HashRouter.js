const HashRouter = function (routes, rootElement) {
  const generatePage = () => {
    const path = location.hash.slice(1);
    if (rootElement.childNodes.length) {
      rootElement.replaceChild(
        this.renderStructure(routes[path]),
        rootElement.childNodes[0]
      );
    } else rootElement.appendChild(this.renderStructure(routes[path]));
  };
  generatePage();
  window.onhashchange = generatePage;
};

export const HashLink = function (props) {
  return {
    type: "a",
    props: {
      href: "#" + props.to,
    },
    children: [
      {
        type: "TEXT_NODE",
        content: props.title,
      },
    ],
  };
};

export default HashRouter;
