import { Todo } from "../../interfaces";
import { SchemaTodo } from "../todos";

/**
 * Validate a todo object.
 *
 * @param todo The todo object to validate.
 * @returns True if the todo object is valid, false otherwise.
 */
export function validateTodo(todo: Todo): boolean {
  return SchemaTodo.safeParse(todo).success;
}
