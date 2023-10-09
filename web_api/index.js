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
    // start backend
    data[td.dataset.position] = content;
    localStorage.setItem("data", JSON.stringify(data));
    // end backend
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

const data = JSON.parse(localStorage.getItem("data") || "{}");
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
      children: Array.from({ length: 12 }, (_, indexTr) => ({
        type: "tr",
        props: {},
        events: {},
        children: Array.from({ length: 12 }, (_, indexTd) => ({
          type: "td",
          props: {
            toto: "test",
            "data-position": indexTr + "-" + indexTd,
          },
          events: {
            click: [textToInput],
          },
          children: [
            {
              type: "TEXT_NODE",
              content:
                data[indexTr + "-" + indexTd] ??
                `Default ${indexTr} ${indexTd}`,
            },
          ],
        })),
      })),
    },
  ],
};

class Component {}

class Button extends Component {
  render() {
    return {
      type: "button",
      props: {
        style: {
          "background-color": "red",
        },
        ...this.props,
      },
      events: {
        click: [this.props.onClick],
      },
      children: [
        {
          type: "TEXT_NODE",
          content: this.props.title,
        },
      ],
    };
  }
}

const MiniReact = {
  createElement: function () {},
};
class Page2 extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  render() {
    return {
      type: "div",
      props: {
        style: {
          "background-color": "green",
        },
      },
      children: [
        {
          type: Button,
          props: {
            onClick: () => alert("Coucou"),
            title: "Click me",
          },
        },
        {
          type: "h1",
          props: {},
          children: [
            {
              type: "TEXT_NODE",
              content: "Counter: {{ state.count }}",
            },
          ],
        },
        {
          type: Button,
          props: {
            onClick: () => this.setState({ count: this.state.count + 1 }),
            title: "Count +1",
          },
        },
      ],
    };
  }
}

const page2 = {
  type: "div",
  children: [
    {
      type: "TEXT_NODE",
      content: "Coucou page2",
    },
  ],
};

const MiniReactDom = {
  render: function (rootElement, structure) {
    const goToPage = () => {
      const routes = {
        "/page1": page,
        "/page2": page2,
      };
      const path = location.hash.slice(1);
      if(rootElement.childNodes.length) {
        rootElement.replaceChild(this.renderStructure(routes[path]), rootElement.childNodes[0]);
      } else 
      rootElement.appendChild(this.renderStructure(routes[path]));
    }
    goToPage();
    window.onhashchange = goToPage;
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
        } else if (propName.startsWith("data-")) {
          element.dataset[propName.replace("data-", "")] =
            structure.props[propName];
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
