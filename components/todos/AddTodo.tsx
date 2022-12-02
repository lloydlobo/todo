import {
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { ENDPOINT } from "../../lib/constants";

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

/**
 * controls if add todo dialog is open or closed
 *
 */
export function AddTodo({ mutation }): JSX.Element {
  const [open, setOpen] = useState(false);
  const form = UseForm();

  const handleSubmitForm = async (values: { title: string; body: string }) => {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then((response) => response.json());

    // Reset form inputs to initialValues.
    form.reset();

    setOpen(false);
  };

  return (
    <>
      <Group position="center">
        <button
          onClick={() => setOpen(true)}
          className="glow btn-glow btn mb-3"
          title="Toggle Modal"
          type="button"
        >
          Add Todo
        </button>
      </Group>

      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Create todo"
        styles={{
          modal: {
            backgroundColor: "hsla(0, 0%, 10%, 0.9)",
            color: "inherit",
          },
          // overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)", },
        }}
      >
        <Group position="center">
          <Box sx={{ maxWidth: 300 }} mx="auto">
            <form action="submit" onSubmit={form.onSubmit(handleSubmitForm)}>
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
