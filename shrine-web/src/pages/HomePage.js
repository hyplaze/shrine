import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import axios from "./../axios/axiosConfig";

const HomePage = () => {
  const history = useHistory();
  const [boxes, setBoxes] = useState([]);
  const [cookie, setCookie] = useState("");
  const [stretchedMasterKey, setStretchedMasterKey] = useState("");

  const retrieveBoxesIndex = async () => {
    const response = await axios({
      method: "get",
      url: "/basicrequest",
      data: {
        cookie: cookie,
      },
    });
    console.log(response);
    return response;
  };

  useEffect(() => {
    if (
      !(
        localStorage.getItem("cookie") &&
        localStorage.getItem("stretchedMasterKey")
      )
    ) {
      localStorage.clear();
      history.replace("/login");
    } else {
      console.log("successfully get cookie and stretchedMasterKey");
    }
  }, [history]);

  return <div>HomePage</div>;
};

export default HomePage;
