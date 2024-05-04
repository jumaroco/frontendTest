import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_URL_BASE;

const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
    }
  };

const requestGeneric = {
    get: (url) => axios.get(url,config),
    post: (url, body) => axios.post(url, body,config),
    put: (url, body) => axios.put(url, body,config),
    delete: (url) => axios.delete(url,config)
}

export default requestGeneric;