import { Component } from "react";
import NavBar from "../Components/NavBar";

class GeneratorPage extends Component {
    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <NavBar page="GeneratorPage" />
                </div>
                <div class="text-center" style={{ paddingTop: "50px" }}>
                    <a class="btn btn-primary" href="#" role="button">Generate</a>
                    <p class="d-inline-block" style={{ paddingLeft: "10px" }}>Generate mathematically proven safe passwords with just one click.</p>
                    <p>
                        // To be implemented.
                    </p>
                </div>
            </div>

        )
    }
}

export default GeneratorPage
