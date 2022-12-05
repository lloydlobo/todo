import { Center, Checkbox } from "@mantine/core";
import useSWR from "swr";
import { DivderPill, Layout } from "../components";
import { Todo, User } from "../lib/interfaces";
import { getNodeEnv } from "../lib/util";
import { NotificationError } from "./todos";

export const fetcher = async (url: string) => {
  return await fetch(url).then((res) => res.json());
};

const API_ENDPOINT = "https://todo-6a68.onrender.com";
const API_TOKEN = {
  getAll: "api/getAll",
};

const baseURL =
  getNodeEnv() === "development" ? "http://localhost:5000" : API_ENDPOINT;

export default function About() {
  const { data, error, mutate } = useSWR<User[]>(
    `http://localhost:5000/${API_TOKEN.getAll}`,
    fetcher
  );

  const handleTopdoComplete = async (checked: boolean, id: Todo["id"]) => {
    const statusToken = `${checked ? "completed" : "uncompleted"}`;
    const updated = await fetch(`${API_ENDPOINT}/${id}/${statusToken}`, {
      method: "PATCH",
    }).then((response) => response.json());

    mutate(updated);
  };

  if (error) {
    return <NotificationError title={"Server error: useSWR"} message={error} />;
  }
  if (!data) {
    return <NotificationError title={"Data not found"} message={error} />;
  }

  return (
    <Layout title="About">
      <section title="hero">
        <header>
          <h1 className="text-center">About Page</h1>
          <DivderPill />
          <div className="users">
            <Center>
              <div className="grid min-w-[40%] place-items-center gap-1">
                {data.map((user, index) => (
                  <div
                    key={`user__${user._id}__${index}`}
                    className="flex items-center w-full grid-flow-col px-8 py-4 m-0 gap-x-4 place-self-center bg-gray7"
                  >
                    {/* <Checkbox defaultChecked={user.completed} className="w-fit" onChange={({ target }) => handleTopdoComplete(target.checked, user.id) } /> */}
                    <div className="grid w-full">
                      <span className="font-bold">{user.name}</span>
                      <span className="text-xs">{user.age}</span>
                    </div>
                    <span className="text-xs">{user._id}</span>
                  </div>
                ))}
              </div>
            </Center>
          </div>
        </header>
      </section>
    </Layout>
  );
}
