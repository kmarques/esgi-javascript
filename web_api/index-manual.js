// Créer un tableau de 5 lignes par 5 colonnes contenant une valeur par défaut "Default"
const root = document.getElementById("root");
const table = document.createElement("table");
const tbody = document.createElement("tbody");

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

MiniReactDom.render(root, page);
