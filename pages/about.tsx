import { Center } from "@mantine/core";
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
export default function About() {
  const { data, error } = useSWR<Todo[]>(
    "http://localhost:5000/api/todos",
    fetcher
  );
  if (error)
    return <NotificationError title={"Server error: useSWR"} message={error} />;
  if (!data)
    return <NotificationError title={"Data not found"} message={error} />;
  console.log(data);

  return (
    <Layout title="About">
      <section title="hero">
        <header>
          <h1 className="text-center">About Page</h1>
          <DivderPill />
          <div className="todos">
            <Center>
              {data.map((todo) => (
                <div key={todo.id} className="flex gap-4">
                  <p>{todo.title}</p>
                  <p>{todo.body}</p>
                  <p>{todo.completed}</p>
                  <p>{todo.userId}</p>
                </div>
              ))}
            </Center>
          </div>
        </header>
      </section>
    </Layout>
  );
}
