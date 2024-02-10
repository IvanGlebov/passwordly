import { Form } from "@raycast/api";
export const emptyFieldErrorhandler = (handler: (a: string | undefined) => void, errorMessage?: string) => {
  return (event: Form.Event<string>) => {
    if (event.target.value?.length === 0) {
      handler(errorMessage || "Field is required");
    } else {
      handler(undefined);
    }
  };
};
