import { Component } from "react";

const generator = require("generate-password");

export default class CustomizeGeneration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      p_length: 10,
      p_numbers: false,
      p_symbols: false,
      p_uppercase: false,
      p_strict: false,
      password: (
        <span class="text-success inline">
          Click here to generate and copy.
        </span>
      ),
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleCopy() {
    navigator.clipboard.writeText(this.state.password);
  }

  render() {
    return (
      <div class="card">
        <div class="card-header">
          <h6>Customize password generation.</h6>
          Please specify password length and other requirements, then click the
          area below to start and copy generated password.
        </div>
        <div class="row">
          <div class="col-3 mt-2 ms-3 align-items-center">
            <p class="d-flex"> Password length: {this.state.p_length} digits</p>
          </div>
          <div class="col-3 d-flex align-items-center">
            <input
              type="range"
              class="form-range"
              min="4"
              max="18"
              id="p_length"
              value={this.state.p_length}
              onChange={this.handleInputChange}
              name="p_length"
            />
          </div>
        </div>
        <form class="mx-3 mb-2">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="uppercase"
              checked={this.state.password.uppercase}
              onChange={this.handleInputChange}
              name="p_uppercase"
            />
            <label class="form-check-label" for="uppercase">
              With uppercase letters
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="number"
              checked={this.state.password.numbers}
              onChange={this.handleInputChange}
              name="p_numbers"
            />
            <label class="form-check-label" for="number">
              With Numbers
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="symbol"
              checked={this.state.password.symbols}
              onChange={this.handleInputChange}
              name="p_symbols"
            />
            <label class="form-check-label" for="symbol">
              With Symbol
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="strict"
              checked={this.state.password.strict}
              onChange={this.handleInputChange}
              name="p_strict"
            />
            <label class="form-check-label" for="strict">
              Use strict method
            </label>
          </div>
        </form>
        <button
          type="button card"
          class="list-group-item list-group-item-action"
          onClick={() =>
            this.setState(
              {
                password: generator.generate({
                  length: this.state.p_length,
                  numbers: this.state.p_numbers,
                  symbols: this.state.p_symbols,
                  strict: this.state.p_strict,
                  uppercase: this.state.p_uppercase,
                }),
              },
              this.handleCopy
            )
          }
        >
          {this.state.password}
        </button>
      </div>
    );
  }
}
