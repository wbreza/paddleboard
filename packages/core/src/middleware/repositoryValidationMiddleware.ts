import { RepositoryService } from "../services/repositoryService";
import { UserProfileValidationMiddleware } from "./userProfileValidationMiddleware";
import { PaddleboardCloudContext } from "../models/paddleboardCloudContext";

const userProfileValidation = UserProfileValidationMiddleware();

export const RepositoryValidationMiddleware = () => async (context: PaddleboardCloudContext, next: () => Promise<void>) => {
  await userProfileValidation(context, () => Promise.resolve());

  if (!context.req.pathParams.has("repositoryId")) {
    return context.send({ message: "repositoryId is required" }, 400);
  }

  const repositoryId = context.req.pathParams.get("repositoryId");
  const repositoryService = new RepositoryService();
  const repository = await repositoryService.get(repositoryId, context.user.id);

  if (!repository) {
    return context.send({ message: "repository not found" }, 404);
  }

  context.repository = repository;

  await next();
};
