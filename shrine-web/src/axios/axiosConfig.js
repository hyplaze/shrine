import axios from "axios"

export default axios.create({
	baseURL: "http://localhost:3000/",
})

// axios.defaults.baseURL = "http://localhost:1337";