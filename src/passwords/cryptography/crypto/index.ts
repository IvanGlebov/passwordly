import crypto from "node:crypto";
import { LocalStorage, Toast, showToast } from "@raycast/api";
import { KEYS } from "./consts";
import { GetCrypto, InitCrypto, SetCrypto } from "./types";
import { useMemo, useState } from "react";
import { DEFAULT_HASHING_METHOD } from "../conts";

export const getCrypto: GetCrypto = async () => {
  const secretKey = await LocalStorage.getItem(KEYS.KEY);
  const secretIV = await LocalStorage.getItem(KEYS.IV);
  if (!secretIV || !secretKey) {
    showToast({
      title: "Crypto not initialized",
      style: Toast.Style.Failure,
      primaryAction: { title: "Init crypto", onAction: () => console.log("Go to init") },
    });
    return { secretKey: undefined, secretIV: undefined };
  }
  if (typeof secretIV === "string" && typeof secretKey === "string") {
    return { secretKey, secretIV };
  } else {
    showToast({
      title: "Crypto data is corrupted",
      style: Toast.Style.Failure,
      primaryAction: { title: "Init crypto", onAction: () => console.log("Go to init") },
    });
    return { secretKey: undefined, secretIV: undefined };
  }
};

export const setCrypto: SetCrypto = async ({ secretKey, secretIV }) => {
  const setSecretKeyPromise = LocalStorage.setItem(KEYS.KEY, secretKey);
  const setSecretIVPromise = LocalStorage.setItem(KEYS.IV, secretIV);

  return Promise.allSettled([setSecretKeyPromise, setSecretIVPromise]);
};

export const initCrypto: InitCrypto = (secretKey, secretIV) => {
  const key = crypto.createHash(DEFAULT_HASHING_METHOD).update(secretKey).digest("hex").substring(0, 32);
  const encryptionIV = crypto.createHash(DEFAULT_HASHING_METHOD).update(secretIV).digest("hex").substring(0, 16);
  return { key, encryptionIV };
};

export const useIsCryptoReady = () => {
  const [secretKey, setSecretKey] = useState<string | undefined>(undefined);
  const [secretIV, setSecretIV] = useState<string | undefined>(undefined);

  getCrypto().then(({ secretKey: key, secretIV: iv }) => {
    if (key && iv) {
      setSecretIV(iv);
      setSecretKey(key);
    }
  });

  const status = useMemo(() => {
    if (secretKey && secretIV) {
      return true;
    } else {
      return false;
    }
  }, [secretKey, secretIV]);

  return status;
};
