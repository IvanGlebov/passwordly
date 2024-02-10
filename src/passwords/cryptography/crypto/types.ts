export type SetCryptoProps<T = string> = {
  secretKey: T;
  secretIV: T;
};

export type SetCrypto = (props: SetCryptoProps) => Promise<PromiseSettledResult<void>[]>;

export type GetCrypto = () => Promise<SetCryptoProps | SetCryptoProps<undefined>>;

export type InitCrypto = (secretKey: string, secretIV: string) => { key: string; encryptionIV: string };
