import { showHUD } from "@raycast/api";
import { DEFAULT_ENCRYPTION_METHOD, DEFAULT_HASHING_METHOD } from "./conts";
import { EncryptPassword } from "./types";
import crypto from "node:crypto";
import { getCrypto } from "./crypto";

export const encryptString: EncryptPassword = async ({
  string,
  encryptionMethod = DEFAULT_ENCRYPTION_METHOD,
  hashingMethod = DEFAULT_HASHING_METHOD,
}) => {
  const { secretIV, secretKey } = await getCrypto();
  if (!secretIV && !secretKey) {
    showHUD("Crypto not initialized. Moving to initialization");
    return "";
  } else {
    crypto.createHash(hashingMethod);

    const cipher = crypto.createCipheriv(encryptionMethod, secretKey, secretIV);
    return Buffer.from(cipher.update(string, "utf8", "hex") + cipher.final("hex")).toString("base64");
  }
};
