import Page1Struct from "./views/Page1Struct.js";
import Page404 from "./views/Page404Struct.js";

export default {
  "/page1": Page1Struct,
  "*": Page404,
};
