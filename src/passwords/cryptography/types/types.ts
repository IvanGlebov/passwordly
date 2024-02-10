export type EncryptStringProps = { string: string; encryptionMethod?: string; hashingMethod?: string };
export type EncryptString = (props: EncryptStringProps) => Promise<string>;
