// prettier-ignore
import { Button, Center, Checkbox, Container, Flex, Grid, Group, List, Modal, Notification, SimpleGrid, TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDatabase, IconGripVertical, IconX } from "@tabler/icons";
import { useState } from "react";
import useSWR from "swr";
import { Layout } from "../../components";
import { fetcher } from "../../lib/api";
import { ENDPOINT, TOKEN } from "../../lib/constants";
import { Todo } from "../../lib/interfaces";
import { SchemaTodos } from "../../lib/schemas";

const stylesTextInput = (theme) => ({
  input: {
    borderColor: "transparent",
    "&:focus-within": {
      borderColor: theme.colors.orange[7],
    },
    backgroundColor: "transparent",
  },
});
export default function TodosPage() {
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      title: "",
      body: "",
      completed: false,
      id: 0,
    },
  });
  const { data, error, mutate } = useSWR<Todo[]>(TOKEN, fetcher);
  // prettier-ignore
  if (error) return <NotificationError title="Server error: SWR!" message={error} />;
  if (!data) return <NotificationLoading />;
  const validSchema = SchemaTodos.safeParse(data);
  // prettier-ignore
  if (!validSchema.success) return ( <NotificationError title="Runtime error: Type check validation failed!" message={validSchema.error.message} />);

  const handleAddTodo = async (values: unknown) => {
    const updated = await fetch(`${ENDPOINT}/${TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then((response) => response.json());
    form.reset();
    setOpened(false);
    mutate(updated); // Mutating here helps to quickly update todo app ui.
  };

  const handleOnChange = async (checked: boolean, id: Todo["id"]) => {
    const inputURL = `${ENDPOINT}/${TOKEN}/${id}/${
      checked ? "completed" : "uncompleted"
    }`;
    const updated = await fetch(inputURL, { method: "PATCH" }).then(
      (response) => response.json()
    );
    mutate(updated);
  };

  return (
    <>
      <Layout title="Todos">
        <>
          <div className="mt-12">
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title="Introduce yourself!"
            >
              {/* Modal content */}
              <Container mt={50}>
                <div style={{ maxWidth: 320, margin: "auto" }}>
                  <form
                    onSubmit={form.onSubmit((values) => handleAddTodo(values))}
                  >
                    <TextInput
                      label="Title"
                      placeholder="Title"
                      {...form.getInputProps("title")}
                    />
                    <TextInput
                      mt="md"
                      label="Body"
                      placeholder="Body"
                      {...form.getInputProps("body")}
                    />
                    <Group position="center" mt="xl">
                      <Button
                        leftIcon={<IconDatabase />}
                        variant="outline"
                        type="submit"
                      >
                        Set random values
                      </Button>
                    </Group>
                  </form>
                </div>
              </Container>
            </Modal>
          </div>

          <Group position="center">
            <Button onClick={() => setOpened(true)} variant="outline">
              Open Modal
            </Button>
          </Group>
        </>

        <>
          <Container mt={50}>
            <Flex
              direction={"column"}
              className="w-full divide-y-2 divide-gray6"
            >
              {data.map((todo) => (
                <div
                  key={`todo__list${todo.id}`}
                  className="transition-all hover:bg-gray6/40"
                >
                  <div className="flex items-start gap-4 py-1">
                    <Flex align={"start"} mt={12} gap={4}>
                      <IconGripVertical size={18} />
                      <Checkbox
                        defaultChecked={todo.completed} // label={todo.title}
                        onChange={({ target }) =>
                          handleOnChange(target.checked, todo.id)
                        }
                      />
                    </Flex>
                    <Flex direction={"column"} className="w-full">
                      <TextInput
                        styles={(theme) => ({
                          input: {
                            borderColor: "transparent",
                            "&:focus-within": {
                              borderColor: theme.colors.gray[7],
                            },
                            backgroundColor: "transparent",
                          },
                        })}
                        placeholder={"Title"}
                        className="w-full"
                        defaultValue={todo.title} // {...form.getInputProps(`${todo}.title`)}
                      />
                      <TextInput
                        styles={(theme) => ({
                          input: {
                            borderColor: "transparent",
                            "&:focus-within": {
                              borderColor: theme.colors.gray[7],
                            },
                            backgroundColor: "transparent",
                            fontSize: theme.fontSizes.xs,
                          },
                        })}
                        placeholder="Body"
                        className="w-full"
                        defaultValue={todo.body}
                      />
                    </Flex>
                  </div>
                </div>
              ))}
            </Flex>
          </Container>
        </>
      </Layout>
    </>
  );
}

//// To avoid CORS error, update go fiber or similar backend server.
//// export default function TodosPage() {
////   const { data, mutate, error } = useSWR<Todo[]>(TOKEN, fetcher);
////   if (typeof data !== "undefined") {
////     if (!validateTodos(data)) return <>Something went wrong!</>;
////     if (error) return "An error has occured: " + error.message;
////     return getJSXElement(data, mutate);
////   }
////   return <>Data is undefined</>;
//// }
//
//// function getJSXElement(
////   todos: Todos,
////   mutate: KeyedMutator<Todo[]>
//// ): JSX.Element {
////   return (
////     <Layout title="Todos app">
////       <div className="grid max-w-3xl px-8 mx-auto">
////         <section>
////           <header>
////             <div className="flex items-center w-full mb-4">
////               <h1 className="items-center flex-1 my-0 text-purple-400">
////                 Disney agenda
////               </h1>
////               <AddTodo mutate={mutate} />
////             </div>
////           </header>
//
////           {todos.length ? (
////             <TodoList todos={todos} mutate={mutate} />
////           ) : (
////             <p className="text-center">No todos found</p>
////           )}
////         </section>
////       </div>
////     </Layout>
////   );
//// }
//
//// // FIXME: text-current resets to sans-serif.!!!
//
//// export function TodoList({
////   todos,
////   mutate,
//// }: {
////   todos: Todo[];
////   mutate: KeyedMutator<Todo[]>;
//// }) {
////   const handleOnChangeCompleted = (e: ChangeEvent<HTMLInputElement>) => {
////     e.preventDefault();
////     const val = e.target.value;
////     console.log(val);
////   };
//
////   const markToDoAsDone = async (
////     // e: FormEvent<HTMLLIElement>,
////     id: Todo["id"]
////   ) => {
////     // e.preventDefault();
////     let isDone = false;
////     const updated = await fetch(
////       `${ENDPOINT}/${TOKEN}/${id}/${isDone ? "completed" : "pending"}`,
////       {
////         method: "PATCH",
////       }
////     ).then((response) => response.json());
////     const gotTodos = SchemaTodos.safeParse(updated);
////     if (!gotTodos.success) return console.error(gotTodos.error);
////     mutate(gotTodos.data);
////   };
//
////   return (
////     <>
////       {/* <div className="grid divide-y-[1px] divide-gray4/30 transition-all"> */}
////       <Box
////         sx={(thing) => ({
////           padding: "2rem",
////           width: "100%",
////           maxWidth: "40rem",
////           margin: "0 auto",
////         })}
////       >
////         <List
////           spacing="xs"
////           size="sm"
////           mb="12"
////           center
////           className="divide-y-[1px] divide-gray4/30"
////         >
////           <>
////             {todos.map((todo) => (
////               <List.Item
////                 onClick={() => markToDoAsDone(todo.id)}
////                 // onChange={(e) => markToDoAsDone(e, todo.id)}
////                 defaultChecked={todo.completed}
////                 key={`todo__list__${todo.id}`}
////                 icon={
////                   todo.completed ? (
////                     <ThemeIcon color={"teal"} size={16} radius="xl">
////                       <CheckIcon className="h-4" />
////                     </ThemeIcon>
////                   ) : (
////                     <ThemeIcon color={"gray"} size={16} radius="xl">
////                       <CheckIcon className="h-2" />
////                     </ThemeIcon>
////                   )
////                 }
////               >
////                 <Checkbox
////                   checked={todo.completed}
////                   onChange={(e) => {
////                     handleOnChangeCompleted(e);
////                   }}
////                   tabIndex={-1}
////                   size="md"
////                   mr="xl"
////                   styles={{ input: { cursor: "pointer" } }}
////                 />
////                 <TodoItem
////                   todo={todo}
////                   className="p-2 transition-all text-gray2 hover:bg-gray6 dark:text-gray7"
////                 />
////               </List.Item>
////             ))}
////           </>
////         </List>
////       </Box>
////       {/* </div> */}
////     </>
////   );
//// }
//
//// export function TodoItem({
////   todo,
////   className,
//// }: {
////   todo: Todo;
////   className?: string;
//// }) {
////   return (
////     <div className={`${className}`}>
////       <div className="flex items-start gap-x-4">
////         <input
////           type="checkbox"
////           defaultChecked={todo.completed}
////           className="my-1"
////           onChange={(e) => {
////             alert(e.target.checked ? "true" : "false");
////           }}
////         />
////         <div className="grid w-full">
////           <h2 className="my-0 text-sm">{todo.title}</h2>
////           <div className="flex w-full">
////             <p className="flex-1 my-0 mr-auto text-sm">{todo.body}</p>
////             <div className="my-0 tag ">list-{todo.userId}</div>
////           </div>
////         </div>
////       </div>
////     </div>
////   );
//// }
//
//// //// const { isLoading, error, isSuccess, data } = useQuery(["serverData"], () => ////   fetcher(token) //// );
//// //// if (isLoading) return "Loading...";
//// //// if (isSuccess) return getJSXElement(data);

export function NotificationError({
  title,
  message,
}: {
  title: string;
  message: string;
}): JSX.Element {
  return (
    <Container>
      <Center style={{ width: "100vw", height: "100vh" }}>
        <Notification
          icon={<IconX size={18} />}
          color="red"
          loading
          title={title}
          disallowClose
        >
          {message}
        </Notification>
      </Center>
    </Container>
  );
}

export function NotificationLoading({
  title = "Loading",
  message = "",
}: {
  title?: string;
  message?: string;
}): JSX.Element {
  return (
    <Container>
      <Center style={{ width: "100vw", height: "100vh" }}>
        <Notification loading title={title} disallowClose>
          {message}
        </Notification>
      </Center>
    </Container>
  );
}
