import { Component } from "react";
import AddPasswordModal from "./AddPasswordModal.jsx"
import InspectModal from "./InspectModal.jsx";

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
        }
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
                                        <div class="col-10">
                                            <div class="list-group">
                                                <InspectModal website={entry.website} url={entry.url} usr={entry.user} pwd={entry.pwd} notes={entry.notes}/>
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