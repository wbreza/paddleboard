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

  if (!(context.res.body && context.res.body["value"])) {
    return;
  }

  const value = context.res.body["value"];

  if (value instanceof Array) {
    value.forEach(cleanResource);
  } else {
    cleanResource(value);
  }
}
