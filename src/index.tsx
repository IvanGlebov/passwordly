import { ActionPanel, Action, List, Icon, showToast, Toast } from "@raycast/api";
import EmptyStateList from "./components/EmptyStateList";
import { Service } from "./passwords/services/saveNewService";
import { useState } from "react";
// import { getPasswordsStore } from "./passwords";
// import { useEffect, useMemo, useState } from "react";
// import transformPairsToServices from "./utils/transformPairsToServices";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ActionsForItem: React.FC<Service> = (service) => {
  // const { push } = useNavigation();
  return (
    <ActionPanel title="Services">
      <ActionPanel.Section>
        <Action
          title="Set Service Password"
          onAction={() => {
            // push(<PasswordForm service={service} />);
          }}
        />
        <Action
          title="Paste Password"
          onAction={() => {
            showToast({ title: "Password get method not set", style: Toast.Style.Failure });
          }}
        />
        <Action
          icon={Icon.CopyClipboard}
          title="Copy Password"
          shortcut={{ modifiers: ["cmd"], key: "c" }}
          onAction={() => {
            showToast({ title: "Password get method not set", style: Toast.Style.Failure });
          }}
        />
        <Action
          title="Clear Password"
          onAction={() => {
            showToast({ title: "Password set method not set", style: Toast.Style.Failure });
          }}
        />
      </ActionPanel.Section>
    </ActionPanel>
  );
};

export default function Command() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [list, setList] = useState<Omit<Service, "password">[]>([]);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     const store = getPasswordsStore();
  //     const keyContentPairs = Array.from(store, (entry) => ({
  //       key: entry[0],
  //       content: entry[1],
  //     }));

  //     const list = transformPairsToServices(keyContentPairs);
  //     setList(list);
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  if (list.length === 0) {
    return <EmptyStateList />;
  } else {
    return (
      <List filtering={false} navigationTitle="Search serivces">
        {list.map((service) => (
          <List.Item key={service.name + service.description} title={service.name} />
        ))}
        {/* <List.Item
          title="VK"
          accessories={[
            { tag: { value: "Password", color: { light: "#000", dark: "#FFF", adjustContrast: true } } },
            { icon: Icon.Gear, tooltip: "Settings" },
          ]}
          // actions={<ActionsForItem service={{ name: "VK" }} />}
        ></List.Item> */}
      </List>
    );
  }
}
