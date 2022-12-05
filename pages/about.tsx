import { Center, Checkbox, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import useSWR from "swr";
import { DivderPill, Layout } from "../components";
import { ENDPOINT_EXPRESS, ENDPOINT_EXPRESS_TOKEN } from "../lib/constants";
import { Todo } from "../lib/interfaces";
import { NotificationError } from "./todos";

const fetcher = async (url: string) => {
  return await fetch(url).then((res) => res.json());
};
/* 	// Use a new CORS application.
 app.Use(cors.New(cors.Config{
  AllowOrigins: "http://localhost:3000",
  AllowHeaders: "Origin, Content-Type, Accept",
 })) */
// const EXPRESS_ENDPOINT = "http://localhost:5000/api/todos";
const EXPRESS_ENDPOINT = "https://todo-6a68.onrender.com/api/todos";
export default function About() {
  const { data, error, mutate } = useSWR<Todo[]>(EXPRESS_ENDPOINT, fetcher);
  //   const form = useForm();
  if (error)
    return <NotificationError title={"Server error: useSWR"} message={error} />;
  if (!data)
    return <NotificationError title={"Data not found"} message={error} />;
  console.log(data);

  const handleTopdoComplete = async (checked: boolean, id: Todo["id"]) => {
    const statusToken = `${checked ? "completed" : "uncompleted"}`;

    const updated = await fetch(`${EXPRESS_ENDPOINT}/${id}/${statusToken}`, {
      method: "PATCH",
    }).then((response) => response.json());
    mutate(updated);
  };

  return (
    <Layout title="About">
      <section title="hero">
        <header>
          <h1 className="text-center">About Page</h1>
          <DivderPill />
          <div className="todos">
            <Center>
              <div className="grid min-w-[40%] place-items-center gap-1">
                {data.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center w-full grid-flow-col px-8 py-4 m-0 gap-x-4 place-self-center bg-gray7"
                  >
                    <Checkbox
                      defaultChecked={todo.completed}
                      className="w-fit"
                      onChange={({ target }) =>
                        handleTopdoComplete(target.checked, todo.id)
                      }
                    />
                    <div className="grid w-full">
                      <span className="font-bold">{todo.title}</span>
                      <span className="text-xs">{todo.body}</span>
                    </div>
                    {/* <span>{todo.userId}</span> */}
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
