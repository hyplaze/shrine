import { Component } from "react";
import ReactModal from 'react-modal';
import "../index.css"

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
                },
                {
                    website: "Github",
                    url: "www.github.com",
                    usr: "Paul Eggert",
                    pwd: 12345678,
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
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                <div class="ms-2 me-auto">
                                    <div class="fw-bold">
                                        {entry.website}
                                    </div>
                                    {entry.url}
                                </div>
                                <button type="button" class="btn btn-outline-primary float-right" onClick={this.handleOpenModal}>
                                    Inspect
                                </button>
                            </li>
                            <ReactModal
                                isOpen={this.state.showModal}
                                contentLabel="Minimal Modal Example"
                            >
                                <button onClick={this.handleCloseModal}>Close Modal</button>
                            </ReactModal>
                        </>
                    )
                })}
            </ol>

        )
    }
}

export default Passwords