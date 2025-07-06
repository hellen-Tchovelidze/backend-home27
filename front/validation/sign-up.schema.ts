import { InferType, number, object, string } from "yup";

export const signUpSchema = object({
  email: string().email().required(),
  password: string().min(8).max(20).required(),
  fullName: string().required(),
  age: number().required(),
});

export type SignUpType = InferType<typeof signUpSchema>