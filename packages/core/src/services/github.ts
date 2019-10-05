import jwt from "jsonwebtoken";
import axios from "axios";

export interface GitHubServiceOptions {
  appId: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  signingKey: string;
  ttl?: number;
};

export class GitHubService {
  private jwtToken: string;

  public constructor(private options: GitHubServiceOptions) {
    this.jwtToken = this.createAppToken();
    axios.defaults.headers = {
      "authorization": `bearer ${this.jwtToken}`,
      "accept": "application/vnd.github.machine-man-preview+json"
    };
  }

  public createAppToken() {
    const signingKey = Buffer.from(this.options.signingKey);
    const expires = this.options.ttl || 60 * 10;

    return jwt.sign({}, signingKey, { algorithm: "RS256", issuer: this.options.appId, expiresIn: expires });
  }

  public async getUserAccessToken(code: string): Promise<string> {
    const response = await axios.post("https://github.com/login/oauth/access_token", {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: process.env.GITHUB_REDIRECT_URI,
    }, {
      headers: {
        "accept": "application/json"
      }
    });

    return response.data.access_token;
  }

  public async getUserAccount(userAccessToken: string): Promise<any> {
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        "authorization": `token ${userAccessToken}`,
        "accept": "application/json"
      }
    });

    return userResponse.data;
  }

  public async getInstallations(): Promise<any[]> {
    const installationsResponse = await axios.get("https://api.github.com/app/installations");
    return installationsResponse.data;
  }

  public async getInstallation(installationId: string): Promise<any> {
    const installationsResponse = await axios.get(`https://api.github.com/app/installations/${installationId}`);
    return installationsResponse.data;
  }

  public async getRepositories(installationId: string): Promise<any[]> {
    const tokenResponse = await this.createInstallationAccessToken(installationId);
    const reposResponse = await axios.get("https://api.github.com/installation/repositories", {
      headers: {
        "authorization": `token ${tokenResponse.token}`
      }
    });

    return reposResponse.data.repositories;
  }

  private async createInstallationAccessToken(installationId: string): Promise<any> {
    const tokensResponse = await axios.post(`https://api.github.com/app/installations/${installationId}/access_tokens`);
    return tokensResponse.data;
  }
}
