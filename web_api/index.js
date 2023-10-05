// Créer un tableau de 5 lignes par 5 colonnes contenant une valeur par défaut "Default"
const root = document.getElementById("root");
const table = document.createElement("table");
const tbody = document.createElement("tbody");

function textToInput(event) {
  const contentNode = event.currentTarget.childNodes[0];
  const content = contentNode.textContent;
  const input = document.createElement("input");
  input.value = content;
  event.currentTarget.removeChild(contentNode);
  event.currentTarget.appendChild(input);
  input.focus();
  input.addEventListener("blur", function (event) {
    const content = event.currentTarget.value;
    const td = event.currentTarget.parentNode;
    const contentNode = document.createTextNode(content);
    td.replaceChild(contentNode, event.currentTarget);
    td.addEventListener("click", textToInput);
  });
  event.currentTarget.removeEventListener("click", textToInput);
}

for (let i = 0; i < 5; i++) {
  const tr = document.createElement("tr");

  for (let j = 0; j < 5; j++) {
    const td = document.createElement("td");
    const text = document.createTextNode("Default");
    td.appendChild(text);
    tr.appendChild(td);
    td.addEventListener("click", textToInput);
  }
  tbody.appendChild(tr);
}
table.appendChild(tbody);

root.appendChild(table);

//const button = document.createElement("button");
//const textButton = document.createTextNode("Upload");
//button.appendChild(textButton);
//
//const inputFile = document.createElement("input");
//inputFile.type = "file";
//inputFile.style.display = "none";
//
//button.addEventListener("click", function () {
//  inputFile.dispatchEvent(new MouseEvent("click"));
//});
//
//root.appendChild(button);
//root.appendChild(inputFile);
//
const page = {
  type: "table",
  props: {},
  events: {},
  children: [
    {
      type: "tbody",
      props: {
        style: {
          "background-color": "pink",
        },
      },
      events: {},
      children: Array.from({ length: 500 }, (_, indexTr) => ({
        type: "tr",
        props: {},
        events: {},
        children: Array.from({ length: 500 }, (_, indexTd) => ({
          type: "td",
          props: {
            toto: "test",
          },
          events: {},
          children: [
            {
              type: "img",
              props: {
                src: "https://picsum.photos/200?random="+(indexTr*indexTd),
              },
            },
          ],
        })),
      })),
    },
  ],
};



const MiniReactDom = {
  render: function (rootElement, structure) {
    rootElement.appendChild(this.renderStructure(structure));
  },
  renderStructure: function generateDom(structure) {
    let element;
    if (typeof structure.type === "string") {
      if (structure.type === "TEXT_NODE") {
        return document.createTextNode(structure.content);
      }
      element = document.createElement(structure.type);
    }
    if (structure.props) {
      for (const propName in structure.props) {
        if (propName === "style") {
          Object.assign(element.style, structure.props[propName]);
        } else {
          element.setAttribute(propName, structure.props[propName]);
        }
      }
    }
    if (structure.events) {
      for (const eventName in structure.events) {
        for (const eventListeners of structure.events[eventName]) {
          element.addEventListener(eventName, eventListeners);
        }
      }
    }
    if (structure.children) {
      for (const child of structure.children) {
        element.appendChild(this.renderStructure(child));
      }
    }

    return element;
  },
};

MiniReactDom.render(root, page);
