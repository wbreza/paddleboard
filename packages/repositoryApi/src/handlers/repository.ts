import { app, RepositoryApiContext } from "../app";
import { config } from "../config"
import { RepositoryService, UserValidationMiddleware, RepositoryValidationMiddleware, Repository } from "@paddleboard/core";

const middlewares = config();
const userValidation = UserValidationMiddleware();
const repoValidation = RepositoryValidationMiddleware();

export const getRepositoryListByUser = app.use([...middlewares, userValidation], async (context: RepositoryApiContext) => {
  const repoService = new RepositoryService();
  const repos = await repoService.getByUser(context.user.id);

  context.send({ value: repos }, 200);
});

export const getRepository = app.use([...middlewares, repoValidation], (context: RepositoryApiContext) => {
  context.send({ value: context.repository }, 200);
});

export const postRepository = app.use([...middlewares, userValidation], async (context: RepositoryApiContext) => {
  if (!context.req.body) {
    return context.send({ message: "repository is required" }, 400);
  }

  const repoToSave: Repository = {
    ...context.req.body,
    userId: context.user.id
  };

  const repoService = new RepositoryService();
  const repo = await repoService.save(repoToSave);
  const newUri = `/users/${context.user.id}/repositories/${repo.id}`;

  context.res.headers.set("location", newUri);
  context.send({ value: repo }, 201);
});

export const putRepository = app.use([...middlewares, repoValidation], async (context: RepositoryApiContext) => {
  const repoToSave = {
    ...context.req.body,
    id: context.repository.id,
    userId: context.user.id
  };

  const userService = new RepositoryService();
  await userService.save(repoToSave);

  context.send(null, 204);
});

export const patchRepository = app.use([...middlewares, repoValidation], async (context: RepositoryApiContext) => {
  const repoToSave = {
    ...context.user,
    ...context.req.body,
    id: context.repository.id,
    userId: context.user.id
  };

  const userService = new RepositoryService();
  await userService.save(repoToSave);

  context.send(null, 204);
});

export const deleteRepository = app.use([...middlewares, repoValidation], async (context: RepositoryApiContext) => {
  const userService = new RepositoryService();
  await userService.delete(context.repository.id, context.user.id);

  context.send(null, 204);
});
