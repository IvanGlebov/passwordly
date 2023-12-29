import {
  Form,
  ActionPanel,
  Action,
  showToast,
  useNavigation,
  Detail,
  List,
  Clipboard,
  showHUD,
  Icon,
} from "@raycast/api";
import { IActionForItem, IPasswordForm, TPasswordFormValues } from "./types";
import { getSerivcePassword, initCrypto, setServicePassword } from "./security";
import { setCrypto } from "./security/crypto";

export const PasswordForm: React.FC<IPasswordForm> = ({ service }) => {
  const { push } = useNavigation();
  const handleSubmitPassword = (values: TPasswordFormValues) => {
    setServicePassword({ service, password: values.password });
    push(<Command />);
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save Password" onSubmit={handleSubmitPassword} />
        </ActionPanel>
      }
    >
      <Form.Description title="New password" text={`Type in new password for service ${service.name}`} />
      <Form.TextField id="password" placeholder="Password" />
    </Form>
  );
};

export const CryptoInitializationFrom: React.FC = () => {
  const { push } = useNavigation();

  type FormValues = {
    key: string;
    encryptionIV: string;
  };

  const onSubmitForm = (formValues: FormValues) => {
    const { key, encryptionIV } = initCrypto({ secretKey: formValues.key, secretIV: formValues.encryptionIV });
    setCrypto({ secretKey: key, secretIV: encryptionIV })
      .then(() => {
        showHUD("Crypto initialized successefully");
        push(<Command />);
      })
      .catch((errors) => {
        showHUD("ERROR initializing Crypto");
        console.error(errors);
      });
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={onSubmitForm} />
        </ActionPanel>
      }
    >
      <Form.Description title="Unlock your vault" text="Here you specify encryption key and encryptionIV" />
      <Form.TextField id="key" placeholder="Key" />
      <Form.TextField id="encryptionIV" placeholder="EncryptionIV" />
    </Form>
  );
};

export const ActionsForItem: React.FC<IActionForItem> = ({ service }) => {
  const { push } = useNavigation();
  return (
    <ActionPanel title="Services">
      <ActionPanel.Section>
        <Action
          title="Set Service Password"
          onAction={() => {
            push(<PasswordForm service={service} />);
            // setServicePassword({ service, password: "10" });
          }}
        />
        <Action
          title="Paste Password"
          onAction={() => {
            const password = getSerivcePassword({ service });
            Clipboard.paste(password);
          }}
        />
        <Action
          icon={Icon.CopyClipboard}
          title="Copy Password"
          shortcut={{ modifiers: ["cmd"], key: "c" }}
          onAction={() => {
            showHUD(`encrypted password from ${service.name} is: ${getSerivcePassword({ service })}`);
          }}
        />
        <Action
          title="Clear Password"
          onAction={() => {
            setServicePassword({ service, password: "" });
            showHUD(`Password from ${service.name} was set to ''`);
          }}
        />
      </ActionPanel.Section>
      <ActionPanel.Section>
        <Action title="Initialize Crypto" onAction={() => push(<CryptoInitializationFrom />)} />
      </ActionPanel.Section>
    </ActionPanel>
  );
};

export default function Command() {
  return (
    <List filtering={false} navigationTitle="Search serivces">
      <List.Item
        title="VK"
        accessories={[
          { tag: { value: "Password", color: { light: "#000", dark: "#FFF", adjustContrast: true } } },
          { icon: Icon.Gear, tooltip: "Settings" },
        ]}
        actions={<ActionsForItem service={{ name: "VK" }} />}
      ></List.Item>
    </List>
  );
}
