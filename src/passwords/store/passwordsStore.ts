import { GetPasswordsStore, ReadDataFromStore, WriteDataToStorage } from "./types";

const passwordsStore = new Map<string, string>();

const writeDataToStorage: WriteDataToStorage = ({ key, content }) => {
  console.log("WRITE TO STORE");

  passwordsStore.set(key, content);
  console.log("PASSWORDS STORE:");
  console.log(passwordsStore);
};

const getPasswordsStore: GetPasswordsStore = () => {
  return passwordsStore;
};

const readDataFromStore: ReadDataFromStore = (name) => {
  const content = passwordsStore.get(name) || "";
  return { name, content };
};

export { writeDataToStorage, getPasswordsStore, readDataFromStore };
