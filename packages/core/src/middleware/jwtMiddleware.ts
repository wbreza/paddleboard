import { PaddleboardCloudContext } from "../models/paddleboardCloudContext";
import jsonwebtoken from "jsonwebtoken";

export interface JwtMiddlewareOptions {
  required: boolean;
}

export const JwtMiddleware = (options?: JwtMiddlewareOptions) => async (context: PaddleboardCloudContext, next: () => Promise<void>) => {
  options = options || {
    required: false
  };

  const authHeader = context.req.headers.get("authorization") as string;
  let decodedToken: any = "";

  if (authHeader) {
    const authHeaderParts = authHeader.split(" ");
    if (authHeaderParts.length !== 2) {
      return context.send({ message: "Authorization token is invalid." }, 401);
    };

    decodedToken = jsonwebtoken.decode(authHeaderParts[1]);
  } else {
    if (options.required) {
      return context.send({ message: "Authorization token is missing or invalid." }, 401);
    }
  }

  if (decodedToken) {
    context.identity = {
      firstName: decodedToken.given_name,
      lastName: decodedToken.family_name,
      subject: decodedToken.sub,
      issuer: decodedToken.iss,
      audience: decodedToken.aud,
      claims: decodedToken.scp.split(" ")
    }
  }

  await next();
};
