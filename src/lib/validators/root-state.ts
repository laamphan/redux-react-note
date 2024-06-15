import { z } from "zod"

const subtaskValidator = z.object({
  name: z.string(),
  checked: z.boolean(),
})

const noteStateValidator = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  dueDate: z.string().optional(),
  list: z.string().optional(),
  tags: z.array(z.string()),
  subtasks: z.array(subtaskValidator),
  checked: z.boolean(),
})

export const RootStateValidator = z.object({
  note: z.object({
    notes: z.array(noteStateValidator),
    toRender: z.array(noteStateValidator),
    view: z.object({
      type: z.string(),
      value: z.string(),
    }),
  }),
  list: z.object({
    lists: z.array(z.string()),
  }),
  tag: z.object({
    tags: z.array(z.string()),
  }),
})

export type RootStateRequest = z.infer<typeof RootStateValidator>
