export type TService = {
  name: string;
};

export interface IActionForItem {
  service: TService;
}

export interface IPasswordForm {
  service: TService;
}

export type TPasswordFormValues = {
  password: string;
};
