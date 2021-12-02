import { Component } from "react";
import NavBar from "./Components/NavBar";
import { decrypt } from "../crypto/encryption";
import axios from "../axios/axiosConfig";
const sha1 = require("js-sha1");

var pwnd_dict = {};

async function getBreach() {
  const response = await axios({
    method: "post",
    url: "/basicrequest",
    data: {
      cookie: localStorage.getItem("cookie"),
    },
  });

  for (const item of response.data) {
    await checkBreach(item);
  }

  async function checkBreach(item) {
    if ("password" in item) {
      const decryptedPassword = await decrypt(
        item.password,
        localStorage.getItem("stretchedMasterKey")
      );
      const digest = sha1(decryptedPassword).toUpperCase();

      const digestFront = digest.slice(0, 5);
      const digestEnd = digest.slice(-35);
      const res = await axios.get(
        "https://api.pwnedpasswords.com/range/" + digestFront
      );

      let pwnd_list = res.data.split("\r\n");

      pwnd_list.forEach(createDictionary);

      function createDictionary(i) {
        const pwnd_pair = i.split(":");
        if (pwnd_pair[0] === digestEnd) {
          pwnd_dict[item.boxname] = pwnd_pair[1];
        }
      }
    }
  }

  const breaches = Object.keys(pwnd_dict).length;
}

export default class CheckerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0, //# of boxes we found has breached
      pressed: false, //did we start to check yet?
      breached: pwnd_dict, //the list of boxnames and how many time it has been breached
    };

    this.Change = this.Change.bind(this);
  }

  Change(event) {
    getBreach().then(() => {
      this.setState({
        value: Object.keys(pwnd_dict).length,
        pressed: true,
        breached: pwnd_dict,
      });
    });
  }

  render() {
    let p; //text for showing if have any boxes that is breached, if there is display the number of it
    let o = []; //text for shwoing the boxname and how many times it is found.
    let q; //text explain what you should do, what does this check mean
    if (this.state.pressed) {
      //[1] make the output look nicer
      if (this.state.value !== 0) {
        p = (
          <h6 class="text-danger">
            {"WARNING: Total " + this.state.value + " breaches"}
          </h6>
        );
        for (var i = 0; i < this.state.value; i++) {
          o.push(
            <span class="list-group-item" key={"b" + i}>
              {'In the box "' +
                Object.keys(this.state.breached)[i] +
                '": password has been seen ' +
                Object.values(this.state.breached)[i] +
                " times before."}
            </span>
          );
        }
      } else {
        p = (
          <h6 class="text-success">
            {"There are no password breaches. You are good to go."}
          </h6>
        );
      }
    }

    return (
      <div class="container-fluid">
        <div class="row">
          <NavBar page="CheckerPage" />
        </div>
        <div class="row mt-3">
          <div class="col-3">
            <div class="list-group">
              <button
                type="button"
                class="list-group-item list-group-item-action"
                onClick={this.Change}
              >
                Check vulnerabilities
              </button>
              <p class="m-2">
                <em>
                  A vulnerability indicates that a password has previously
                  appeared in a data breach and should never be used. If a
                  vulnerability happens, please change password{" "}
                  <strong> immediately</strong>.
                </em>
              </p>
            </div>
          </div>
          <div class="col-9">
            <div class="card">
              <div class="card-header fw-bold">{p}</div>
              {o}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
