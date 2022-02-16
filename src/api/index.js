import axios from "axios";
import get from "lodash-es/get";

const httpClient = axios.create({ baseURL: "http://localhost:8080/api/" });

httpClient.interceptors.response.use(
  (response) => {
    console.debug(`Response fulfilled ${JSON.stringify(response, null, 2)}`);
    return response;
  },
  (error) => {
    if (401 === get(error, "response.status")) {
      const redirectUrl = `${window.location.origin}/login`;
      console.debug(`Redirecting to ${redirectUrl}`);
      window.location.href = redirectUrl;
      return Promise.reject({ ...error, isForwarding: true });
    }
    return Promise.reject(error);
  }
);

export { httpClient };
