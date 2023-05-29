import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(1000),
  authorId: z.number().int().positive(),
  isPublished: z.boolean(),
  categoryId: z.number().min(1),
  id: z.number().int().positive(),
  image: z.string().url(),
});
export const articleSchemaCreate = articleSchema.omit({ id: true });
export const articleSchemaUpdate = articleSchema.omit({
  authorId: true,
  isPublished: true,
});
export const articleSchemaDelete = articleSchema.omit({
  title: true,
  content: true,
  authorId: true,
  isPublished: true,
  categoryId: true,
  image: true,
});

const articleSchemaGlobal = articleSchema
  .omit({ isPublished: true, authorId: true })
  .extend({
    createdAt: z.date(),
    author: z.object({ id: z.number(), name: z.string() }),
    category: z.object({ id: z.number(), name: z.string() }),
  });
export type Article = z.infer<typeof articleSchemaGlobal>;

export const userSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z][a-zA-Z ]*$/)
    .min(1)
    .max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  id: z.number().int().positive(),
});
export const userSchemaCreate = userSchema.omit({ id: true });
export const userSchemaUpdate = userSchema.omit({ id: true });
const userSchemaGlobal = userSchema
  .omit({ password: true })
  .extend({ role: z.enum(["ADMIN", "AUTHOR"]) });
export type User = z.infer<typeof userSchemaGlobal>;

export const commentSchema = z.object({
  content: z.string().min(1).max(2500),
  authorId: z.number().int().positive(),
  articleId: z.number().int().positive(),
  id: z.number().int().positive(),
});
export const commentSchemaCreate = commentSchema.omit({ id: true });
export const commentSchemaUpdate = commentSchema;

export const categorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
});
export const categorySchemaCreate = categorySchema.omit({ id: true });
export const categorySchemaUpdate = categorySchema;

const commentSchemaGlobal = commentSchema
  .omit({
    articleId: true,
  })
  .extend({
    author: z.object({ id: z.number(), name: z.string() }),
    updatedAt: z.date(),
  });
export type Comment = z.infer<typeof commentSchemaGlobal>;
