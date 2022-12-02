import { Todos } from "../../interfaces";
import { SchemaTodos } from "../todos";

/**
 * Validate a todo object.
 *
 * @param todo The todo object to validate.
 * @returns True if the todo object is valid, false otherwise.
 */
export function validateTodos(todos: Todos): boolean {
  return SchemaTodos.safeParse(todos).success;
}
