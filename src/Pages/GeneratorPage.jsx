import { Component } from "react";
import NavBar from "../Components/NavBar";
const generator = require('generate-password');



export default
class GeneratorPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password: generator.generate({
                length: 10,
                numbers: true,
                symbols: true,
            })
        }
    }


    //TODO:
    //have a length field for the webpage, in which:
    //the value in the field could be passed in to the 
    //length attribute of state.password.
    //
    //have a number check field for the webpage, in which:
    //the Boolean value of the field could be passed in to 
    //the numbers attribute of state.password
    //
    //have an Uppercase check field for the webpage, in whcih:
    //the Boolean value of the field could be passed in to
    //the uppercase attribute of state.password
    //
    //have a special character field for the webpage, in which:
    //the value of the field could be passed in to 
    //the symbol attribute of state.password.
    //(NOTE: if the field is empty, symbol attribute will be boolean false)
    //
    //have a strict check field for the webpage, in which:
    //the Boolean value of the field could be passed in to
    //the stric attribute of the state.password
    //
    //A field to display the password as well as a botton so that we
    //could implement a copy function.

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <NavBar page="GeneratorPage" />
                </div>
                <div class="text-center" style={{ paddingTop: "50px" }}>
                    <a class="btn btn-primary" href="#" role="button"
                        onClick={() => this.setState({
                            password: generator.generate({
                                length: 10,
                                numbers: true,
                                symbols: "_",
                                strict: true
                            })
                        })}>Generate</a>
                    <p class="d-inline-block" style={{ paddingLeft: "10px" }}>Generate mathematically proven safe passwords with just one click.</p>
                    <p>
                        // To be implemented.
                    </p>
                    <div>PASSWORD IS: {this.state.password}</div>
                </div>
            </div>

        )
    }
}

