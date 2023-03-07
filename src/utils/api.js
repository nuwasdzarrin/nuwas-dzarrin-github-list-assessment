import Axios from 'axios'

Axios.defaults.baseURL = 'https://api.github.com';
Axios.defaults.headers.post["Content-Type"] = "application/json";
Axios.defaults.headers.post["Accept"] = "application/json";
// Axios.defaults.headers["Authorization"] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5LCJleHAiOjE2ODEyMDMzODV9.sM93-7A6ATwKvtcwldXbWxIhPyRtf8yAzju-QeRfmw8';

const Api = {
    repos: {
        list: (username, params) => {
            return Axios.get(`/users/${username}/repos`,  {
                params: params,
            });
        },
    },
}

export default Api
