import { User } from "../models/user.model";

export class ProfileService {
  async updateProduct(userId: string, data: any) {
    return User.findOneAndUpdate({ _id: userId }, data, {
      new: true,
    });
  }
}

export const profileService = new ProfileService();
