import { Component } from "react";
import NavBar from "./Components/NavBar";

export default
class CheckerPage extends Component {
    render() {
        return (
            <div class="container-fluid">

                <div class="row">
                    <NavBar page="CheckerPage" />
                </div>
            </div>
        )
    }
}
