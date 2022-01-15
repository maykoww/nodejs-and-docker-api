import { Router } from "express";
import multer from "multer";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import uploadConfig from "../config/uploadConfig";

import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarSevice from "../services/UpdateUserAvatarService";

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password
  });

  return response.json({
    name: user.name,
    email: user.email,
  });
});

userRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const updateUserAvatar = new UpdateUserAvatarSevice();
  const user_id = request.user.id;

  const user = await updateUserAvatar.execute({ user_id, avatarFileName: request.file?.filename });

  user.password = "";

  return response.json(user);
});

export default userRouter;
