import { Coin } from "../types";
import { createEosDecoder, createEosEncoder } from "../utils/eosio";

const name = "HIVE";
const coinType = 825;

const prefix = "STM";

export const encodeHiveAddress = createEosEncoder(prefix);
export const decodeHiveAddress = createEosDecoder(prefix);

export const hive = {
  name,
  coinType,
  encode: encodeHiveAddress,
  decode: decodeHiveAddress,
} as const satisfies Coin;