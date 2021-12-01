import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import axios from "../axios/axiosConfig";
import NavBar from "./Components/NavBar";
import Passwords from "./Components/Passwords";

const HomePage = () => {
  const history = useHistory();
  const [boxes, setBoxes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [forceUpdate, setForceUpdate] = useState(0);

  const logoutHandler = async (cookie) => {
    const response = await axios({
      method: "post",
      url: "/logout",
      data: {
        cookie: cookie,
      },
    });
    if (response.data.Status === true) {
      localStorage.clear();
      history.push("/");
      history.go();
    }
  };

  const retrieveBoxesIndex = async () => {
    const response = await axios({
      method: "post",
      url: "/basicrequest",
      data: {
        cookie: localStorage.getItem("cookie"),
      },
    });
    setBoxes(response.data);
    console.log("get response");
    console.log(response.data);
    console.log(boxes);
  };

  const searchHandler = async (boxes) => {
    const results = [];

    console.log("I am searching for " + textInput);

    if (textInput.length === 0) {
      console.log("So we set with no search text");
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
      console.log("So we set with search text");
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
    console.log("the input is now " + textInput);
    retrieveBoxesIndex();
  }, [textInput]);

  useEffect(() => {
    console.log("cookie in localStorage:", localStorage.getItem("cookie"));
    console.log(
      "smk in localStorage",
      localStorage.getItem("stretchedMasterKey")
    );
    if (
      !(
        localStorage.getItem("cookie") &&
        localStorage.getItem("stretchedMasterKey")
      )
    ) {
      localStorage.clear();
      history.replace("/login");
    } else {
      console.log("successfully have cookie and stretchedMasterKey");
      retrieveBoxesIndex();
    }
  }, [history]);

  return (
    <div class="container-fluid">
      <div class="row">
        <NavBar page="HomePage" logoutHandler={logoutHandler} />
      </div>

      <div class="row" style={{ marginTop: "1%" }}>
        <div class="col-3">
          <div class="list-group">
            <form class="d-flex" style={{ marginTop: "2%" }}>
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={textInput}
                onChange={initiateSearch}
              />
              <button
                class="btn btn-outline-success"
                type="submit"
                id="SearchAct"
              >
                Search
              </button>
            </form>
          </div>
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
