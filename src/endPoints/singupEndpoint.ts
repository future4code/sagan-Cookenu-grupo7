import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator ";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { RefreshTokenDatabase } from "../data/RefreshTokenDatabase";

export const signupEndpoint = async (req: Request, res: Response) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      name: req.body.name,
      device: req.body.device,
    }

    if (userData.password.length < 6 || userData.email.length === 0 && !userData.email.includes("@")) {
      throw new Error('Oooops! E-mail ou senha são invalidos.');
    } else {

      const hashManager = new HashManager();
      const hashPassword = await hashManager.hash(userData.password);

      const idGenerator: any = new IdGenerator();
      const id: string = idGenerator.generate();

      const userDb: any = new UserDatabase();
      await userDb.createUser(id, userData.email, hashPassword, userData.role, userData.name);

      const authenticator = new Authenticator()

      const accessToken = authenticator.generateToken(
        {
          id,
          role: userData.role,
        },
        process.env.ACESS_TOKEN_EXPIRES_IN
      )

      const refreshToken = authenticator.generateToken(
        {
          id,
          device: userData.device,
        },
        process.env.REFRESH_TOKEN_EXPIRE_IN
      )

      const refreshTokenDb = new RefreshTokenDatabase();
      await refreshTokenDb.createRefreshToken(refreshToken, userData.device, true, id);

      res.status(200).send({ accessToken, refreshToken });
    }
  } catch (err) {
    res.status(402).send({
      messager: err.message
    })
  }
  await BaseDatabase.destroyConnection();
}