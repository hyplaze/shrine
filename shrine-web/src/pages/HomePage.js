import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import axios from "../axios/axiosConfig";
import NavBar from "./Components/NavBar";
import Passwords from "./Components/Passwords";






const HomePage = () => {
  const history = useHistory();
  const [boxes, setBoxes] = useState([]);

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

  const retrieveBoxesIndex = async (cookie) => {
    const response = await axios({
      method: "post",
      url: "/basicrequest",
      data: {
        cookie: cookie,
      },
    });
    setBoxes(response.data);
    console.log("get response");
    console.log(response.data);
    console.log(boxes);
  };

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
      retrieveBoxesIndex(localStorage.getItem("cookie"));
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
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        <div class="col-9">
          <Passwords entries={boxes} setEntries={setBoxes} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
