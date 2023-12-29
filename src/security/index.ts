import crypto from "node:crypto";
import { TencryptPassword, TgetServicePassword, TinitCrypto, TsetServicePassword } from "./types";
import getCrypto from "./crypto";
import { LocalStorage, showHUD } from "@raycast/api";
import { DEFAULT_ENCRYPTION_METHOD, DEFAULT_HASHING_METHOD } from "./const";

const readPasswordsStorage = async () => {
  const data = await LocalStorage.getItem("passwords");
  if (data === undefined) {
    return new Error("Error reading or storage is clear");
  }
  if (typeof data !== "string") {
    return new Error("Storage data is not string");
  }

  if (data) {
    try {
      const passwords = JSON.parse(data);
      return passwords;
    } catch (error) {
      return error;
    }
  }
};

const writePasswordsStorage = async (passwords: Record<string, string>) => {
  await LocalStorage.setItem("passwords", JSON.stringify(passwords));
};

const syncPasswordsStorage = async () => {};

const passwordsMap = new Map();

export const getSerivcePassword: TgetServicePassword = ({ service }) => {
  const encryptedPassword = passwordsMap.get(service.name);

  return encryptedPassword;
};

export const setServicePassword: TsetServicePassword = async ({ service, password }) => {
  encryptPassword({ password }).then((encryptedPassword) => {
    passwordsMap.set(service.name, encryptedPassword);
    console.log(encryptPassword);
    console.log("2");

    showHUD(`Password was set to: ${encryptPassword}`);
  });
};

export const initCrypto: TinitCrypto = ({ secretKey, secretIV }) => {
  const key = crypto.createHash(DEFAULT_HASHING_METHOD).update(secretKey).digest("hex").substring(0, 32);
  const encryptionIV = crypto.createHash(DEFAULT_HASHING_METHOD).update(secretIV).digest("hex").substring(0, 16);
  return { key, encryptionIV };
};

export const encryptPassword: TencryptPassword = async ({
  password,
  encryptionMethod = DEFAULT_ENCRYPTION_METHOD,
  hashingMethod = DEFAULT_HASHING_METHOD,
}) => {
  const cryptoInitResponse = await getCrypto();
  if (!cryptoInitResponse) {
    showHUD("Crypto not initialized. Moving to initialization");
    return "";
  } else {
    const { key, encryptionIV } = cryptoInitResponse;
    crypto.createHash(hashingMethod);

    const cipher = crypto.createCipheriv(encryptionMethod, key, encryptionIV);
    return Buffer.from(cipher.update(password, "utf8", "hex") + cipher.final("hex")).toString("base64");
  }
};

export const decryptPassword = (password: string) => {
  return password;
};
