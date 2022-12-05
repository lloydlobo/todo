// prettier-ignore
import { ActionIcon, Button, Center, Checkbox, Container, Flex, Grid, Group, List, Modal, Notification, SimpleGrid, TextInput, UnstyledButton } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconDatabase,
  IconEdit,
  IconGripVertical,
  IconTrash,
  IconUpload,
  IconX,
} from "@tabler/icons";
import { useState } from "react";
import useSWR from "swr";
import { Layout, PlusIcon } from "../../components";
import { fetcher } from "../../lib/api";
import { ENDPOINT, TOKEN } from "../../lib/constants";
import { Todo } from "../../lib/interfaces";
import { SchemaTodos } from "../../lib/schemas";

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

  const handleUpdateTodo = async (id: Todo["id"], values: unknown) => {
    const updated = await fetch(`${ENDPOINT}/${TOKEN}/${id}/update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then((response) => response.json());
    mutate(updated); // Mutating here helps to quickly update todo app ui.
  };

  const handleDeleteTodo = async (id: Todo["id"]) => {
    const inputURL = `${ENDPOINT}/${TOKEN}/${id}/delete`;
    const updated = await fetch(inputURL, { method: "DELETE" }).then(
      (response) => response.json()
    );
    mutate(updated);
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

  // TODO The PUT method // https://medium.com/@9cv9official/what-are-get-post-put-patch-delete-a-walkthrough-with-javascripts-fetch-api-17be31755d28
  // The PUT method is most often used to update an existing resource. If you want to update a specific resource (which comes with a specific URI), you can call the PUT method to that resource URI with the request body containing the complete new version of the resource you are trying to update.
  return (
    <>
      <Layout title="Todos">
        <>
          <div className="mt-12">
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title="Add new todo"
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
                      autoFocus
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
                        Add todo
                      </Button>
                    </Group>
                  </form>
                </div>
              </Container>
            </Modal>
          </div>

          <Group position="center">
            <Button onClick={() => setOpened(true)} variant="outline">
              <Flex align="center" justify={"start"} gap={4}>
                <PlusIcon className="h-auto w-auto" />
                Create
              </Flex>
            </Button>
          </Group>
        </>

        <>
          <Container mt={50}>
            <Flex
              direction={"column"}
              className="w-full divide-y-2 divide-gray6"
            >
              {data.map((todo, index) => (
                <TodoItem
                  key={`todo__${index}__${todo.id}`}
                  todo={todo}
                  handleDeleteTodo={handleDeleteTodo}
                  handleOnChange={handleOnChange}
                  handleUpdateTodo={handleUpdateTodo}
                />
              ))}
            </Flex>
          </Container>
        </>
      </Layout>
    </>
  );
}

function TodoItem({
  todo,
  handleDeleteTodo,
  handleOnChange,
  handleUpdateTodo,
}: {
  todo: Todo;
  handleDeleteTodo: (id: Todo["id"]) => Promise<void>;
  handleOnChange: (checked: boolean, id: Todo["id"]) => Promise<void>;
  handleUpdateTodo: (id: Todo["id"], values: unknown) => Promise<void>;
}): JSX.Element {
  const [edit, setEdit] = useState(false);
  const form = useForm<Todo>({
    initialValues: {
      id: todo.id,
      userId: todo.userId,
      title: todo.title,
      body: todo.body,
      completed: todo.completed,
    },
    validate: {
      title: (value) =>
        value.length < 2 ? "Title must have atlest 2 letters." : null,
      // body: (value) => value.length < 2 ? "Body must have atlest 2 letters." : null,
    },
  });

  const onUpdateClick = (id: Todo["id"], values: Todo) => {
    setEdit(false);
    handleUpdateTodo(todo.id, form.values);
  };

  return (
    <>
      <div
        className={`todo ${
          !edit ? "" : "editing py-4 font-bold shadow-3xl"
        } px-2 transition-all`}
      >
        <form
          onSubmit={form.onSubmit((values) => console.log(values))}
          className="flex items-start gap-2 py-1 "
        >
          <Flex
            title="todo actions"
            align={"center"}
            mt={12}
            gap={16}
            className={`todo__actions`}
          >
            <UnstyledButton>
              <IconGripVertical size={18} />
            </UnstyledButton>
            <Flex direction={"row"}>
              <UnstyledButton onClick={() => handleDeleteTodo(todo.id)}>
                <IconTrash />
              </UnstyledButton>
              {!edit ? (
                <ActionIcon type="button" onClick={() => setEdit(!edit)}>
                  <IconEdit />
                </ActionIcon>
              ) : (
                <ActionIcon
                  type="submit"
                  onClick={() =>
                    onUpdateClick(form.getInputProps("id"), form.values)
                  }
                >
                  <IconUpload />
                </ActionIcon>
              )}
            </Flex>
            <ActionIcon className="items-center">
              <Checkbox
                defaultChecked={{ ...form.getInputProps(`completed`) }.value} // label={todo.title}
                onChange={({ target }) =>
                  handleOnChange(target.checked, todo.id)
                }
              />
            </ActionIcon>
          </Flex>

          <Flex
            title="todo content"
            direction={"column"}
            className="w-full px-4"
          >
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
              disabled={!edit}
              placeholder={"Title"}
              className="w-full"
              {...form.getInputProps(`title`)}
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
              disabled={!edit}
              className="w-full"
              {...form.getInputProps(`body`)}
            />
          </Flex>
        </form>
      </div>

      <style>
        {`
      .todo__actions{
        opacity: 0.5
      }

      .todo.editing .todo__actions {
        opacity: 1.0
      }

      .todo:hover .todo__actions {
        opacity: 1.0;
      }
      `}
      </style>
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
