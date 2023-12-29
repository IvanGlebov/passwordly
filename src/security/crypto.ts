import { LocalStorage } from "@raycast/api";
import { TinitCryptoProps } from "./types";

const getCrypto = async () => {
  const key = await LocalStorage.getItem("key");
  const encryptionIV = await LocalStorage.getItem("encryptionIV");
  if (!key || !encryptionIV) {
    throw new Error("Crypto is not initialized");
  }
  if (key && encryptionIV) {
    return { key: key as string, encryptionIV: encryptionIV as string };
  }
};

export const setCrypto = async ({ secretKey, secretIV }: TinitCryptoProps) => {
  return Promise.allSettled([LocalStorage.setItem("key", secretKey), LocalStorage.setItem("encryptionIV", secretIV)]);
};

export default getCrypto;
