import { UserProfileService } from "../services/userProfileService";
import { PaddleboardCloudContext } from "../models/paddleboardCloudContext";

export const UserProfileValidationMiddleware = () => async (context: PaddleboardCloudContext, next: () => Promise<void>) => {
  if (!context.req.pathParams.has("userId")) {
    return context.send({ message: "userId is required" }, 400);
  }

  const userId = context.req.pathParams.get("userId");
  const userProfileService = new UserProfileService();
  const user = await userProfileService.get(userId);

  if (!user) {
    return context.send({ message: "userId not found" }, 404);
  }

  context.user = user;

  await next();
};
