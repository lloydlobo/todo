import useSWR from "swr";
import { DivderPill, Layout } from "../components";
import { ENDPOINT_EXPRESS, ENDPOINT_EXPRESS_TOKEN } from "../lib/constants";
import { NotificationError } from "./todos";

const fetcher = async (urlToken: string) => {
  return await fetch(`${ENDPOINT_EXPRESS}/${urlToken}`).then((res) =>
    res.json()
  );
};
/* 	// Use a new CORS application.
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	})) */
export default function About() {
  const { data, error } = useSWR(ENDPOINT_EXPRESS_TOKEN, fetcher);
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
        </header>
      </section>
    </Layout>
  );
}
