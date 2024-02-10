import { List } from "@raycast/api";
import GeneralSettingsListItem from "./GeneralSettingsListItem";
import CryptoSettingsListItem from "./CryptoSettingsListItem";

const Settings = () => {
  return (
    <List isShowingDetail={true}>
      <CryptoSettingsListItem />
      <GeneralSettingsListItem />
    </List>
  );
};

export default Settings;
