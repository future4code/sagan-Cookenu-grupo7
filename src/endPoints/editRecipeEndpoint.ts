import { Authenticator } from "../services/Authenticator ";
import { Request, Response } from "express";

import { RecipesDatabase } from "../data/RecipesDatabase";

export const editRecipeEndpoint = async (req: Request, res: Response) => {
  try {

    const recipeData = {
      id: req.body.title,
      title: req.body.title,
      description: req.body.description
    }

    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.verify(token);

    const recipeDb = new RecipesDatabase();
    const recipe = await recipeDb.getRecipeById(recipeData.id);

    if (recipe.user_id !== authenticationData.id) {
      throw Error("Você não pode editar está receita.");
    }

    await recipeDb.edit(recipeData.id, recipeData.title, recipeData.description);

    res.status(200).send({
      messenger: "Alterações efetuadas com sucesso!"
    })

  } catch(err) {
    res.status(400).send({
      messenger: err.message
    })
  }
}