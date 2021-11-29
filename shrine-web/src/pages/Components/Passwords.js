import { Component } from "react";
import ReactModal from "react-modal";

export default class Passwords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [
        {
          id: "1",
          website: "Pornhub",
          url: "www.pornhub.com",
          usr: "Paul Eggert",
          pwd: 12345678,
          notes: "",
        },
        {
          id: "2",
          website: "Github",
          url: "www.github.com",
          usr: "Paul Eggert",
          pwd: 12345678,
          notes: "",
        },
      ],
      showModal: false,
      entryInModal: {
        id: "",
        website: "",
        url: "",
        usr: "",
        pwd: "",
        notes: "",
      },
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSaveAndCloseModal = this.handleSaveAndCloseModal.bind(this);
  }

  handleOpenModal(entry) {
    this.setState({ entryInModal: entry });
    this.setState({ showModal: true });
  }

  handleSaveAndCloseModal() {
    const newEntries = this.state.entries.map((entry) => {
      if (entry.id === this.state.entryInModal.id) {
        return this.state.entryInModal;
      } else {
        return entry;
      }
    });
    this.setState({ entries: newEntries });
    this.setState({ entryInModal: {} });
    this.setState({ showModal: false });
  }

  handleCloseModal() {
    this.setState({ entryInModal: {} });
    this.setState({ showModal: false });
  }

  modalInPage() {
    return (
      <ReactModal isOpen={this.state.showModal}>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Make changes to a password entry
              </h5>
            </div>
            <div class="modal-body">
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
                          website: e.target.value,
                        },
                      });
                    }}
                    value={this.state.entryInModal.website}
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
                          usr: e.target.value,
                        },
                      });
                    }}
                    value={this.state.entryInModal.usr}
                  ></input>
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="recipient-name"
                    onChange={(e) => {
                      this.setState({
                        entryInModal: {
                          ...this.state.entryInModal,
                          pwd: e.target.value,
                        },
                      });
                    }}
                    value={this.state.entryInModal.pwd}
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
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={this.handleCloseModal}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={this.handleSaveAndCloseModal}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
    );
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
                    <button
                      type="button"
                      class="list-group-item list-group-item-action"
                      onClick={() => {
                        this.handleOpenModal(entry);
                      }}
                    >
                      <div class="ms-2 me-auto">
                        <div class="fw-bold">{entry.website}</div>
                        {entry.url}
                      </div>
                    </button>
                  </div>
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

              {/* This is a modal; Popping up only when making changes to a password entry. */}
              {this.modalInPage()}
            </>
          );
        })}
      </ol>
    );
  }
}
