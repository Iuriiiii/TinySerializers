import { NumberSerializationType } from "@online/tinyserializer/types";
import { mergeBuffers, numberSerializer } from "@online/tinyserializer";
import { Opcode } from "../enums/mod.ts";

export function uInt8ArraySerializer(
  value: unknown,
): Uint8Array | null {
  if (!(value instanceof Uint8Array)) {
    return null;
  }

  const prefix = new Uint8Array([Opcode.Uint8Array]);
  const serializedLength = numberSerializer(
    value.length,
    NumberSerializationType.Unsigned,
  );

  return mergeBuffers(prefix, serializedLength, value);
}
