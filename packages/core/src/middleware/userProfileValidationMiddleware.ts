import { CloudContext } from "@multicloud/sls-core";
import { UserProfileService } from "../services/userProfileService";

export const UserValidationMiddleware = () => async (context: CloudContext, next: () => Promise<void>) => {
  if (!context.req.pathParams.has("userId")) {
    return context.send({ message: "userId is required" }, 400);
  }

  const userId = context.req.pathParams.get("userId");
  const userProfileService = new UserProfileService();
  const user = await userProfileService.get(userId);

  if (!user) {
    return context.send({ message: "userId not found" }, 404);
  }

  context["user"] = user;

  await next();
};
