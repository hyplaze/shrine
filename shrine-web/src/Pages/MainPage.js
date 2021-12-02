import { useHistory } from "react-router-dom";

import logo from "../Assets/logo.png";

function MainPage() {
  const history = useHistory();
  return (
    <div class="container-fluid vh-100">
      <div class="row justify-content-center h-100 align-items-center">
        <div class="col-3">
          <img src={logo} class="img-fluid d-flex" alt="Responsive" />
        </div>
        <div class="col-3 text-center">
          <h1 class="display-1">Shrine</h1>
          <p class="h6">Password Manager</p>
          <figure class="text-center">
            <blockquote class="blockquote">
              <p>"Use at your own risk."</p>
            </blockquote>
            <figcaption class="blockquote-footer">
              <cite title="Source Title">Hanry Xu</cite>
            </figcaption>
          </figure>
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={() => {
                history.push("/login");
                history.go();
              }}
            >
              Log In
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={() => {
                history.push("/register");
                history.go();
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
