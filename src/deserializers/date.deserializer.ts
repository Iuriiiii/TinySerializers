import type { DeserializeOptions } from "@online/tinyserializer/types";
import { Opcode } from "../enums/mod.ts";
import { numberDeserializer } from "@online/tinyserializer";

export function dateDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): Date | null {
  const currentOpcode = serialized.at(options.offset)!;

  if (currentOpcode !== Opcode.Date) {
    return null;
  }

  options.offset++;
  const serializedDate = numberDeserializer(serialized, options);

  return new Date(serializedDate);
}
