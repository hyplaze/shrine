import { Component } from "react";
import NavBar from "../Components/NavBar";
import Passwords from "../Components/Passwords";

export default
    class HomePage extends Component {
    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <NavBar page="HomePage" />
                </div>

               
                <Passwords />
            </div>
        )
    }
}
