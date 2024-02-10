import { Action, ActionPanel, List, useNavigation } from "@raycast/api";
import CryptoSettings, { CryptMarkdownDetails } from "../../Forms/CryptoSettings";
import { useIsCryptoReady } from "../../passwords/cryptography/crypto";

const CryptoSettingsListItem = () => {
  const { push } = useNavigation();

  const isCryptoReady = useIsCryptoReady();
  return (
    <List.Item
      title="Crypto settings (master secret)"
      detail={<List.Item.Detail markdown={CryptMarkdownDetails(isCryptoReady)} />}
      actions={
        <ActionPanel>
          {isCryptoReady ? (
            <Action title="Change Settings" onAction={() => push(<CryptoSettings />)} />
          ) : (
            <Action title="Setup Crypto Service" onAction={() => push(<CryptoSettings />)} />
          )}
        </ActionPanel>
      }
    />
  );
};

export default CryptoSettingsListItem;
