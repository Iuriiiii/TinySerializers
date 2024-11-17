import type { DeserializeOptions } from "@online/tinyserializer/types";
import { Opcode } from "../enums/mod.ts";
import { unumberDeserializer } from "@online/tinyserializer";

export function uInt8ArrayDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): Uint8Array | null {
  const currentOpcode = serialized.at(options.offset)!;

  if (currentOpcode !== Opcode.Uint8Array) {
    return null;
  }

  options.offset++;

  const length = unumberDeserializer(serialized, options);
  const value = serialized.subarray(options.offset, options.offset + length!);
  options.offset += length!;

  return value;
}
