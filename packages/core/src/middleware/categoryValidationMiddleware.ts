import { CloudContext } from "@multicloud/sls-core";
import { CategoryService } from "../services/categoryService";

export const CategoryValidationMiddleware = () => async (context: CloudContext, next: () => Promise<void>) => {
  if (!context.req.pathParams.has("categoryId")) {
    return context.send({ message: "categoryId is required" }, 400);
  }

  if(!context.req.pathParams.has("userId")){
    return context.send({ message: "userId is required" }, 400);
  }

  const categoryId = context.req.pathParams.get("categoryId");
  const userId = context.req.pathParams.get("userId");
  const categoryService = new CategoryService();
  const category = await categoryService.get(categoryId, userId);

  if (!category) {
    return context.send({ message: "categoryId not found" }, 404);
  }

  context["category"] = category;

  await next();
};
