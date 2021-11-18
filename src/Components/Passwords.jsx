import { Component } from "react";
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
                    pwd: 12345678
                }
            ]
        }
    }

    render() {
        return (
            <ol class="list-group list-group-numbered">
                {this.state.entries.map((entry) => {
                    return (
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">
                                    {entry.website}
                                </div>
                                {entry.url}
                            </div>
                        </li>
                    )
                })}
            </ol>
        )
    }
}

export default Passwords