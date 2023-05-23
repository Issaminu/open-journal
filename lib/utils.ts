import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { remark } from "remark";
import html from "remark-html";

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

export function truncateString(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "&hellip;" : str;
}

export function routeIsLoginOrSignup(pathname: string) {
  return pathname.startsWith("/login") || pathname.startsWith("/signup");
}

export function getPrettyDate(date?: Date) {
  const options = {
    month: "short",
    day: "numeric",
  } as Intl.DateTimeFormatOptions;
  const day = date || new Date();
  const suffix = getOrdinalSuffix(day.getDate());
  return `${day.toLocaleString("en-US", options)}${suffix}`;
}

export function getPrettyDateWithYear(date?: Date) {
  const options = {
    month: "short",
    day: "numeric",
  } as Intl.DateTimeFormatOptions;
  const day = date || new Date();
  const suffix = getOrdinalSuffix(day.getDate());
  return `${day.toLocaleString("en-US", options)}${suffix} ${day
    .getFullYear()
    .toString()
    .slice(-2)}`;
}

export function getPrettyDateWithFullYear(date?: Date) {
  const options = {
    month: "short",
    day: "numeric",
  } as Intl.DateTimeFormatOptions;
  const day = date || new Date();
  const suffix = getOrdinalSuffix(day.getDate());
  return `${day.toLocaleString("en-US", options)}${suffix} ${day
    .getFullYear()
    .toString()}`;
}

export function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
