import AxiosClient from './axios';

const TokenAuth = token => {
    if(token) {
        AxiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete AxiosClient.defaults.headers.common["Authorization"];
    }
}

export default TokenAuth;