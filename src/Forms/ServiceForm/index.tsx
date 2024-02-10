import { Action, ActionPanel, Form, useNavigation } from "@raycast/api";
import React, { useState } from "react";
import { ServiceFormProps, ServiceFormValues } from "./types";
import { emptyFieldErrorhandler } from "./utils";
import { getPasswordsStore, saveNewService } from "../../passwords";

const ServiceForm: React.FC<ServiceFormProps> = () => {
  const [nameError, setNameError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const { pop } = useNavigation();
  const onFormSubmit = (values: ServiceFormValues) => {
    console.log("Values", values);
    saveNewService({ ...values, pop });
    console.log(getPasswordsStore());
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={onFormSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="Provide data for service. Use strong password" title="New service adding" />
      <Form.Separator />
      <Form.TextField
        error={nameError}
        onBlur={emptyFieldErrorhandler(setNameError, "Field is required")}
        title="Service name"
        id="name"
        placeholder="Service name"
      />
      <Form.PasswordField
        onBlur={emptyFieldErrorhandler(setPasswordError, "Field is required")}
        error={passwordError}
        title="Password"
        id="password"
        placeholder="Service password"
      />
      <Form.TextField title="Description" id="description" placeholder="Service description" />
      {/* <Form.TagPicker id="tags">
        <Form.TagPicker.Item title="123" value="1"/>
      </Form.TagPicker> */}
    </Form>
  );
};

export default ServiceForm;
