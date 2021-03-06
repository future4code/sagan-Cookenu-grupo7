import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator ";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";

export const deleteProfileEndpoint = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.verify(token);

    if (authenticationData.role !== "admin") {
      throw new Error("Você não tem autorização para acessar este recurso.");
    }

    const userDatabase = new UserDatabase();
    await userDatabase.deleteProfile(req.params.id);

  } catch (err) {
    res.status(402).send({
      message: err.message
    })
  }
  await BaseDatabase.destroyConnection();
}