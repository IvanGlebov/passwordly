import { writeDataToStorage, getPasswordsStore } from "./passwordsStore";
import { WriteDataToStorageProps, WriteDataToStorage, GetPasswordsStore } from "./types";

export { writeDataToStorage, getPasswordsStore };
export type {
  WriteDataToStorage as WritePasswordToStorage,
  WriteDataToStorageProps as WritePasswordToStorageProps,
  GetPasswordsStore,
};
