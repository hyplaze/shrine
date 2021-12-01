import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import axios from "../../axios/axiosConfig";
// import AddPasswordModal from "./AddPasswordModal";

import { encrypt, decrypt } from "../../crypto/encryption";

import { computeHOTP, computeTOTP } from "../../twoFA/twoFA";

export default class Passwords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: this.props.entries,
      showInspectModal: false,
      showEditModal: false,
      entryInModal: {},
      decryptedEntry: {},
      remainingSeconds: 0,
      refresh: this.props.refresh,
      showPassword: false,
    };
    this.handleOpenInspectModal = this.handleOpenInspectModal.bind(this);
    this.handleCloseInspectModal = this.handleCloseInspectModal.bind(this);
    this.InspectModal = this.InspectModal.bind(this);

    this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
    this.handleSaveAndCloseEditModal =
      this.handleSaveAndCloseEditModal.bind(this);
    this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
    this.EditModal = this.EditModal.bind(this);
    this.handleShowPassword = this.handleShowPassword.bind(this);

    this.countDown = this.countDown.bind(this);
    this.timer = 0;
  }

  // componentDidUpdate(prevProps) {
  //   console.log("componentDidUpdate", prevProps.entries, this.props.entries);
  //   if (prevProps.entries !== this.props.entries) {
  //     this.setState({ entries: this.props.entries });
  //   }
  // }

  countDown() {
    let remainingSeconds = this.state.remainingSeconds - 1;
    remainingSeconds = Math.floor(
      (Date.now() - Math.floor(Date.now() / 30000) * 30000) / 1000
    );
    this.setState({ remainingSeconds });
    if (remainingSeconds === 0) {
      this.handleUpdate2FA();
      this.setState({ remainingSeconds: 30 });
    }
  }

  handleOpenInspectModal = async (entry) => {
    this.timer = setInterval(() => {
      this.countDown();
    }, 1000);

    this.setState({
      showInspectModal: true,

      entryInModal: {
        ...entry,
        password: await decrypt(
          entry.password,
          localStorage.getItem("stretchedMasterKey")
        ),
        twoFA: await computeTOTP(
          await decrypt(entry.twoFA, localStorage.getItem("stretchedMasterKey"))
        ),
      },
      decryptedEntry: {
        ...entry,
        password: await decrypt(
          entry.password,
          localStorage.getItem("stretchedMasterKey")
        ),
        twoFA: await decrypt(
          entry.twoFA,
          localStorage.getItem("stretchedMasterKey")
        ),
      },
      remainingSeconds: Math.floor(
        (Date.now() - Math.floor(Date.now() / 30000) * 30000) / 1000
      ),
    });
  };

  handleCloseInspectModal = () => {
    this.setState({ entryInModal: {} });
    this.setState({ showInspectModal: false });
    this.setState({ showPassword: false });
    this.setState({ decryptedEntry: {} });
    this.setState({ remainingSeconds: 0 });
    clearInterval(this.timer);
  };

  handleShowPassword = (prevState) => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleUpdate2FA = async () => {
    console.log("handleUpdate2FA", this.state.decryptedEntry);
    this.setState({
      entryInModal: {
        ...this.state.entryInModal,
        twoFA: await computeTOTP(this.state.decryptedEntry.twoFA),
      },
    });
  };

  InspectModal = () => {
    console.log(this.state.remainingSeconds);
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  Name
                </label>
                <div class="input-group mb-3">
                  <input
                    readOnly
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    value={this.state.entryInModal.boxname}
                  ></input>
                  <button
                    class="btn btn-outline-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        this.state.entryInModal.boxname
                      );
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  URL
                </label>
                <div class="input-group mb-3">
                  <input
                    readOnly
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    value={this.state.entryInModal.url}
                  ></input>
                  <button
                    class="btn btn-outline-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        this.state.entryInModal.url
                      );
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  Username
                </label>
                <div class="input-group mb-3">
                  <input
                    readOnly
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    value={this.state.entryInModal.username}
                  ></input>
                  <button
                    class="btn btn-outline-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        this.state.entryInModal.username
                      );
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  Password
                </label>
                <div class="input-group mb-3">
                  <input
                    readOnly
                    type={this.state.showPassword ? "text" : "password"}
                    class="form-control"
                    id="recipient-name"
                    value={this.state.entryInModal.password}
                    onClick={this.handleShowPassword}
                  ></input>
                  <button
                    class="btn btn-outline-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        this.state.entryInModal.password
                      );
                    }}
                  >
                    Copy
                  </button>
                </div>
                <div class="form-text">
                  {"Click on password to " +
                    (this.state.showPassword ? "hide" : "show") +
                    " password"}
                </div>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  2FA
                </label>
                <div class="input-group mb-3">
                  <input
                    readOnly
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    value={
                      this.state.entryInModal.twoFA +
                      " (refresh in " +
                      (30 -
                        Math.floor(
                          (Date.now() -
                            Math.floor(Date.now() / 30000) * 30000) /
                            1000
                        )) +
                      " seconds)"
                    }
                    onClick={this.handleUpdate2FA}
                  ></input>
                  <button
                    class="btn btn-outline-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        this.state.entryInModal.twoFA
                      );
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">
                  Notes
                </label>
                <textarea
                  readOnly
                  class="form-control"
                  id="message-text"
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
  };

  handleOpenEditModal = async (entry) => {
    this.setState({
      showEditModal: true,

      entryInModal: {
        ...entry,
        password:
          "password" in entry
            ? await decrypt(
                entry.password,
                localStorage.getItem("stretchedMasterKey")
              )
            : "",
        twoFA:
          "twoFA" in entry
            ? await decrypt(
                entry.twoFA,
                localStorage.getItem("stretchedMasterKey")
              )
            : "",
      },
    });
  };

  handleSaveAndCloseEditModal = async () => {
    console.log("save and close");
    console.log("current entryinmodal is", this.state.entryInModal);
    let response = null;
    const data = {
      cookie: localStorage.getItem("cookie"),
      boxid: this.state.entryInModal.boxid,
      boxname: this.state.entryInModal.boxname,
      twoFA: await encrypt(
        this.state.entryInModal.twoFA,
        localStorage.getItem("stretchedMasterKey")
      ),
      username: this.state.entryInModal.username,
      url: this.state.entryInModal.url,
      password: await encrypt(
        this.state.entryInModal.password,
        localStorage.getItem("stretchedMasterKey")
      ),
    };
    if (
      this.props.entries
        .map((entry) => entry.boxid)
        .includes(this.state.entryInModal.boxid)
    ) {
      // should be edit
      response = await axios({
        method: "post",
        url: "/changebox",
        data: data,
      });
    } else {
      // should be add
      response = await axios({
        method: "post",
        url: "/addbox",
        data: data,
      });
    }
    console.log("response is", response);
    if (response.data.Status === true) {
      console.log("We refresh");
      this.state.refresh();
    }
    this.setState({ entryInModal: {} });
    this.setState({ showEditModal: false });
    this.setState({ showPassword: false });
  };

  handleCloseEditModal = () => {
    this.setState({ entryInModal: {} });
    this.setState({ showEditModal: false });
    this.setState({ showPassword: false });
  };

  EditModal = () => {
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  Name
                </label>
                <div class="input-group mb-3">
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
                  <button
                    class="btn btn-outline-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        this.state.entryInModal.boxname
                      );
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  URL
                </label>
                <div class="input-group mb-3">
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
                  <button
                    class="btn btn-outline-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        this.state.entryInModal.url
                      );
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  Username
                </label>
                <div class="input-group mb-3">
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
                  <button
                    class="btn btn-outline-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        this.state.entryInModal.username
                      );
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  Password
                </label>
                <div class="input-group mb-3">
                  <input
                    type={this.state.showPassword ? "text" : "password"}
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
                    onClick={this.handleShowPassword}
                  ></input>
                  <button
                    class="btn btn-outline-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        this.state.entryInModal.password
                      );
                    }}
                  >
                    Copy
                  </button>
                </div>
                <div class="form-text">
                  {"Click on password to " +
                    (this.state.showPassword ? "hide" : "show") +
                    " password"}
                </div>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  2FA
                </label>
                <div class="input-group mb-3">
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
                  <button
                    class="btn btn-outline-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        this.state.entryInModal.twoFA
                      );
                    }}
                  >
                    Copy
                  </button>
                </div>
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
  };

  handleDelete = async (boxid) => {
    const response = await axios({
      method: "post",
      url: "/deletebox",
      data: {
        cookie: localStorage.getItem("cookie"),
        boxid: boxid,
      },
    });
    if (response.data.Status === true) this.state.refresh();
  };
  render = () => {
    // console.log("rendering");
    // console.log(this.state.entries);
    return (
      <>
        <button
          class="list-group-item btn btn-outline-primary"
          aria-current="true"
          onClick={() => {
            const entry = {};
            entry.boxid = uuidv4();
            this.handleOpenEditModal(entry);
            console.log("open");
          }}
        >
          Add a new Password
        </button>
        <div class="row" style={{ marginTop: "1%" }}>
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
                      ></div>
                      <div
                        class="col-1"
                        style={{ paddingTop: "1%", paddingLeft: "2%" }}
                      >
                        <Button
                          class="list-group-item list-group-item-action"
                          aria-current="true"
                          onClick={async () => {
                            console.log(entry);
                            await this.handleOpenInspectModal(entry);
                          }}
                        >
                          Inspect
                        </Button>
                      </div>
                      <div
                        class="col-1"
                        style={{ paddingTop: "1%", paddingLeft: "2%" }}
                      ></div>
                      <div
                        class="col-2 "
                        style={{ paddingTop: "1%", paddingLeft: "2%" }}
                      >
                        <Button
                          class="list-group-item list-group-item-action"
                          aria-current="true"
                          onClick={() => {
                            this.handleOpenEditModal(entry);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                      <div
                        class="col-2"
                        style={{ paddingTop: "1%", paddingLeft: "2%" }}
                      >
                        <button
                          type="button"
                          class="btn btn-outline-danger"
                          onClick={() => {
                            this.handleDelete(entry.boxid);
                          }}
                        >
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
        <this.EditModal />
        <this.InspectModal />
      </>
    );
  };
}
