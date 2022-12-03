import { ENDPOINT } from "../constants";
import { Todo } from "../interfaces";

export function fetcher<T>(urlToken: string): Promise<T> {
  return fetch(`${ENDPOINT}/${urlToken}`).then((res) => res.json());
}
