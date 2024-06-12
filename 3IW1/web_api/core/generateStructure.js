//const structure = {
//  tag: "div",
//  props: {
//    id: "foo",
//  },
//  children: [
//    {
//      tag: "p",
//      children: [
//        {
//          tag: "input",
//          props: {
//            type: "color",
//          },
//        },
//      ],
//    },
//    "Coucou",
//  ],
//};

export default function generateStructure(structure) {
  const elem = document.createElement(structure.tag);
  if (structure.props) {
    for (const propName in structure.props) {
      if (/^on[A-Z]/.test(propName)) {
        elem.addEventListener(
          propName.slice(2).toLowerCase(),
          structure.props[propName]
        );
      } else if (/^data[A-Z]/.test(propName)) {
        elem.dataset[propName.slice(4).toLowerCase()] =
          structure.props[propName];
      } else {
        elem.setAttribute(propName, structure.props[propName]);
      }
    }
  }
  if (structure.children) {
    for (const child of structure.children) {
      let subChild;
      if (typeof child === "string") {
        subChild = document.createTextNode(child);
      } else {
        subChild = generateStructure(child);
      }
      elem.appendChild(subChild);
    }
  }
  return elem;
}
