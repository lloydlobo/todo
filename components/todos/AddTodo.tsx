import {
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { SetStateAction, useState } from "react";
import { KeyedMutator } from "swr";
import { ENDPOINT, TOKEN } from "../../lib/constants";
import { Todo } from "../../lib/interfaces";
import { CrossIcon, PlusIcon } from "../ui";

/**
 * controls if add todo dialog is open or closed
 *
 */
export function AddTodo({
  mutate,
}: {
  mutate: KeyedMutator<Todo[]>;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const form = UseForm();
  const createTodo = createTodoMutate({ mutate, form, setOpen });

  return (
    <>
      <Group position="center">
        <button
          onClick={() => setOpen(true)}
          className="glow btn-sm btn-glow btn mb-3 aspect-square rounded-full transition-all"
          title="Toggle Modal"
          type="button"
        >
          {open ? <CrossIcon /> : <PlusIcon />}
          <span className="sr-only">Add Todo</span>
        </button>
      </Group>

      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Create todo"
        styles={{
          modal: {
            backgroundColor: "hsla(225, 10%, 8%, 1.0)",
            color: "inherit",
          },
        }}
      >
        <Group position="center">
          <Box sx={{ maxWidth: 300 }} mx="auto">
            <form action="submit" onSubmit={form.onSubmit(createTodo)}>
              <TextInput
                label="Add todo"
                mb={12}
                placeholder="What do you want to do?"
                required
                withAsterisk
                {...form.getInputProps("title")}
              />
              <Textarea
                label="Body"
                mb={12}
                placeholder="Tell me more..."
                required
                withAsterisk
                {...form.getInputProps("body")}
              />
              <Checkbox
                mt="md"
                label="Completed"
                {...form.getInputProps("completed", {
                  type: "checkbox",
                })}
              />
              <Group position="center" mt="md">
                <Button type="submit">Create Todo</Button>
              </Group>
            </form>
          </Box>
        </Group>
      </Modal>
    </>
  );
}

interface CreateTodoInterface {
  mutate: KeyedMutator<Todo[]>;
  form: UseFormReturnType<
    {
      title: string;
      body: string;
      completed: boolean;
    },
    (values: { title: string; body: string; completed: boolean }) => {
      title: string;
      body: string;
      completed: boolean;
    }
  >;
  setOpen: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  };
}

function createTodoMutate({ mutate, form, setOpen }: CreateTodoInterface) {
  return async (values: { title: string; body: string }) => {
    const updated = await fetch(`${ENDPOINT}/${TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then((response) => response.json());

    // Mutate here.  // addTodo.mutate(updated);
    mutate(updated);

    // Reset form inputs to initialValues.
    form.reset();

    setOpen(false);
  };
}

function UseForm() {
  return useForm({
    initialValues: {
      title: "",
      body: "",
      completed: false,
    },

    validate: {
      title: (value: string) => {
        if (value.length === 0) return "Title is required";
        if (value.length > 20) return "Title too long";
      },
    },
  });
}

//// /**
////  * @sources https://tkdodo.eu/blog/mastering-mutations-in-react-query
////  */
//// const addTodo = useMutation((newComment) =>
////   fetch(`${ENDPOINT}/${{ token }}`, {
////     method: "POST",
////     headers: { "Content-Type": "application/json" },
////     body: JSON.stringify(todos),
////   }).then((response) => response.json())
//// );
