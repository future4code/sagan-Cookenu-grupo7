import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator ";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";

export const signupEndpoint = async (req: Request, res: Response) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      name: req.body.name
    }

    if (userData.password.length < 6 || userData.email.length === 0 && !userData.email.includes("@")) {
      throw new Error('Oooops! E-mail ou senha são invalidos.');
    } else {

      const hashManager = new HashManager();
      const hashPassword = await hashManager.hash(userData.password);

      const idGenerator: any = new IdGenerator();
      const id: string = idGenerator.generate();

      const userDatabase: any = new UserDatabase();
      await userDatabase.createUser(id, userData.email, hashPassword, userData.role, userData.name);

      const authenticator = new Authenticator()
      const token = authenticator.generateToken({
        id,
        role: userData.role
      });

      res.status(200).send({ token });
    }
  } catch (err) {
    res.status(402).send({
      messager: err.message
    })
  }
  await BaseDatabase.destroyConnection();
}