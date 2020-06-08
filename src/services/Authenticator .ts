import * as jwt from "jsonwebtoken";

export class Authenticator {

  public generateToken(
    data: AuthenticationData, 
    expiresIn: string = process.env.ACESS_TOKEN_EXPIRES_IN!
    ): string {
    return jwt.sign(data, process.env.JWT_KEY as string, {
        expiresIn,
      });
  }

  public verify(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    return {
      id: payload.id,
      role: payload.role,
      device: payload.device
    }
  }
}

export interface AuthenticationData {
  id: string;
  role?: string;
  device?: string,
}