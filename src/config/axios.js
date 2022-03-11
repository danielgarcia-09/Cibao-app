import axios from "axios";
import Envs from "./EnvSettings";

const AxiosClient = axios.create({
    baseURL: Envs.API_URL
})

export default AxiosClient;