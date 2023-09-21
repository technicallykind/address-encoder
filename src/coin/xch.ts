import { Coin } from "../types";
import { createBech32mDecoder, createBech32mEncoder } from "../utils/bech32";

const name = "XCH";
const coinType = 8444;

const hrp = "xch";
const limit = 90;

export const encodeXchAddress = createBech32mEncoder(hrp, limit);
export const decodeXchAddress = createBech32mDecoder(hrp, limit);

export const xch = {
  name,
  coinType,
  encode: encodeXchAddress,
  decode: decodeXchAddress,
} as const satisfies Coin;