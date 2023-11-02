import { BrowserLink } from "../components/BrowserRouter.js";

export default {
  type: "div",
  children: [
    BrowserLink({
      title: "Page 1",
      to: "/page1",
    }),
    //{
    //  type: HashLink,
    //  props: {
    //    title: "Page 1",
    //    to: "/page1",
    //  },
    //},
    {
      type: "TEXT_NODE",
      content: "Coucou page2",
    },
  ],
};

// class Page2 extends Component {
//   constructor() {
//     super();
//     this.state = {
//       count: 0,
//     };
//   }

//   render() {
//     return {
//       type: "div",
//       props: {
//         style: {
//           "background-color": "green",
//         },
//       },
//       children: [
//         {
//           type: Button,
//           props: {
//             onClick: () => alert("Coucou"),
//             title: "Click me",
//           },
//         },
//         {
//           type: "h1",
//           props: {},
//           children: [
//             {
//               type: "TEXT_NODE",
//               content: "Counter: {{ state.count }}",
//             },
//           ],
//         },
//         {
//           type: Button,
//           props: {
//             onClick: () => this.setState({ count: this.state.count + 1 }),
//             title: "Count +1",
//           },
//         },
//       ],
//     };
//   }
// }
