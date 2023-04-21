export interface HashPasswordInterface {
  encrypt(password: string): Promise<string>;
  compare(password: string, encrypted: string): Promise<boolean>;
}
