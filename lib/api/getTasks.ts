import axios from "axios";
import { URL_API } from "../constants";

export async function getTasks(): Promise<any> {
    const data = await axios.get(URL_API);
    console.log(data);
    return Promise.resolve(data);
}
