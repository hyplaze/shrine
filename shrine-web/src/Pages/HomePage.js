import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import axios from "../axios/axiosConfig";
import NavBar from "./Components/NavBar";
import Passwords from "./Components/Passwords";
import Checker from "./CheckerPage";

const HomePage = () => {
  const history = useHistory();
  const [boxes, setBoxes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [forceUpdate, setForceUpdate] = useState(0);

  const retrieveBoxesIndex = async () => {
    const response = await axios({
      method: "post",
      url: "/basicrequest",
      data: {
        cookie: localStorage.getItem("cookie"),
      },
    });
    setBoxes(response.data);
  };

  const searchHandler = async (boxes) => {
    const results = [];

    if (textInput.length === 0) {
      setSearchResults(boxes);
    } else {
      for (const box of boxes) {
        if (
          ("boxname" in box && box.boxname.includes(textInput)) ||
          ("username" in box && box.username.includes(textInput)) ||
          ("url" in box && box.url.includes(textInput))
        ) {
          results.push(box);
        }
      }
      setSearchResults(results);
    }
    setForceUpdate(forceUpdate + 1);
  };

  const initiateSearch = (e) => {
    setTextInput(e.target.value);
  };

  useEffect(() => {
    searchHandler(boxes);
  }, [boxes]);

  useEffect(() => {
    retrieveBoxesIndex();
  }, [textInput]);

  useEffect(() => {
    async function checkLogin() {
      const response = await axios({
        method: "post",
        url: "/validcookie",
        data: {
          cookie: localStorage.getItem("cookie"),
          email: localStorage.getItem("email"),
        },
      });
      if (
        !(
          localStorage.getItem("cookie") &&
          localStorage.getItem("stretchedMasterKey") &&
          response.data.Status === true
        )
      ) {
        localStorage.clear();
        history.replace("/login");
      } else {
        retrieveBoxesIndex();
      }
    }
    checkLogin();
  }, [history]);

  return (
    <div class="container-fluid">
      <div class="row">
        <NavBar page="HomePage" />
      </div>
      <div class="row mt-3">
        <div class="col-3">
          <div class="card border-grey">
            <h3 class="m-2 p-1">Welcome to Shrine!</h3>
          </div>
          <div class="list-group m-1">
            <form class="d-flex mt-2">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                value={textInput}
                onChange={initiateSearch}
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
          <p class="m-2">
            <em>
              <small>
                Search your shrine with <strong>website name</strong>. The
                result will be shown in real time. You can
                <strong> copy</strong> an entry inside inspection window.{" "}
              </small>
            </em>
          </p>
        </div>
        <div class="col-9">
          <Passwords
            entries={searchResults}
            refresh={retrieveBoxesIndex}
            key={forceUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
