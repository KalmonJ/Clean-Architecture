export interface AuthInterface {
  createToken(payload: object): Promise<string>;
}
