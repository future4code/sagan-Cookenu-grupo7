import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator ";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";

export const loginEndpoint = async (req: Request, res: Response) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password
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
    const token = authenticator.generateToken({
      id: user.id,
      role: user.role
    });

    res.status(200).send({ token });


  } catch (err) {
    res.status(402).send({
      message: err.message
    });
  }
  await BaseDatabase.destroyConnection();
}