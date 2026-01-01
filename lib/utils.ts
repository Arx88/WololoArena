import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function areArraysEqual(a: any[] | null | undefined, b: any[] | null | undefined): boolean {
  if (a === b) return true; // Same reference or both null/undefined
  if (!a || !b || a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
