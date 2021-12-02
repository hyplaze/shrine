import React from "react";
import { Link } from "react-router-dom";
import BoxCard from "./BoxCard";

const BoxList = (props) => {
  console.log(props);

  const deleteBoxHandler = (id) => {
    props.getBoxId(id);
  };

  const renderBoxList = props.boxes.map((box) => {
    return <BoxCard box={box} clickHandler={deleteBoxHandler} key={box.id} />;
  });
  return (
    <div className="main">
      <h2>
        Box List
        <Link to="/shrine/add">
          <button className="ui button blue right">Add Box</button>
        </Link>
      </h2>
      <div className="ui celled list">{renderBoxList}</div>
    </div>
  );
};

export default BoxList;
