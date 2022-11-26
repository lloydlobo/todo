import axios from "axios";
import { URL_API } from "../constants";

export async function getTasks(): Promise<any> {
  const { data } = await axios.get(URL_API);
  return Promise.resolve(data);
}
