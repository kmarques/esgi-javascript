//    Scope
//var bar = 1;
//let bar2 = 2;
//
//function test() {
//  var foo = 3;
//  let foo2 = 4;
//  if (true) {
//    var foo3 = 5;
//    let foo4 = 6;
//    console.log("block scope");
//    console.log(bar);
//    console.log(bar2);
//    console.log(foo);
//    console.log(foo2);
//    console.log(foo3);
//    console.log(foo4);
//  }
//  console.log("local scope");
//  console.log(bar);
//  console.log(bar2);
//  console.log(foo);
//  console.log(foo2);
//  console.log(foo3);
//  console.log(foo4);
//}
//
//test();
//
//console.log("file scope");
//console.log(bar);
//console.log(bar2);
////console.log(foo);
////console.log(foo2);
////console.log(foo3);
////console.log(foo4);
//
// Hoisting
//console.log(foo);
//console.log(bar);
//var foo = 3;
//console.log(foo);
//let bar = 4;
//foobar();
//function foobar() {}
//foobar2();
//var foobar2 = function () {};
//console.log(foo);

// Closure

function creerFonction() {
  var nom = "Mozilla";
  function afficheNom() {
    console.log(nom);
  }
  function coucou() {
    console.log(nom);
  }
  return afficheNom;
}
//console.log(nom);
var maFonction = creerFonction();
maFonction();
