import Axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid'

const axios = Axios.create({
  baseURL: "http://135.181.57.251:3048/api",
  // withCredentials: true,
});

axios.interceptors.request.use((reqConfig) => {
  const config = { ...reqConfig };

  if (!config.headers["Authorization"]) {
    const accessToken = Cookies.get("token");

    // console.log(accessToken);
    // if (accessToken && accessToken !== "undefined") {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
      config.headers["Request-Id"] = uuidv4();
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Request-Id": "eef836f0-1a0d-43e5-8200-b02fe4730ce4",
    //   },
      // config.headers.authorization = accessToken;
    // }
  }
  return config;
});

axios.interceptors.response.use(
  function (response) {
    console.log("Returing respone")
    return response;
  },

  async function (error) {
    console.log(error)
    if (error?.response?.status === 401) {
      console.log("Returing error")
    }
  },
);

// const refreshAccessToken = async () => {
//   const refreshToken = Cookies.get("refreshToken");
//   const token = Cookies.get("token");

//   if (
//     !(refreshToken && token) ||
//     refreshToken === "undefined" ||
//     token === "undefined"
//   ) {
//     return Promise.reject("Access denied... No token found");
//   }

//   const tokens = await axios.post("/v1/auth/refresh-token", {
//     refreshToken: refreshToken,
//   });

//   Cookies.set("token", tokens.token);
//   Cookies.set("refreshToken", tokens.refreshToken);
//   return Promise.resolve(tokens);
// };

export default axios;