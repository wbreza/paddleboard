import { CloudContext } from "@multicloud/sls-core";
import { RepositoryService } from "../services/repositoryService";
import { UserProfileService } from "../services/userProfileService";

export const RepositoryValidationMiddleware = () => async (context: CloudContext, next: () => Promise<void>) => {
  if (!context.req.pathParams.has("userId")) {
    return context.send({ message: "userId is required" }, 400);
  }

  if (!context.req.pathParams.has("repositoryId")) {
    return context.send({ message: "repositoryId is required" }, 400);
  }

  const userId = context.req.pathParams.get("userId");
  const repositoryId = context.req.pathParams.get("repositoryId");

  const userProfileService = new UserProfileService();
  const user = await userProfileService.get(userId);

  if (!user) {
    return context.send({ message: "user not found" }, 404);
  }

  const repositoryService = new RepositoryService();
  const repository = await repositoryService.get(repositoryId, user.id);

  if (!repository) {
    return context.send({ message: "repository not found" }, 404);
  }

  context["user"] = user;
  context["repository"] = repository;

  await next();
};
