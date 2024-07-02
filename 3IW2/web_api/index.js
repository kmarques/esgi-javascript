import BrowserRouter from "./components/BrowserRouter.js";
import Page1 from "./pages/page1.js";
import Page404 from "./pages/page404.js";

const root = document.getElementById("root");
const routes = {
  "/page1": Page1,
  "*": Page404,
};

BrowserRouter(root, routes);
