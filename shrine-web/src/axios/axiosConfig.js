import axios from "axios";
require("dotenv").config();

export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_HOST,
  //"http://localhost:3000/",
});
