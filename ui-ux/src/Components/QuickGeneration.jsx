import { Component } from "react"

const generator = require('generate-password');

export default
    class QuickGeneration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "Click here to generate."
        }

    }

    render() {
        return (
            <div class="card">
                <div class="card-boy">
                    <div class="card-header">
                        <h6>Generate a common 8-digit, mathematically proven safe password with just one click. </h6>
                        Start by clicking the area below. 
                        <span class="badge rounded-pill bg-primary text-black" type="button">copy</span>
                    </div>
                    <button type="card" class="list-group-item list-group-item-action" onClick={() => this.setState({
                        password: generator.generate({
                            length: 8,
                            numbers: true,
                            symbols: true,
                            strict: true
                        })
                    })}>
                        <div class="card-body">
                            {this.state.password}
                        </div>
                    </button>
                </div>
            </div>
        )
    }
}