import { Authenticator } from "../services/Authenticator ";
import { Request, Response } from "express";

import { RecipesDatabase } from "../data/RecipesDatabase";

export const deleteRecipe = async (req: Request, res: Response) => {
  try {

    const recipeData = {
      id: req.body.idRecipe as string
    }

    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const recipeDb = new RecipesDatabase();

    const recipe = await recipeDb.getRecipeById(recipeData.id);

    if ((recipe.user_id !== authenticationData.id) || authenticationData.role !== "normal") {
      throw Error("Você não pode deletar essa receita");
    }
    await recipeDb.delete(recipeData.id);

    res.status(200).send({
      messenger: "Receita deletada com sucesso!"
    })

  } catch(err) {
    res.status(400).send({
      messenger: err.message
    })
  }
}