import generateTable, { NB_COLUMN, NB_ROW } from "./tableGenerator.js";

const root = document.getElementById("root");
generateTable(root);
console.log(NB_COLUMN, NB_ROW);

class Lign1 extends Component {
  render() {
    return {
      type: "tr",
      attributes: {
        colspan: 3,
        onclick: (event) => this.setState({ value: "foo" }),
      },
      children: [
        { type: "td", children: [this.state.value] },
        { type: "td", children: ["1Test2"] },
        { type: "td", children: ["1Test3"] },
      ],
    };
  }
}

Lign1.confProps = {
  type: "object",
  properties: {
    colspan: { type: "number" },
  },
};

const struct = {
  type: "p",
  children: [
    { type: Lign1 },
    {
      type: "tr",
      children: [
        { type: "td", children: ["Test"] },
        { type: "td", children: ["Test2"] },
        { type: "td", children: [{ type: "strong", children: ["Test3"] }] },
      ],
    },
  ],
};

const generateStructure = (struct) => {
  let elem;
  if (typeof struct.type === "string") {
    elem = document.createElement(struct.type);

    if (struct.children) {
      for (let child of struct.children) {
        const nodeElement =
          typeof child === "string"
            ? document.createTextNode(child)
            : generateStructure(child);
        elem.appendChild(nodeElement);
      }
    }

    if (struct.attributes) {
      for (let attr in struct.attributes) {
        if (attr.startsWith("on")) {
          elem.addEventListener(
            attr.replace(/^on/, ""),
            struct.attributes[attr]
          );
        } else {
          elem.setAttribute(attr, struct.attributes[attr]);
        }
      }
    }
  } else {
    elem = generateStructure(/* ... */);
  }
  return elem;
};

root.appendChild(generateStructure(struct));

//MiniReact.renderDom(
//   MiniReact.createElement("div", { "data-id": 3 }, [
//     MiniReact.createElement(Lign1, {}, []),
//     MiniReact.createElement("ul", {}, [
//       MiniReact.createElement("li", {}, ["2Test"]),
//       MiniReact.createElement("li", {}, ["2Test1"]),
//       MiniReact.createElement("li", {}, ["2Test2"]),
//     ]),
//   ]),
//   document.getElementById('root')
//);

function createElement(type, props, children) {
  if (typeof type === "string") {
    return {
      type: type,
      attributes: props,
      children: children,
    };
  } else {
    if (type.confProps && !type_check(props, type.confProps))
      throw new Error("invalide props");

    return {
      //...
    };
  }
}
