import Storage from './storage';

export enum Locals {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refresh_token',
  SESSION = 'session',
  USER_NAME = 'user_name',
  ID_TOKEN = 'id_token',
  PASSWORD = 'password',
}

export default class Tokens extends Storage<Locals> {
  private static instance?: Tokens;
  private constructor() {
    super();
  }

  public static getInstance(): Tokens {
    if (!this.instance) {
      this.instance = new Tokens();
    }
    return this.instance;
  }

  public getAccessToken(): string | null {
    return this.get(Locals.ACCESS_TOKEN);
  }

  public getSession(): string | null {
    return this.get(Locals.SESSION);
  }

  public setSession(session: string): void {
    this.set(Locals.SESSION, session);
  }

  public getPassword(): string | null {
    return this.get(Locals.PASSWORD);
  }

  public setPassword(password: string): void {
    this.set(Locals.PASSWORD, password);
  }

  public clearPassword(): void {
    this.clearItems([Locals.PASSWORD]);
  }

  public getUserName(): string | null {
    return this.get(Locals.USER_NAME);
  }

  public setUserName(userName: string): void {
    this.set(Locals.USER_NAME, userName);
  }

  public getIdToken(): string | null {
    return this.get(Locals.ID_TOKEN);
  }

  public setIdToken(idToken: string): void {
    this.set(Locals.ID_TOKEN, idToken);
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
      Locals.SESSION,
      Locals.USER_NAME,
      Locals.ID_TOKEN,
    ]);
  }
}
