import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { Authenticator } from '../services/Authenticator ';
import { UserDatabase } from '../data/UserDatabase';

export const refreshAccessTokenEndpoint = async  (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken;
    const device = req.body.device;

    const authenticator = new Authenticator();
    const refreshTokenData = authenticator.verify(refreshToken);

    if (refreshTokenData !== device) {
      throw new Error("Refresh Token não pode ser gerado neste dispositivo.")
    }
    const userDb = new UserDatabase();
    const user = await userDb.getProfileById(refreshTokenData.id)
    const accessToken = authenticator.generateToken({
      id: refreshTokenData.id,
      role: user.role
    },
    process.env.ACESS_TOKEN_EXPIRES_IN
    )

    res.status(200).send({
      accessToken
    })
    
  } catch (err) {
    res.status(400).send({
      message: err.message
    })
  }

  await BaseDatabase.destroyConnection();
}