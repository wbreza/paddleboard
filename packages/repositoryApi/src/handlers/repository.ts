import { app } from "../app";
import { config } from "../config"
import { CloudContext } from "@multicloud/sls-core";
import { RepositoryService, UserValidationMiddleware, RepositoryValidationMiddleware } from "@paddleboard/core";

const middlewares = config();
const userValidation = UserValidationMiddleware();
const repoValidation = RepositoryValidationMiddleware();

export const getRepositoryList = app.use(middlewares, async (context: CloudContext) => {
  const repoService = new RepositoryService();
  const repos = await repoService.list();

  context.send({ value: repos }, 200);
});

export const getRepositoryListByUser = app.use([...middlewares, userValidation], async (context: CloudContext) => {
  const repoService = new RepositoryService();
  const repos = await repoService.getByUser(context["user"].id);

  context.send({ value: repos }, 200);
});

export const getRepository = app.use([...middlewares, repoValidation], (context: CloudContext) => {
  context.send({ value: context["repository"] }, 200);
});

export const postRepository = app.use(middlewares, (context: CloudContext) => {
  context.send([], 201);
});

export const putRepository = app.use(middlewares, (context: CloudContext) => {
  context.send([], 204);
});

export const patchRepository = app.use(middlewares, (context: CloudContext) => {
  context.send([], 204);
});

export const deleteRepository = app.use(middlewares, (context: CloudContext) => {
  context.send([], 204);
});
