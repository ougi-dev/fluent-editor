/**
 * The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of fluent-editor better.
 *
 * Specifically:
 * - Runtime code from https://github.com/lukeed/clsx/blob/v2.1.1/src/index.js
 * - TypeScript types from https://github.com/lukeed/clsx/blob/v2.1.1/clsx.d.ts
 *
 * Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 */

export type ClassValue =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | ClassDictionary
  | ClassArray;

export type ClassDictionary = Record<string, unknown>;
export type ClassArray = ClassValue[];

export function clsx(...inputs: ClassValue[]): string {
  function normalizeObject(dict: ClassDictionary): string {
    return Object.keys(dict)
      .filter((k) => Boolean(dict[k]))
      .join(" ");
  }

  function normalizeArray(arr: ClassArray): string {
    return arr
      .map((v) => normalize(v))
      .filter((s) => s.length > 0)
      .join(" ");
  }

  function normalize(value: ClassValue): string {
    if (!value) {
      return "";
    }

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "bigint"
    ) {
      return String(value);
    }

    if (Array.isArray(value)) {
      return normalizeArray(value);
    }

    if (typeof value === "object") {
      return normalizeObject(value as ClassDictionary);
    }

    return "";
  }

  const parts = inputs.map(normalize).filter((s) => s.length > 0);
  return parts.join(" ");
}
