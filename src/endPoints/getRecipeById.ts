import { Authenticator } from "../services/Authenticator ";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { RecipesDatabase } from "../data/RecipesDatabase";


export const getRecipeById = async (req: Request, res: Response) => {
  try {


    const recipeDb = new RecipesDatabase();
    const recipeData = await recipeDb.getRecipeById(req.params.id);

    res.status(200).send({
      id: recipeData.id,
      title: recipeData.title,
      description: recipeData.description,
      cratedAt: recipeData.create_data
    })
  } catch (err) {
    res.status(400).send({
      messenger: err.message
    })
  }
}