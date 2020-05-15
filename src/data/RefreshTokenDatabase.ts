import { BaseDatabase } from './BaseDatabase';

export class RefreshTokenDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "RefreshToken";

  public async createRefreshToken(
    token: string,
    device: string,
    isActive: boolean,
    userId: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        refresh_token: token,
        device,
        is_active: this.convertBooleanToTinyint(isActive),
        user_id: userId
      })
      .into(RefreshTokenDatabase.TABLE_NAME)
  }

  public async getRefreshToken(token: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(RefreshTokenDatabase.TABLE_NAME)
      .where({ token })

    const refreshTokenDb = result[0][0];

    if (refreshTokenDb === undefined) {
      return undefined;
    }

    return {
      refreshToken: refreshTokenDb.refresh_token,
      device: refreshTokenDb.device,
      userId: refreshTokenDb.user_id,
      isActive: this.convertTinyintToBoolean(refreshTokenDb.is_active)
    }
  }

  public async getRefreshTokenByUserIdAndDevice(userId: string, device: string): Promise<any> {
    const result = this.getConnection()
      .select("*")
      .from(RefreshTokenDatabase.TABLE_NAME)
      .where({
        user_id: userId,
        device
      })
  }

  public async deleteRefreshToken(token: string): Promise<void> {
    await this.getConnection()
      .delete()
      .from(RefreshTokenDatabase.TABLE_NAME)
      .where({ refresh_token: token })
  }
}