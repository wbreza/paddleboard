import { CloudContext } from "@multicloud/sls-core/lib/cloudContext";

function cleanResource(resource: any) {
  Object.keys(resource).forEach((key) => {
    if (key.startsWith("_")) {
      delete resource[key];
    }
  });
}

export const CosmosMiddleware = () => async (context: CloudContext, next: () => Promise<void>) => {
  await next();

  const value = context.res.body["value"];
  if (!value) {
    return;
  }

  if (value instanceof Array) {
    value.forEach(cleanResource);
  } else {
    cleanResource(value);
  }
}
