import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1])) as Record<string, any>;
  } catch (e) {
    return null;
  }
};

export function timeoutPromise(promise, timeout = 5000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(promise);
    }, timeout);
  }).catch((err) => {
    // Ensure the original promise rejection is still propagated
    throw err;
  });
}
