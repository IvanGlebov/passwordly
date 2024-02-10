import { List } from "@raycast/api";

const GeneralSettingsListItem = () => {
  return (
    <List.Item
      title="General settings"
      detail={<List.Item.Detail markdown={"# General settings \n Noting to see here"} />}
    />
  );
};

export default GeneralSettingsListItem;
