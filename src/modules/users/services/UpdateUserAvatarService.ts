import fs from 'fs';
import path from 'path';
import { getRepository } from "typeorm";
import uploadConfig from "@config/uploadConfig";
import AppError from '@shared/errors/AppError';
import User from "../infra/typeorm/entities/User";

interface IRequest {
  user_id: string;
  avatarFileName?: string;
}

class UpdateUserAvatarSevice {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = String(avatarFileName);

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarSevice;
