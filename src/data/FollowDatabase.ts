import { BaseDatabase } from "./BaseDatabase";

export class FollowDatabase extends BaseDatabase {

  static TABLE_NAME = "Follow";

  public async followUser(followingId: string, followedId: string): Promise<any> {
    await this.getConnection()
      .insert({
        id_user_following: followingId,
        id_user_followed: followedId
      })
      .into(FollowDatabase.TABLE_NAME);
  }

  public async unfollowUser(followingId: string, unfollowedId: string): Promise<any> {
    await this.getConnection()
    .delete()
    .from(FollowDatabase.TABLE_NAME)
    .where({
      id_user_following: followingId,
      id_user_followed: unfollowedId
    })
  }
}