import { app } from "../app";
import { config } from "../config"
import { CloudContext } from "@multicloud/sls-core";
import { UserProfileService } from "@paddleboard/core";

const middlewares = config();

export const getUserProfileList = app.use(middlewares, async (context: CloudContext) => {
  const userService = new UserProfileService();
  const users = await userService.list();

  context.send({ value: users }, 200);
});

export const getUserProfile = app.use(middlewares, (context: CloudContext) => {
  context.send(null, 200);
});

export const postUserProfile = app.use(middlewares, (context: CloudContext) => {
  context.send([], 201);
});

export const putUserProfile = app.use(middlewares, (context: CloudContext) => {
  context.send([], 204);
});

export const patchUserProfile = app.use(middlewares, (context: CloudContext) => {
  context.send([], 204);
});

export const deleteUserProfile = app.use(middlewares, (context: CloudContext) => {
  context.send([], 204);
});