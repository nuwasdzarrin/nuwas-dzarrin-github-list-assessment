import Axios from 'axios'

Axios.defaults.baseURL = 'https://api.github.com';
Axios.defaults.headers.post["Content-Type"] = "application/json";
Axios.defaults.headers.post["Accept"] = "application/json";

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
