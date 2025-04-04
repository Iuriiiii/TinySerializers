import { Opcode as TinySerializerOpcode } from "@online/tinyserializer/types";

export enum Opcode {
  Uint8Array = TinySerializerOpcode.Latest + 1,
  Date = TinySerializerOpcode.Latest + 2,
}
