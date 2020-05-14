import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator ";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { RecipesDatabase } from "../data/RecipesDatabase";
import moment from 'moment';
import { UserDatabase } from "../data/UserDatabase";


export const unfollowUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization as string;

    const dataUnfollow = {
        userToUnfollowId: req.body.userToUnfollowId
    }

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const newUnfollowUser = new UserDatabase();
    await newUnfollowUser.unfollowUser(authenticationData.id, dataUnfollow.userToUnfollowId)

    res.status(200).send({
      sucess: "Unfollowed successfully"
    })

  } catch (err) {
    res.status(402).send({
      messager: err.message
    })
  }
}