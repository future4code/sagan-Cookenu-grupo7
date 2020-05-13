import { BaseDatabase } from "./BaseDatabase";

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
}