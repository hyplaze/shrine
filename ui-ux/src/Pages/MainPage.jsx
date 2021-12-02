import { Component } from "react";
import logo from "../Assets/logo.png"

export default
class MainPage extends Component {
    render() {
        return (
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-3 " style={{ paddingTop: "14%" }}>
                        <img src={logo} class="img-fluid d-flex" alt="Responsive" />
                    </div>
                    <div class="col-3 text-center" style={{ paddingTop: "16%" }}>
                        <h1 class="display-1 mt-4">
                            Shrine
                        </h1>
                        <p class='h6'>
                            Password Manager
                        </p>
                        <figure class="text-center">
                            <blockquote class="blockquote">
                                <p>
                                    "Use at your own risk."
                                </p>
                            </blockquote>
                            <figcaption class="blockquote-footer">
                                <cite title="Source Title">
                                    Hanry Xu
                                </cite>
                            </figcaption>
                        </figure>
                        <a href="/login" class="btn btn-outline-primary" role="button" aria-pressed="true">
                            Log In or Sign Up
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}