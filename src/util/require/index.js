import axios from "axios";

let instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = token; //请求头加上token
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    // if (response.data.code) {
    //   switch (response.data.code) {
    //   }
    // }
    return response;
  },
  (error) => {
    return Promise.reject(error.response.status);
  }
);

export default instance;
