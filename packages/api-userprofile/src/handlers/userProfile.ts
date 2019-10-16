import { app } from "../app";
import { config } from "../config"
import { PaddleboardCloudContext, UserProfileService, UserProfileValidationMiddleware, AccountService, UserProfile } from "@paddleboard/core";

const middlewares = config();
const userValidation = UserProfileValidationMiddleware();

export const getUserProfileList = app.use(middlewares, async (context: PaddleboardCloudContext) => {
  const userService = new UserProfileService();
  const users = await userService.list();

  context.send({ value: users }, 200);
});

export const getUserProfile = app.use([...middlewares, userValidation], (context: PaddleboardCloudContext) => {
  context.send({ value: context.user }, 200);
});

export const postUserProfile = app.use(middlewares, async (context: PaddleboardCloudContext) => {
  if (!context.req.body) {
    return context.send({ message: "user profile is required" }, 400);
  }

  const userService = new UserProfileService();
  const user = await userService.save(context.req.body);
  const newUri = `users/${user.id}`;

  context.res.headers.set("location", newUri);
  context.send({ value: user }, 201);
});

export const putUserProfile = app.use([...middlewares, userValidation], async (context: PaddleboardCloudContext) => {
  const userToSave = {
    ...context.req.body,
    id: context.user.id
  };

  const userService = new UserProfileService();
  await userService.save(userToSave);

  context.send(null, 204);
});

export const patchUserProfile = app.use([...middlewares, userValidation], async (context: PaddleboardCloudContext) => {
  const userToSave = {
    ...context.user,
    ...context.req.body,
    id: context.user.id
  };

  const userService = new UserProfileService();
  await userService.save(userToSave);

  context.send([], 204);
});

export const deleteUserProfile = app.use([...middlewares, userValidation], async (context: PaddleboardCloudContext) => {
  const userService = new UserProfileService();
  await userService.delete(context.user.id);

  context.send(null, 204);
});

export const getCurrentUserProfile = app.use(middlewares, async (context: PaddleboardCloudContext) => {
  if (!context.user) {
    return context.send({ message: "User not found" }, 404);
  }

  const accountService = new AccountService();

  const user: UserProfile = {
    ...context.user,
    accounts: await accountService.getByUser(context.user.id)
  };

  context.send({ value: user }, 200);
});

export const postCurrentUserProfile = app.use(middlewares, async (context: PaddleboardCloudContext) => {
  const userService = new UserProfileService();
  const accountService = new AccountService();

  let account = await accountService.getByProvider(context.identity.subject, context.identity.provider);
  let user = await userService.getByEmail(context.identity.email);

  if (account && user && account.userId !== user.id) {
    return context.send({ message: "Account is already associated with another account" }, 409);
  }

  if (!user) {
    user = await userService.save({
      email: context.identity.email,
      firstName: context.identity.firstName,
      lastName: context.identity.lastName,
    });
  }

  user.accounts = await accountService.getByUser(user.id);

  if (!account) {
    account = {
      providerId: context.identity.subject,
      providerType: context.identity.provider,
      userId: user.id,
      metadata: context.identity
    };

    account = await accountService.save(account);
    user.accounts.push(account);
  }

  context.res.headers.set("location", "https://paddleboard.breza.io/api/user");
  context.send({ value: user }, 200);
});
