import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator ";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { RefreshTokenDatabase } from "../data/RefreshTokenDatabase";

export const loginEndpoint = async (req: Request, res: Response) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      device: req.body.device
    }

    if (userData.password.length < 6 || userData.email.length === 0 && !userData.email.includes("@")) {
      throw new Error('Oooops! E-mail ou senha são invalidos.');
    }

    const userDatabase: any = new UserDatabase();
    const user = await userDatabase.getUserEmail(userData.email);

    const hashManager = new HashManager();
    const comapreResult = await hashManager.compare(
      userData.password,
      user.password
    );

    if (!comapreResult) {
      throw new Error('Oooops! Senha incorreta.');
    }

    const authenticator = new Authenticator();
    const acessToken = authenticator.generateToken({
      id: user.id,
      role: user.role
    },
      process.env.REFRESH_TOKEN_EXPIRE_IN
    )

    const refreshToken = authenticator.generateToken(
      {
        id: user.id,
        device: userData.device
      },
      process.env.REFRESH_TOKEN_EXPIRE_IN
    )

    const refreshTokenDb = new RefreshTokenDatabase();

    const refreshTokenFromDb = await refreshTokenDb
      .getRefreshTokenByUserIdAndDevice(user.id, userData.device)


    if (refreshTokenFromDb !== undefined) {
      await refreshTokenDb.deleteRefreshToken(refreshTokenFromDb.refreshToken)
    }

    await refreshTokenDb.createRefreshToken(
      refreshToken,
      userData.device,
      true,
      user.id
    )

    res.status(200).send({ acessToken, refreshToken });


  } catch (err) {
    res.status(402).send({
      message: err.message
    });
  }
  await BaseDatabase.destroyConnection();
}