import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

  static TABLE_NAME = "User";

  public async createUser(
    id: string,
    email: string,
    password: string,
    role: string,
    name: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        email,
        password,
        role,
        name
      })
		.into(UserDatabase.TABLE_NAME);
  }

  public async getUserEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return result[0];
  }

  public async getProfileById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });

    return result[0];
  }

  public async deleteProfile(id: string): Promise<void> {
    await this.getConnection()
      .delete()
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
  }
}