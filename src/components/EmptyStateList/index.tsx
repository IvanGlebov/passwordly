import { Action, ActionPanel, Detail, useNavigation } from "@raycast/api";
import Settings from "../../pages/Settings";
import { useIsCryptoReady } from "../../passwords/cryptography/crypto";
import { useMemo } from "react";
import ServiceForm from "../../Forms/ServiceForm";
import { getPasswordsStore } from "../../passwords";

const markdown = (isCryptoReady: boolean) => `
# No items found in list
---
## Add your's first service by pressing ↵

## You also may visit settings by pressing ⌘ + .

---
## Crypto status: ${isCryptoReady ? "Ready" : "DISABLED"}

${!isCryptoReady ? "To setup Crypto service press ⌘ + . and go to Crypto service configuration" : ""}
`;

const EmptyStateList: React.FC = () => {
  const { push } = useNavigation();
  const isCryptoReady = useIsCryptoReady();

  const hydratedMarkdown = useMemo(() => markdown(isCryptoReady), [isCryptoReady]);

  return (
    <Detail
      markdown={hydratedMarkdown}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action title="Add New Service" onAction={() => push(<ServiceForm />)} />
            <Action title="Log Store" onAction={() => console.log(getPasswordsStore().entries())} />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action
              title="Check Settings"
              shortcut={{ modifiers: ["cmd"], key: "." }}
              onAction={() => push(<Settings />)}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    ></Detail>
  );
};

export default EmptyStateList;
