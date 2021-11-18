import { Component } from "react";

class LoginPage extends Component {
    render() {
        return (
            <div class="container min-vh-100 position-relative">
                <div class="row position-absolute top-50 start-50 translate-middle">
                    <div class="col">
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
                            <div class="btn-group me-auto" role="group" aria-label="Basic outlined example">
                                <button type="submit" class="btn btn-outline-primary">
                                    Log In
                                </button>
                                <button type="submit" class="btn btn-outline-primary">
                                    Sign Up
                                </button>
                            </div>
                            <a href="/" class="btn btn-outline-primary ms-5" role="button" aria-pressed="true">
                                    Go Back
                                </a>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}

export default LoginPage
