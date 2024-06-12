import { BrowserLink } from "../components/BrowserRouter.js";

export default function Page404() {
  return {
    tag: "h1",
    children: [
      BrowserLink({ title: "Page 1", path: "/page1" }),
      {
        tag: "i",
        children: ["Page 404"],
      },
    ],
  };
}
