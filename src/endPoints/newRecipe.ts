import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator ";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { RecipesDatabase } from "../data/RecipesDatabase";
import moment from 'moment';


export const newRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization as string;

    const dataRecipe = {
      title: req.body.title,
      description: req.body.description,
      create_date: req.body.createDate
    }

    const createDate: string = moment(dataRecipe.create_date, "DD/MM/YYYY").format("YYYY-MM-DD");

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const idGenerator: any = new IdGenerator();
    const id: string = idGenerator.generate();

    const newRecipesDatabase = new RecipesDatabase();
    await newRecipesDatabase.newRecipe(id, dataRecipe.title, dataRecipe.description, createDate, authenticationData.id);

    res.status(200).send({
      sucess: "Ok"
    })

  } catch (err) {
    res.status(402).send({
      messager: err.message
    })
  }
}