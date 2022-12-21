import Storage from '.';
import { ACCESS_TOKEN } from '../constants';

export default class Tokens extends Storage<string> {
  private static instance?: Tokens;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Tokens();
    }

    return this.instance;
  }

  public getAccessToken() {
    return this.get(ACCESS_TOKEN);
  }

  public setAccessToken(accessToken: string) {
    this.set(ACCESS_TOKEN, accessToken);
  }
  public clear() {
    this.clearItems([ACCESS_TOKEN]);
  }
}
