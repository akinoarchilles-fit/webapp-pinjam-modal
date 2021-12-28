import Axios from 'axios';

const AxiosInstance = Axios.create({
  headers: {
    Accept: 'application/json',
  },
});

AxiosInstance.interceptors.request.use(
  async function (config) {
    try {
      const {method, url, headers} = config;

      console.log(`Request ${method.toUpperCase()} ${url}: `, config);
    } catch (e) {
      console.log('AxiosInstance.interceptors.request Error:', e);
    }
    return config;
  },
  function (error) {
    console.log('Request Error: ', error);
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  async function (response) {
    try {
      const {method, url} = response.config;
      console.log(`Response ${method.toUpperCase()} ${url}: `, response);
    } catch (e) {
      console.log('AxiosInstance.interceptors.response Error:', e);
    }
    return response;
  },
  async function (error) {
    try {
      const {method, url} = error.response.config;

      if (error.response) {
        console.log(
          `Response Error ${method.toUpperCase()} ${url}: `,
          error.response,
        );
      }
    } catch (e) {
      console.log('Response Error:', e);
    }
    return Promise.reject(error);
  },
);

export default AxiosInstance;
