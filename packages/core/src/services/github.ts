import jwt from "jsonwebtoken";
import fs from "fs";

export interface GitHubServiceOptions {
  appId: string;
  ttl?: number;
};

export class GitHubService {
  public constructor(private options: GitHubServiceOptions) {
  }

  public createAppToken() {
    const filePath = `${process.cwd()}\\github.pem`;
    const keyFile = fs.readFileSync(filePath);
    const expires = this.options.ttl || 60 * 10;

    return jwt.sign({}, keyFile, { algorithm: "RS256", issuer: this.options.appId, expiresIn: expires });
  }
}
