import { Authenticator } from "../services/Authenticator ";
import { Request, Response } from "express";
import { FollowDatabase } from "../data/FollowDatabase";


export const followUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization as string;

    const dataFollow = {
        userToFollowId: req.body.userToFollowId
    }

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const newFollowUser = new FollowDatabase();
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