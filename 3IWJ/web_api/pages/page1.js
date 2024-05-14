import { BrowserLink } from "../components/BrowserRouter.js";

const data = JSON.parse(localStorage.getItem("data") || "{}");

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

export default {
  type: "div",
  children: [
    BrowserLink({
      title: "Page 2",
      to: "/page2",
    }),
    {
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
    },
  ],
};
