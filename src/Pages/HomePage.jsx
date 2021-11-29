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

                <div class="row" style={{ marginTop: "1%" }}>
                    <div class="col-3">
                        <div class="list-group">
                            <button type="button" class="list-group-item btn btn-outline-primary" aria-current="true">
                                Add a new Password
                            </button>
                            <form class="d-flex" style={{ marginTop: "2%" }}>
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button class ="btn btn-outline-success" type ="submit">Search</button>
                            </form>
                        </div>
                    </div>
                    <div class="col-9">
                        <Passwords /></div>
                </div>
            </div>
        )
    }
}
