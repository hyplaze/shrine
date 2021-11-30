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

      password: generator.generate({
        length: 10,
        numbers: false,
        symbols: false,
        uppercase: false,
        strict: false,
      }),
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div class="card">
        <div class="card-boy">
          <div class="card-header">
            <h6>Customize password generation.</h6>
            Please specify password length and other requirements, then click
            the area below to start generation.
          </div>

          <p style={{ padding: "1%" }}> Length: {this.state.p_length} </p>
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
          <form>
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
              this.setState({
                password: generator.generate({
                  length: this.state.p_length,
                  numbers: this.state.p_numbers,
                  symbols: this.state.p_symbols,
                  strict: this.state.p_strict,
                  uppercase: this.state.p_uppercase,
                }),
              })
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
