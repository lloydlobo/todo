import { z } from "zod";

export const SchemaTodo = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
  completed: z.boolean(),
});

export const SchemaTodos = z.array(SchemaTodo);
