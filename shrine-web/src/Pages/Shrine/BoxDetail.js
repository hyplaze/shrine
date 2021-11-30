import React from "react";
import { Link } from "react-router-dom";

const BoxDetail = (props) => {
  const { name, email } = props.location.state.box;
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/shrine">
          <button className="ui button blue center">Back to Box List</button>
        </Link>
      </div>
    </div>
  );
};

export default BoxDetail;
