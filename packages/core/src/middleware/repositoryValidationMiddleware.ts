import { CloudContext } from "@multicloud/sls-core";
import { RepositoryService } from "../services/repositoryService";

export const RepositoryValidationMiddleware = () => async (context: CloudContext, next: () => Promise<void>) => {
  if (!context.req.pathParams.has("repositoryId")) {
    return context.send({ message: "repositoryId is required" }, 400);
  }

  const repositoryId = context.req.pathParams.get("repositoryId");
  const repositoryService = new RepositoryService();
  const repository = await repositoryService.get(repositoryId);

  if (!repository) {
    return context.send({ message: "repository not found" }, 404);
  }

  context["repository"] = repository;

  await next();
};
