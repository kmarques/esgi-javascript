const lib = require("./lib");
const libAlt = require("./lib_alternative");

console.log(lib.foo, lib.ucfirst("test"));
console.log(libAlt.foo, libAlt.ucfirst("test"));
