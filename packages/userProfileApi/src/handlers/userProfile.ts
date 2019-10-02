import { app, UserProfileApiContext } from "../app";
import { config } from "../config"
import { UserProfileService, UserValidationMiddleware } from "@paddleboard/core";

const middlewares = config();
const userValidation = UserValidationMiddleware();

export const getUserProfileList = app.use(middlewares, async (context: UserProfileApiContext) => {
  const userService = new UserProfileService();
  const users = await userService.list();

  context.send({ value: users }, 200);
});

export const getUserProfile = app.use([...middlewares, userValidation], (context: UserProfileApiContext) => {
  context.send({ value: context.user }, 200);
});

export const postUserProfile = app.use(middlewares, async (context: UserProfileApiContext) => {
  if (!context.req.body) {
    return context.send({ message: "user profile is required" }, 400);
  }

  const userService = new UserProfileService();
  const user = await userService.save(context.req.body);
  const newUri = `users/${user.id}`;

  context.res.headers.set("location", newUri);
  context.send({ value: user }, 201);
});

export const putUserProfile = app.use([...middlewares, userValidation], async (context: UserProfileApiContext) => {
  const userToSave = {
    ...context.req.body,
    id: context.user.id
  };

  const userService = new UserProfileService();
  await userService.save(userToSave);

  context.send(null, 204);
});

export const patchUserProfile = app.use([...middlewares, userValidation], async (context: UserProfileApiContext) => {
  const userToSave = {
    ...context.user,
    ...context.req.body,
    id: context.user.id
  };

  const userService = new UserProfileService();
  await userService.save(userToSave);

  context.send([], 204);
});

export const deleteUserProfile = app.use([...middlewares, userValidation], async (context: UserProfileApiContext) => {
  const userService = new UserProfileService();
  await userService.delete(context.user.id);

  context.send(null, 204);
});
