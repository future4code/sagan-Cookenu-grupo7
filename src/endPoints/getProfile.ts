import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator ";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";


export const getProfile = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    if (authenticationData.role !== "normal") {
      throw new Error("Você não tem autorização para acessar este recurso.");
    }

    const userDb = new UserDatabase();
    const user = await userDb.getProfileById(authenticationData.id);

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      role: authenticationData.role
    });
  } catch (err) {
    res.status(402).send({
      message: err.message
    });
  }
  await BaseDatabase.destroyConnection();
}