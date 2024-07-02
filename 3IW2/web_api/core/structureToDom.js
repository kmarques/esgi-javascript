export default function structureToDom(structure) {
  const elem = document.createElement(structure.type);
  if (structure.attributes) {
    for (const attrName in structure.attributes) {
      elem.setAttribute(attrName, structure.attributes[attrName]);
    }
  }
  if (structure.events) {
    for (const eventName in structure.events) {
      for (const listener of structure.events[eventName]) {
        elem.addEventListener(eventName, listener);
      }
    }
  }
  if (structure.children) {
    for (const child of structure.children) {
      let subChild;
      if (typeof child === "string") {
        subChild = document.createTextNode(child);
      } else {
        subChild = structureToDom(child);
      }
      elem.appendChild(subChild);
    }
  }

  return elem;
}
