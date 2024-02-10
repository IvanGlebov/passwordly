import { Toast, showHUD, showToast } from "@raycast/api";
import { encryptString } from "../cryptography";
import createService from "./utils/createNewService";
import { writeDataToStorage } from "../store";

export type Service = {
  name: string;
  password: string;
  description?: string;
  otherAttributes?: Record<string, string>;
};

type SaveNewServiceProps = Service & { pop: () => void };
type SaveNewService = (props: SaveNewServiceProps) => void;

const saveNewService: SaveNewService = async ({ name, password, description, pop, otherAttributes }) => {
  const encryptedPassword = await encryptString({ string: password });
  // if something has gone wrong encryptedPassword should be an empty string now.
  if (encryptedPassword === "") {
    showHUD("Password encryption error");
  }
  console.log("Encrypted password: ", encryptedPassword);

  const serviceEntry = createService({ name, password: encryptedPassword, description, otherAttributes });
  writeDataToStorage({ key: serviceEntry.name, content: serviceEntry.content });
  pop();
  showToast({ title: "Service added", style: Toast.Style.Success });
};

export default saveNewService;
