import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

export default
function InspectModal(website, url, usr, pwd, notes) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button class="list-group-item list-group-item-action" aria-current="true" onClick={handleShow}>

                currently with error.
            </Button>


            <Modal show={show} onHide={handleClose}>
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
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
