import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import AddPasswordModal from "./AddPasswordModal.jsx"

export default
    class Passwords extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: [
                {
                    website: "Pornhub",
                    url: "www.pornhub.com",
                    usr: "Paul Eggert",
                    pwd: 12345678,
                    notes: ""
                },
                {
                    website: "Github",
                    url: "www.github.com",
                    usr: "Paul Eggert",
                    pwd: 12345678,
                    notes: ""
                }
            ],
            entryInModal: {},
            showModal: false,
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.InspectModal = this.InspectModal.bind(this);
    }
    handleClose() { this.setState({ showModal: false }); }
    handleShow() { this.setState({ showModal: true }); }

    InspectModal() {
        return (
            <>
                <Button class="list-group-item list-group-item-action" aria-current="true" onClick={this.handleShow}>
                    Inspect
                </Button>


                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Add a new password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Website Alias</h5>
                                    <p class="card-text">pornhub</p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">URL</h5>
                                    <p class="card-text">www.pornhub.com</p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Username</h5>
                                    <p class="card-text">Eggert</p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Password</h5>
                                    <p class="card-text">12345</p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Notes</h5>
                                    <p class="card-text">123</p>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    render = () => {
        return (
            <>
                <div class="row" style={{ marginTop: "1%" }}>
                    <div class="col-3">
                        <div class="list-group">
                            <AddPasswordModal />
                            <form class="d-flex" style={{ marginTop: "2%" }}>
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                    <div class="col-9">
                        <ol class="list-group list-group-numbered">
                            {this.state.entries.map((entry) => {
                                return (
                                    <div class="row">
                                        <div class="col-6" style={{ paddingTop: "1%", paddingLeft: "2%" }}>
                                            <div class="list-group">
                                                {entry.website}<br />{entry.url}
                                            </div>
                                        </div>
                                        <div class="col-2" style={{ paddingTop: "1%", paddingLeft: "2%" }}>
                                            <div class="list-group">
                                                <this.InspectModal />
                                            </div>
                                        </div>
                                        <div class="col-2" style={{ paddingTop: "1%", paddingLeft: "2%" }}>
                                            <button type="button" class="btn btn-outline-danger">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </ol>
                    </div>
                </div>
            </>
        )
    }
}