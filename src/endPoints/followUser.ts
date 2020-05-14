import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator ";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { RecipesDatabase } from "../data/RecipesDatabase";
import moment from 'moment';
import { UserDatabase } from "../data/UserDatabase";


export const followUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization as string;

    const dataFollow = {
        userToFollowId: req.body.userToFollowId
    }

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const newFollowUser = new UserDatabase();
    await newFollowUser.followUser(authenticationData.id, dataFollow.userToFollowId)

    res.status(200).send({
      sucess: "Followed successfully"
    })

  } catch (err) {
    res.status(402).send({
      messager: err.message
    })
  }
}