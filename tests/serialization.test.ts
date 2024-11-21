import {
  dateDeserializer,
  dateSerializer,
  uInt8ArrayDeserializer,
  uInt8ArraySerializer,
} from "../mod.ts";
import { deserialize, serialize } from "@online/tinyserializer";
import { assert, assertEquals } from "@std/assert";

const data1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const data2 = new Uint8Array([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
const data3 = new Uint8Array([21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);

function assertArrayEquals(a: Uint8Array, b: Uint8Array) {
  assert(a.length === b.length);

  for (let i = 0; i < a.length; i++) {
    assert(a[i] === b[i]);
  }
}

Deno.test("uint8array", async (t) => {
  await t.step("plain", () => {
    const serialized = serialize(data1, {
      serializers: [uInt8ArraySerializer],
    });

    const deserialized = deserialize<Uint8Array>(serialized.value, {
      deserializers: [uInt8ArrayDeserializer],
    });

    assertArrayEquals(data1, deserialized.value);
  });

  await t.step("array", () => {
    const serialized = serialize([data1, data2, data3], {
      serializers: [uInt8ArraySerializer],
    });

    const deserialized = deserialize<Uint8Array[]>(serialized.value, {
      deserializers: [uInt8ArrayDeserializer],
    });

    for (let i = 0; i < deserialized.value.length; i++) {
      assertArrayEquals([data1, data2, data3][i], deserialized.value[i]);
    }
  });
});

Deno.test("date", async (t) => {
  await t.step("Date", () => {
    const serializedDate = 1732140602933;
    const date = new Date(serializedDate);
    const serialized = serialize(date, {
      serializers: [dateSerializer],
    });

    const deserialized = deserialize<Date>(serialized.value, {
      deserializers: [dateDeserializer],
    });

    assertEquals(date.toISOString(), deserialized.value.toISOString());
  });
});
