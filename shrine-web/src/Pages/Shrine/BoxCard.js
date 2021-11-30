import React from "react";
import { Link } from "react-router-dom";

const BoxCard = (props) => {
  const { id, name, email } = props.box;
  return (
    <div className="item">
      <div className="content">
        <Link
          to={{ pathname: `/shrine/box/${id}`, state: { box: props.box } }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => props.clickHandler(id)}
      ></i>
      <Link to={{ pathname: `/shrine/edit`, state: { box: props.box } }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};

export default BoxCard;
