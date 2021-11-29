import { useHistory } from "react-router-dom";

import logo from "../Assets/logo.png";

function MainPage() {
  const history = useHistory();
  return (
    <div class="container-fluid min-vh-100 position-relative">
      <div class="row position-absolute top-50 start-50 translate-middle">
        <div class="col">
          <img src={logo} class="img-fluid d-flex" alt="Responsive" />
        </div>
        <div class="col text-center">
          <h1 class="display-1 mt-4">Shrine</h1>
          <p class="h6">Password Manager</p>
          <figure class="text-center">
            <blockquote class="blockquote">
              <p>"Use at your own risk."</p>
            </blockquote>
            <figcaption class="blockquote-footer">
              <cite title="Source Title">Hanry Xu</cite>
            </figcaption>
          </figure>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => {
              history.push("/register");
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
  );
}

export default MainPage;
