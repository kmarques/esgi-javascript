export default function Page404() {
  const h1 = document.createElement("h1");
  const i = document.createElement("i");
  i.appendChild(document.createTextNode("Page 404"));
  h1.appendChild(i);
  const a = document.createElement("a");
  a.href = "/page1";
  a.appendChild(document.createTextNode("Page 1"));
  a.addEventListener("click", (e) => {
    e.preventDefault();
    window.history.pushState({}, undefined, e.currentTarget.href);
    window.dispatchEvent(new Event("pushstate"));
  });
  h1.appendChild(a);
  return h1;
}
