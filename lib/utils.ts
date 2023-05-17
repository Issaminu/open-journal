import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export enum Role {
  ADMIN = "ADMIN",
  AUTHOR = "AUTHOR",
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Depreciated in favor of userSchema parsing in lib/zod.ts
export function validateUser(name: string, email: string, password: string) {
  const regexName = /^[a-zA-Z][a-zA-Z ]*$/;
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  try {
    if (regexName.test(name) == false) {
      throw { message: "The entered name is invalid" };
    }
    if (name.length < 3 || name.length > 30) {
      throw { message: "Name must be >= 3 and <=30 characters" };
    }
    if (regexEmail.test(email) == false) {
      throw { message: "The entered email address is not valid" };
    }
    if (password.length < 8) {
      throw { message: "The password must be >= 8 characters" };
    }
  } catch (error: any) {
    return { valid: false, message: error.message as string };
  }
  return { valid: true, message: "success" as string };
}

export type CustomErrorType = Error & { status?: number };
export function CustomError(message: string, status?: number): CustomErrorType {
  let error: CustomErrorType = Error(message);
  if (status) error.status = status;
  return error;
}

export function isCustomError(x: any): x is CustomErrorType {
  return !!x && "status" in x && "message" in x;
}
