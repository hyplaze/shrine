import { Component } from "react";
import NavBar from "./Components/NavBar";
import QuickGeneration from "./Components/QuickGeneration";
import CustomizeGeneration from "./Components/CustomizeGeneration";

export default class GeneratorPage extends Component {
  constructor(props) {
    super(props);
    this.state = { window: "QuickGeneration" };
  }

  render() {
    let generatorContent =
      this.state.window === "QuickGeneration" ? (
        <QuickGeneration />
      ) : (
        <CustomizeGeneration />
      );

    return (
      <div class="container-fluid">
        <div class="row">
          <NavBar page="GeneratorPage" />
        </div>
        <div class="row mt-3">
          <div class="col-3">
            <div class="list-group">
              <button
                type="button"
                class="list-group-item list-group-item-action"
                onClick={() => this.setState({ window: "QuickGeneration" })}
              >
                Quick Generation
              </button>
              <button
                type="button"
                class="list-group-item list-group-item-action"
                onClick={() => this.setState({ window: "CustomizeGeneration" })}
              >
                Customize
              </button>
            </div>
          </div>

          <div class="col-9">{generatorContent}</div>
        </div>
      </div>
    );
  }
}
