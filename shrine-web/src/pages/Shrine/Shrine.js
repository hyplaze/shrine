import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "./../../axios/axiosConfig";
import "./Shrine.css";

import Header from "./Header";
import AddBox from "./AddBox";
import BoxList from "./BoxList";
import BoxDetail from "./BoxDetail";
import EditBox from "./EditBox";

function Shrine() {
  const [boxes, setBoxes] = useState([]);

  // Retrieve all boxes from the database
  const retrieveBoxes = async () => {
    // TODO: need further change to axios
    const response = await axios.get("/boxes");
    return response.data;
  };

  const addBoxHandler = async (box) => {
    console.log(box);
    const request = {
      id: uuidv4(),
      ...box,
    };

    const response = await axios.post("/boxes", request);
    console.log(response);
    setBoxes([...boxes, response.data]);
  };

  const updateBoxHandler = async (box) => {
    const response = await axios.put(`/boxes/${box.id}`, box);
    const { id, name, email } = response.data;
    setBoxes(
      boxes.map((box) => {
        return box.id === id ? { id, name, email } : box;
      })
    );
  };

  const removeBoxHandler = async (id) => {
    await axios.delete(`/boxes/${id}`);
    const newBoxesList = boxes.filter((box) => {
      return box.id !== id;
    });

    setBoxes(newBoxesList);
  };

  useEffect(() => {
    const getAllBoxes = async () => {
      const allBoxes = await retrieveBoxes();
      if (allBoxes) setBoxes(allBoxes);
    };
    getAllBoxes();
  }, []);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/shrine"
            exact
            render={(props) => (
              <BoxList {...props} boxes={boxes} getBoxId={removeBoxHandler} />
            )}
          />
          <Route
            path="/shrine/add"
            render={(props) => (
              <AddBox {...props} addBoxHandler={addBoxHandler} />
            )}
          />

          <Route
            path="/shrine/edit"
            render={(props) => (
              <EditBox {...props} updateBoxHandler={updateBoxHandler} />
            )}
          />

          <Route path="/shrine/box/:id" component={BoxDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default Shrine;
