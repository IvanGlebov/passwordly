export type Service = {
  name: string;
};

export interface IActionForItem {
  service: Service;
}

export interface IPasswordForm {
  service: Service;
}

export type TPasswordFormValues = {
  password: string;
};
