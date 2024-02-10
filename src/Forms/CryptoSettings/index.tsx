import React from "react";
import { CryptoSettingsProps } from "./type";
import { Action, ActionPanel, Form, showToast } from "@raycast/api";
import { initCrypto, setCrypto } from "../../passwords/cryptography/crypto";

const CryptoSettings: React.FC<CryptoSettingsProps> = ({ secretIV, secretKey }) => {
  type FormValues = {
    secretKey: string;
    secretIV: string;
  };

  const onFormSubmit = (values: FormValues) => {
    const { key, encryptionIV } = initCrypto(values.secretKey, values.secretIV);
    setCrypto({ secretKey: key, secretIV: encryptionIV }).then(() => {
      showToast({ title: "All set up!" });
    });
  };

  return (
    <Form
      navigationTitle="CryptoSettings"
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save Data" onSubmit={onFormSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description
        title="Crypto initializetion"
        text="Use long and easy to remember frases in each field. They will be two parts of your master key"
      />
      <Form.PasswordField defaultValue={secretKey} autoFocus id="secretKey" title="Secret key" />
      <Form.PasswordField defaultValue={secretIV} id="secretIV" title="Secret IV" />
    </Form>
  );
};

export default CryptoSettings;

export const CryptMarkdownDetails = (isCryptoReady: boolean) => `
# Crypto settings
${
  isCryptoReady
    ? "Crypto service is ready. \n Press 'Enter' to change KEY or IV"
    : "Crypto service is DISABLED. Press Enter to set up KEY and IV"
} 
`;
