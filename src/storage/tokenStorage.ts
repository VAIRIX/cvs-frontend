import Storage from 'storage/storage';

export enum Locals {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
  USER_NAME = 'userName',
}

class Tokens extends Storage<Locals> {
  public getAccessToken(): string | null {
    return this.get(Locals.ACCESS_TOKEN);
  }

  public getUserName(): string | null {
    return this.get(Locals.USER_NAME);
  }

  public setUserName(userName: string): void {
    this.set(Locals.USER_NAME, userName);
  }

  public setAccessToken(accessToken: string): void {
    this.set(Locals.ACCESS_TOKEN, accessToken);
  }

  public getRefreshToken(): string | null {
    return this.get(Locals.REFRESH_TOKEN);
  }

  public setRefreshToken(refreshToken: string): void {
    this.set(Locals.REFRESH_TOKEN, refreshToken);
  }

  public clear(): void {
    this.clearItems([
      Locals.ACCESS_TOKEN,
      Locals.REFRESH_TOKEN,
      Locals.USER_NAME,
    ]);
  }
}

export default new Tokens();
