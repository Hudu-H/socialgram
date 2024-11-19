import { z } from "zod";

export const SignupValidation = z.object({
  name: z.string().min(2, { message: "name too short"}),
  username: z.string().min(2, { message: "username too short"}),
  email: z.string().email(),
  password: z.string().min(8, { message: "password too short"})
  });