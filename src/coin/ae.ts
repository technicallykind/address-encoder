import { concatBytes } from "@noble/hashes/utils";
import { Coin } from "../types";
import { base58Decode, base58Encode } from "../utils/base58";

const name = "AE";
const coinType = 457;

export const encodeAeAddress = (source: Uint8Array): string => {
  return `ak_${base58Encode(source.slice(2))}`;
};
export const decodeAeAddress = (source: string): Uint8Array => {
  return concatBytes(
    new Uint8Array([0x30, 0x78] /* 0x string */),
    base58Decode(source.slice(3))
  );
};

export const ae = {
  name,
  coinType,
  encode: encodeAeAddress,
  decode: decodeAeAddress,
} as const satisfies Coin;