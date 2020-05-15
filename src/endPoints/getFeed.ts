
import { Authenticator } from "../services/Authenticator ";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { RecipesDatabase } from "../data/RecipesDatabase";
import { UserDatabase } from "../data/UserDatabase";


export const getFeed = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string;
    
        const authenticator = new Authenticator();
        const authenticationData = authenticator.verify(token);
    
        if (authenticationData.role !== "normal") {
          throw new Error("Você não tem autorização para acessar este recurso.");
        }
    
        const recipeDb = new RecipesDatabase();
        const feed = await recipeDb.getFeed();
        res.status(200).send({recipes: feed});
      } catch (err) {
        res.status(402).send({
          message: err.message
        });
      }
      await BaseDatabase.destroyConnection();
    }