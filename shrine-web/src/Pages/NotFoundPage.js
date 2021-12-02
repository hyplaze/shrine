import { Component } from "react";
import logo from "./../Assets/logo.png"

export default
	class NotFoundPage extends Component {
	render() {
		return (
			<div class="container-fluid vh-100">
				<div class="row h-100 align-items-center justify-content-center text-center">
					<div class="col-4">
						<img src={logo} class="img-fluid d-flex" />
						<h2>Page not found</h2>
					</div>
				</div>
			</div>

		)
	}
}