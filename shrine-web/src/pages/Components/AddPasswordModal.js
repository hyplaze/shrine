import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

export default function AddPasswordModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        class="list-group-item btn btn-outline-primary"
        aria-current="true"
        onClick={handleShow}
      >
        Add a new password
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add a new password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">
                Website Alias
              </label>
              <input
                type="text"
                class="form-control"
                id="recipient-name"
              ></input>
            </div>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">
                URL
              </label>
              <input
                type="text"
                class="form-control"
                id="recipient-name"
              ></input>
            </div>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">
                Username
              </label>
              <input
                type="text"
                class="form-control"
                id="recipient-name"
              ></input>
            </div>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="recipient-name"
              ></input>
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">
                Notes
              </label>
              <textarea class="form-control" id="message-text"></textarea>
            </div>
          </form>
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
