import { PaddleboardCloudContext } from "../models/paddleboardCloudContext";
import { UserProfileService } from "../services/userProfileService";

export const CurrentUserMiddleware = () => async (context: PaddleboardCloudContext, next: () => Promise<void>) => {
  if (context.identity) {
    const userService = new UserProfileService();
    context.user = await userService.getByEmail(context.identity.email);
  }

  await next();
};
