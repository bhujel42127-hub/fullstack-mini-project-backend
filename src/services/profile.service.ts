import { User } from "../models/user.model";

export class ProfileService {
  async getProfile(userId: string) {
    return User.findById(userId);
  }
  async updateProfile(userId: string, data: any) {
    return User.findOneAndUpdate({ _id: userId }, data, {
      new: true,
    });
  }
}

export const profileService = new ProfileService();
