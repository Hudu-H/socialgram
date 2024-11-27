import { z } from "zod";

// SIGNUP VALIDATION
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "name too short"}),
  username: z.string().min(2, { message: "username too short"}),
  email: z.string().email(),
  password: z.string().min(8, { message: "password too short"})
  });

  // SIGN IN VALIDATION
  export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "password too short"})
    })


    // POST VALIDATION
    export const PostValidation = z.object({
      caption: z.string().min(2).max(1800),
      file: z.custom<File[]>(),
      location: z.string().min(2).max(50),
      tags: z.string(),
      });