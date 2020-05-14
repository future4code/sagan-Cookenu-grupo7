import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator ";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";

export const getProfileId = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const id = req.params.id;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);
    if (authenticationData.id !== id) {
      throw Error("O token fornecido não é valido ou está expirado!");
    }

    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserId(id);

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(402).send({
      message: err.message,
    });
  }
  await BaseDatabase.destroyConnection();
}