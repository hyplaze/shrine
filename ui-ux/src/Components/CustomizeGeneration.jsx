import { Component } from "react"

const generator = require('generate-password');

export default
    class CustomizeGeneration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: generator.generate({ length: 10, numbers: true, symbols: true })
        }

    }

    render() {
        return (
            <div class="card">
                <div class="card-boy">
                    <div class="card-header">
                        <h6>Customize password generation.</h6>
                        Please specify password length and other requirements, then click the area below to start generation.
                    </div>

                    <p style={{ padding: "1%" }}> Length (4-18)  </p>
                    <input type="range" class="form-range" min="4" max="18" id="length"/>
                    <form>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="uppercase" value="isUppercase" />
                            <label class="form-check-label" for="uppercase">With uppercase letters</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="number" value="isNumber" />
                            <label class="form-check-label" for="number">With Numbers</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="symbol" value="isSymbol" />
                            <label class="form-check-label" for="symbol">With Symbol</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="strict" value="isStrict" />
                            <label class="form-check-label" for="strict">Use strict method</label>
                        </div>
                    </form>
                    <button type="button card" class="list-group-item list-group-item-action" onClick={() => this.setState({
                        password: generator.generate({
                            length: 10,
                            numbers: true,
                            symbols: "_",
                            strict: true
                        })
                    })}>
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">
                                {this.state.password}
                            </h6>
                        </div>
                    </button>



                </div>
            </div>
        )
    }
}