export default class Page1Class extends Component {
  state = {
    cellEdit: undefined,
  };

  constructor(props) {
    this.state.data = JSON.parse(storage.getItem("karl")) || {};
  }

  textIntoInput(i, j) {
    this.setState({
      cellEdit: { i, j },
      inputValue: this.state.data[`${i}.${j}`] ?? "Default",
    });
  }

  inputIntoText() {
    const data = Object.assign(this.state.data, {
      [`${this.state.cellEdit.i}.${this.state.cellEdit.j}`]:
        this.state.inputValue,
    });
    storage.setItem("karl", JSON.stringify(data));

    this.setState({
      cellEdit: undefined,
      inputValue: "",
      data: data,
    });
  }

  render() {
    return {
      tag: "table",
      children: [
        {
          tag: "tbody",
          children: Array.from({ length: MAX_TR }, (_, i) => ({
            tag: "tr",
            children: Array.from({ length: MAX_TD }, (_, j) => ({
              tag: "td",
              props: {
                onClick:
                  i === this.state.cellEdit?.i && j === this.state.cellEdit?.j
                    ? null
                    : () => this.textIntoInput(i, j),
              },
              children: [
                i === this.state.cellEdit?.i && j === this.state.cellEdit?.j
                  ? {
                      tag: "input",
                      props: {
                        value: this.state.inputValue ?? "Default",
                        onBlur: this.inputIntoText,
                        onInput: (e) =>
                          this.setState({ inputValue: e.target.value }),
                      },
                    }
                  : this.state.data[`${i}.${j}`] ?? "Default",
              ],
            })),
          })),
        },
      ],
    };
    return MiniReact.createElement(
      "table",
      {},
      MiniReact.createElement(
        "tbody",
        {},
        Array.from({ length: MAX_TR }, (_, i) =>
          MiniReact.createElement(
            "tr",
            {},
            Array.from({ length: MAX_TD }, (_, j) =>
              MiniReact.createElement(
                "td",
                {
                  onClick:
                    i === this.state.cellEdit?.i && j === this.state.cellEdit?.j
                      ? null
                      : () => this.textIntoInput(i, j),
                },
                i === this.state.cellEdit?.i && j === this.state.cellEdit?.j
                  ? MiniReact.createElement("input", {
                      value: "Default",
                      onBlur: this.inputIntoText,
                    })
                  : "Default"
              )
            )
          )
        )
      )
    );
  }
}
