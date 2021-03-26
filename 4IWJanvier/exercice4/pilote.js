function Pilote(name) {
  this.name = name;
  let state = {},
    prevState = {};

  this.receiveData = function (data) {
    prevState = state;
    state = data;
  };

  this.needUpdate = function () {
    return (
      prevState.state !== state.state ||
      prevState.origin !== state.origin ||
      prevState.position !== state.position
    );
  };

  this.getState = function () {
    return state;
  };

  this.speak = function () {
    switch (state.state) {
      case "ready":
        return `Here we go! I'm ${name}`;
      case "happy":
        return "Let's have some fun!";
      case "sad":
        return `Outch!!! Damn ${state.origin}`;
      case "normal":
        return "";
      case "finish":
        switch (state.position) {
          case 1:
            return "I'm the best";
          case 2:
            return "Could be the best";
          default:
            return "Will be better next time";
        }
        break;
    }
  };
}

const pilote = new Pilote("Mario");

pilote.receiveData({ state: "ready" });
if (pilote.needUpdate()) console.log("Speak ready", pilote.speak());
pilote.receiveData({ state: "normal" });
if (pilote.needUpdate()) console.log("Speak normal", pilote.speak());
pilote.receiveData({ state: "normal" });
if (pilote.needUpdate()) console.log("Speak normal", pilote.speak());
pilote.receiveData({ state: "happy" });
if (pilote.needUpdate()) console.log("Speak happy", pilote.speak());
pilote.receiveData({ state: "sad", origin: "Luigi" });
if (pilote.needUpdate()) console.log("Speak sad", pilote.speak());
pilote.receiveData({ state: "finish", position: 1 });
if (pilote.needUpdate()) console.log("Speak finish", pilote.speak());
pilote.receiveData({ state: "finish", position: 1 });
if (pilote.needUpdate()) console.log("Speak finish", pilote.speak());
pilote.receiveData({ state: "finish", position: 1 });
if (pilote.needUpdate()) console.log("Speak finish", pilote.speak());
pilote.receiveData({ state: "finish", position: 1 });
if (pilote.needUpdate()) console.log("Speak finish", pilote.speak());
pilote.receiveData({ state: "finish", position: 1 });
if (pilote.needUpdate()) console.log("Speak finish", pilote.speak());
