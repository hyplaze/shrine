import { Component } from "react";
import logo from "../Assets/logo.png"

export default
class LoginPage extends Component {
    render() {
        return (
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-4 h100" style={{paddingTop: "15%"}}> 
                        <div class="row justify-content-center">
                            <img src={logo} class="h-25 w-25" alt="Responsive" />
                        </div>
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">
                                    Email
                                </label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" class="form-text">
                                    We won't share the information with anyone.
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">
                                    Password
                                </label>
                                <input type="password" class="form-control" id="exampleInputPassword1" />
                            </div>
                            <div class="btn-group" role="group" aria-label="Basic outlined example">
                                <button type="submit" class="btn btn-outline-primary">
                                    Log In
                                </button>
                                <button type="submit" class="btn btn-outline-primary">
                                    Sign Up
                                </button>
                                <a href="/" class="btn btn-outline-primary" role="button" aria-pressed="true">
                                    Go Back
                                </a>
                                <a href="/home" class="btn btn-outline-primary" role="button" aria-pressed="true">
                                    Home
                                </a>
                            </div>

                        </form>
                    </div>
                </div>
            </div >
        )
    }
}