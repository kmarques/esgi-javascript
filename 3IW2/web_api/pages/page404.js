import { BrowserLink } from "../components/BrowserRouter.js";

export default function Page404() {
  return {
    type: "h1",
    children: [BrowserLink("Page 1", "./page1"), "Page 404"],
  };
}
