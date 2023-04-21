export interface AuthInterface {
  createToken(payload: object): Promise<string>;
  verify(token: string, callback: (err: any, user: any) => void): any;
}
