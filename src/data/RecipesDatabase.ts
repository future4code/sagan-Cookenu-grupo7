import { BaseDatabase } from "./BaseDatabase";
import moment from 'moment';

export class RecipesDatabase extends BaseDatabase {

  static TABLE_NAME = "Recipe";


  public async newRecipe(id: string, title: string, description: string, createDate: string, userId: string): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        title,
        description,
        create_date: createDate,
        user_id: userId
      })
      .into(RecipesDatabase.TABLE_NAME)
  }

  public async getFeed(): Promise<any> {
    const result = await this.getConnection()
    .select("*")
    .from(`${RecipesDatabase.TABLE_NAME}`)
    .leftJoin(`User`, "Recipe.user_id", `User.id`)
    return result.map(recipe=>{return{
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      createdAt: moment(recipe.create_date).format("DD/MM/YYYY"),
      userId: recipe.user_id,
      userName: recipe.name
    }})
  }

  public async getRecipeById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(RecipesDatabase.TABLE_NAME)
      .where({ id })

    return result[0];
  }

  public async edit(idRecipe: string, title: string, description: string): Promise<void> {
    await this.getConnection()
      .from(RecipesDatabase.TABLE_NAME)
      .update({
        title,
        description
      })
      .where({ id: idRecipe })
  }
}