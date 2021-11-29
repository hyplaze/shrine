import { Component } from "react";
import ReactModal from 'react-modal';

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
            showModal: false
        }

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    render() {

        return (
            <ol class="list-group list-group-numbered">
                {this.state.entries.map((entry) => {
                    return (
                        <>
                            <div class="row">
                                <div class="col-10">
                                    <div class="list-group">
                                        <button type="button" class="list-group-item list-group-item-action" onClick={this.handleOpenModal}>
                                            <div class="ms-2 me-auto">
                                                <div class="fw-bold">
                                                    {entry.website}
                                                </div>
                                                {entry.url}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-2" style={{ paddingTop: "1%", paddingLeft: "2%" }}>
                                    <button type="button" class="btn btn-outline-danger">
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* This is a modal; Popping up only when making changes to a password entry. */}
                            <ReactModal isOpen={this.state.showModal}>
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Make changes to a password entry</h5>
                                        </div>
                                        <div class="modal-body">
                                            <form>
                                                <div class="form-group">
                                                    <label for="recipient-name" class="col-form-label">Website Alias</label>
                                                    <input type="text" class="form-control" id="recipient-name"></input>
                                                </div>
                                                <div class="form-group">
                                                    <label for="recipient-name" class="col-form-label">URL</label>
                                                    <input type="text" class="form-control" id="recipient-name"></input>
                                                </div>
                                                <div class="form-group">
                                                    <label for="recipient-name" class="col-form-label">Username</label>
                                                    <input type="text" class="form-control" id="recipient-name"></input>
                                                </div>
                                                <div class="form-group">
                                                    <label for="recipient-name" class="col-form-label">Password</label>
                                                    <input type="password" class="form-control" id="recipient-name"></input>
                                                </div>
                                                <div class="form-group">
                                                    <label for="message-text" class="col-form-label">Notes</label>
                                                    <textarea class="form-control" id="message-text"></textarea>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" onClick={this.handleCloseModal}>Close</button>
                                            <button type="button" class="btn btn-primary" onClick={this.handleCloseModal}>Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </ReactModal>
                        </>
                    )
                })}
            </ol>

        )
    }
}
