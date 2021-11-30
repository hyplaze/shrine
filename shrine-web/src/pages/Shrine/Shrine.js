import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "./../axios/axiosConfig";
import "./Shrine.css";

import Header from "./Header";
import AddBox from "./AddBox";
import BoxList from "./BoxList";
import BoxDetail from "./BoxDetail";
import EditBox from "./EditBox";

function Shrine() {
  const [boxes, setBoxes] = useState([]);

  //TODO: BANCKEND CANT RETRIEVE ALL
  // Retrieve all boxes from the database
  const retrieveBoxes = async () => {
    // TODO: need further change to axios
    const response = await axios.get("/boxes");
    //TODO:THIS IS COMMENTED OUT FOR COMPILATION SAKE
    // const response = await axios({
    //   method:"post",
    //   url:"/getbox",
    //   data:{
    //     //TODO: PASS IN REAL COOKIE
    //     cookie:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtcGgiOiIyMzQyMzEzIiwiaWF0IjoxNjM4MTA0NDc1LCJleHAiOjE2MzgxMTUyNzV9.vxy9PUitPcte1Va0015fNhkxLR4D9TJJjstOZMGIJYU",
    //     boxid: box.id
    //   }
    // })
    return response.data;
  };

  const addBoxHandler = async (box) => {
    console.log("I am a box "+ box);
    const request = {
      id: uuidv4(),
      ...box,
    };

    //TODO: change boxes to be able to identify these keys
    const {id,name,twoFA,username,url,password} = box;
    console.log("I am id "+id);
    console.log("I am boxname "+name);
    console.log("I am twoFA "+ twoFA);
    // const response = await axios.post("/boxes", request);
    const response = await axios({
      method: 'post',
      url: '/addbox',
      data:{
        //TODO: PASS IN REAL COOKIE
        cookie:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtcGgiOiIyMzQyMzEzIiwiaWF0IjoxNjM4MTA0NDc1LCJleHAiOjE2MzgxMTUyNzV9.vxy9PUitPcte1Va0015fNhkxLR4D9TJJjstOZMGIJYU",
        boxid: id,
        boxname:name,
        twoFA: twoFA,
        username: username,
        url: url,
        password: password
      }
    });
    console.log("I am response "+response);
    setBoxes([...boxes, response.data]);
  };

  const updateBoxHandler = async (box) => {
    // const response = await axios.put(`/boxes/${box.id}`, box);
    const response = await axios({
      method: 'pose',
      url: '/getbox',
      data:{
        //TODO: PASS IN REAL COOKIE
        cookie:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtcGgiOiIyMzQyMzEzIiwiaWF0IjoxNjM4MTA0NDc1LCJleHAiOjE2MzgxMTUyNzV9.vxy9PUitPcte1Va0015fNhkxLR4D9TJJjstOZMGIJYU",
        boxid:boxid
      }
    })
    //retrieve accoridng to backend keys
    const { boxid, name, twoFA, username, url, password} = response.data; 
    
    const id = boxid //make up for different key names
    setBoxes(
      boxes.map((box) => {
        //TODO: change Email field
        return box.id === id ? { id, name, twoFA } : box;
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
