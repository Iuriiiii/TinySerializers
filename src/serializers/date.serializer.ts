import type { SerializeOptions } from "@online/tinyserializer/types";
import { mergeBuffers, numberSerializer } from "@online/tinyserializer";
import { Opcode } from "../enums/mod.ts";

export function dateSerializer(
  value: unknown,
  options: SerializeOptions,
): Uint8Array | null {
  if (!(value instanceof Date)) {
    return null;
  }

  options.objectDatabase.getOrInsert(value);
  const prefix = new Uint8Array([Opcode.Date]);
  const serializedDate = numberSerializer(
    value.getTime(),
    options,
  );

  return mergeBuffers(prefix, serializedDate);
}
