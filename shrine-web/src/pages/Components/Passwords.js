import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
// import AddPasswordModal from "./AddPasswordModal";

export default class Passwords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: this.props.entries,
      showInspectModal: false,
      showEditModal: false,
      entryInModal: {},
      setEntries: this.props.setEntries,
    };
    this.handleOpenInspectModal = this.handleOpenInspectModal.bind(this);
    this.handleCloseInspectModal = this.handleCloseInspectModal.bind(this);
    this.InspectModal = this.InspectModal.bind(this);

    this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
    this.handleSaveAndCloseEditModal =
      this.handleSaveAndCloseEditModal.bind(this);
    this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
    this.EditModal = this.EditModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.entries !== this.props.entries) {
      this.setState({ entries: this.props.entries });
    }
  }

  handleOpenInspectModal() {
    this.setState({ showInspectModal: true });
  }

  handleCloseInspectModal() {
    this.setState({ entryInModal: {} });
    this.setState({ showInspectModal: false });
  }

  InspectModal() {
    return (
      <>
        <Modal
          show={this.state.showInspectModal}
          onHide={this.handleCloseInspectModal}
        >
          <Modal.Header>
            <Modal.Title>Inspect a box</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  Name
                </label>
                <input
                  readOnly
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  onChange={(e) => {
                    this.setState({
                      entryInModal: {
                        ...this.state.entryInModal,
                        boxname: e.target.value,
                      },
                    });
                  }}
                  value={this.state.entryInModal.boxname}
                ></input>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  URL
                </label>
                <input
                  readOnly
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  onChange={(e) => {
                    this.setState({
                      entryInModal: {
                        ...this.state.entryInModal,
                        url: e.target.value,
                      },
                    });
                  }}
                  value={this.state.entryInModal.url}
                ></input>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  Username
                </label>
                <input
                  readOnly
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  onChange={(e) => {
                    this.setState({
                      entryInModal: {
                        ...this.state.entryInModal,
                        username: e.target.value,
                      },
                    });
                  }}
                  value={this.state.entryInModal.username}
                ></input>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  Password
                </label>
                <input
                  readOnly
                  type="password"
                  class="form-control"
                  id="recipient-name"
                  onChange={(e) => {
                    this.setState({
                      entryInModal: {
                        ...this.state.entryInModal,
                        password: e.target.value,
                      },
                    });
                  }}
                  value={this.state.entryInModal.password}
                ></input>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  Password
                </label>
                <input
                  readOnly
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  onChange={(e) => {
                    this.setState({
                      entryInModal: {
                        ...this.state.entryInModal,
                        twoFA: e.target.value,
                      },
                    });
                  }}
                  value={this.state.entryInModal.twoFA}
                ></input>
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">
                  Notes
                </label>
                <textarea
                  readOnly
                  class="form-control"
                  id="message-text"
                  onChange={(e) => {
                    this.setState({
                      entryInModal: {
                        ...this.state.entryInModal,
                        notes: e.target.value,
                      },
                    });
                  }}
                  value={this.state.entryInModal.notes}
                ></textarea>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseInspectModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  handleOpenEditModal() {
    this.setState({ showEditModal: true });
  }

  handleSaveAndCloseEditModal() {
    console.log("current entryinmodal is", this.state.entryInModal);
    console.log("save and close");
    let entryInModalIsInEntries = false;
    const newEntries = this.state.entries.map((entry) => {
      if (entry.id === this.state.entryInModal.id) {
        entryInModalIsInEntries = true;
        return this.state.entryInModal;
      } else {
        return entry;
      }
    });
    if (entryInModalIsInEntries === false) {
      newEntries.push(this.state.entryInModal);
    }
    console.log("Updated", newEntries);
    this.setState({ entries: newEntries });
    this.state.setEntries(newEntries);
    this.setState({ entryInModal: {} });
    this.setState({ showEditModal: false });
  }

  handleCloseEditModal() {
    this.setState({ entryInModal: {} });
    this.setState({ showEditModal: false });
  }

  EditModal() {
    return (
      <>
        <Modal
          show={this.state.showEditModal}
          onHide={this.handleCloseEditModal}
        >
          <Modal.Header>
            <Modal.Title>Edit a box</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  onChange={(e) => {
                    this.setState({
                      entryInModal: {
                        ...this.state.entryInModal,
                        boxname: e.target.value,
                      },
                    });
                  }}
                  value={this.state.entryInModal.boxname}
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
                  onChange={(e) => {
                    this.setState({
                      entryInModal: {
                        ...this.state.entryInModal,
                        url: e.target.value,
                      },
                    });
                  }}
                  value={this.state.entryInModal.url}
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
                  onChange={(e) => {
                    this.setState({
                      entryInModal: {
                        ...this.state.entryInModal,
                        username: e.target.value,
                      },
                    });
                  }}
                  value={this.state.entryInModal.username}
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
                  onChange={(e) => {
                    this.setState({
                      entryInModal: {
                        ...this.state.entryInModal,
                        password: e.target.value,
                      },
                    });
                  }}
                  value={this.state.entryInModal.password}
                ></input>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  2FA
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  onChange={(e) => {
                    this.setState({
                      entryInModal: {
                        ...this.state.entryInModal,
                        twoFA: e.target.value,
                      },
                    });
                  }}
                  value={this.state.entryInModal.twoFA}
                ></input>
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">
                  Notes
                </label>
                <textarea
                  class="form-control"
                  id="message-text"
                  onChange={(e) => {
                    this.setState({
                      entryInModal: {
                        ...this.state.entryInModal,
                        notes: e.target.value,
                      },
                    });
                  }}
                  value={this.state.entryInModal.notes}
                ></textarea>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseEditModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={this.handleSaveAndCloseEditModal}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  render = () => {
    console.log("rendering");
    console.log(this.state.entries);
    return (
      <>
        <button
          class="list-group-item btn btn-outline-primary"
          aria-current="true"
          onClick={() => {
            const entry = {};
            entry.id = uuidv4();
            this.setState({ entryInModal: entry });
            this.handleOpenEditModal();
          }}
        >
          Add a new Password
        </button>
        <div class="row" style={{ marginTop: "1%" }}>
          {/* <div class="col-3">
            <div class="list-group">
              <AddPasswordModal />
              <form class="d-flex" style={{ marginTop: "2%" }}>
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div> */}
          <div class="col-9">
            <ol class="list-group list-group-numbered">
              {this.state.entries.map((entry) => {
                return (
                  <div class="card border-grey mb-3">
                    <div class="row ms-2">
                      <div class="col-4" style={{ paddingLeft: "2%" }}>
                        <div class="list-group">
                          <div class="fw-bold">{entry.boxname}</div>
                          {entry.url}
                        </div>
                      </div>
                      <div
                        class="col-1"
                        style={{ paddingTop: "1%", paddingLeft: "2%" }}
                      >
                        <div class="list-group">
                          <this.InspectModal />
                        </div>
                      </div>
                      <div
                        class="col-1"
                        style={{ paddingTop: "1%", paddingLeft: "2%" }}
                      >
                        <Button
                          class="list-group-item list-group-item-action"
                          aria-current="true"
                          onClick={() => {
                            this.setState({ entryInModal: entry });
                            this.handleOpenInspectModal();
                          }}
                        >
                          Inspect
                        </Button>
                      </div>
                      <div
                        class="col-1"
                        style={{ paddingTop: "1%", paddingLeft: "2%" }}
                      >
                        <div class="list-group">
                          <this.EditModal />
                        </div>
                      </div>
                      <div
                        class="col-2 "
                        style={{ paddingTop: "1%", paddingLeft: "2%" }}
                      >
                        <Button
                          class="list-group-item list-group-item-action"
                          aria-current="true"
                          onClick={() => {
                            this.setState({ entryInModal: entry });
                            this.handleOpenEditModal();
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                      <div
                        class="col-2"
                        style={{ paddingTop: "1%", paddingLeft: "2%" }}
                      >
                        <button type="button" class="btn btn-outline-danger">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ol>
          </div>
        </div>
      </>
    );
  };
}
