import { Component } from "react";

const generator = require("generate-password");

export default class QuickGeneration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: <span class="text-success"> Click here to generate and copy.</span>,
    };
    this.handleCopy = this.handleCopy.bind(this);
  }

  handleCopy(){
    navigator.clipboard.writeText(this.state.password)
  }

  render() {
    return (
      <div class="card">
        <div class="card-boy">
          <div class="card-header">
            <h6>
              Generate a common 8-digit, mathematically proven safe password
              with just one click.{" "}
            </h6>
            Start by clicking the area below.
          </div>
          <button
            type="button card"
            class="list-group-item list-group-item-action"
            onClick={() =>
              this.setState({
                password: generator.generate({
                  length: 8,
                  numbers: true,
                  symbols: true,
                  strict: true,
                }),
              },this.handleCopy)
            }
          >
            <div class="card-body">
              <h6 class="card-subtitle mb-2 text-muted">
                {this.state.password}
              </h6>
            </div>
          </button>
        </div>
      </div>
    );
  }
}
