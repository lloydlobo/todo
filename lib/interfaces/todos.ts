import { z } from "zod";
import { SchemaTodo, SchemaTodos } from "../schemas";

export type Todo = z.infer<typeof SchemaTodo>;
export type Todos = z.infer<typeof SchemaTodos>;
