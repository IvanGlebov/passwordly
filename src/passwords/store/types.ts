import { ServiceEntry } from "../services/utils/createNewService";

export type WriteDataToStorageProps = {
  key: string;
  content: string;
};

export type WriteDataToStorage = (props: WriteDataToStorageProps) => void;

export type ReadDataFromStore = (key: string) => ServiceEntry;

export type GetPasswordsStore = () => Map<string, string>;
