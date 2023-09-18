import { keccak_256 } from "@noble/hashes/sha3";
import { Hex, bytesToHex, hexToBytes, stringToBytes } from "./bytes";

export const stripHexPrefix = (str: string): string =>
  str.startsWith("0x") ? str.slice(2) : str;

export function checksumAddress(address_: string, chainId?: number): string {
  const hexAddress = chainId
    ? `${chainId}${address_.toLowerCase()}`
    : address_.substring(2).toLowerCase();
  const hash = keccak_256(stringToBytes(hexAddress));

  const address = (
    chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress
  ).split("");
  for (let i = 0; i < 40; i += 2) {
    if (hash[i >> 1] >> 4 >= 8 && address[i]) {
      address[i] = address[i].toUpperCase();
    }
    if ((hash[i >> 1] & 0x0f) >= 8 && address[i + 1]) {
      address[i + 1] = address[i + 1].toUpperCase();
    }
  }

  return `0x${address.join("")}`;
}

export function isAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function isValidChecksumAddress(
  address: string,
  chainId?: number
): boolean {
  return isAddress(address) && checksumAddress(address, chainId) === address;
}

export const createHexChecksummedEncoder =
  (chainId?: number) => (source: Uint8Array) =>
    checksumAddress(bytesToHex(source), chainId);

export const createHexChecksummedDecoder =
  (chainId?: number) => (source: string) => {
    if (!isValidChecksumAddress(source, chainId)) {
      throw Error("Unrecognised address format");
    }
    return hexToBytes(source as Hex);
  };