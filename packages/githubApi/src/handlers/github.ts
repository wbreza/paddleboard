import { CloudContext } from "@multicloud/sls-core";
import { StorageQueueMiddleware } from "@multicloud/sls-azure";
import { app } from "../app";
import { config } from "../config"
import { GitHubService, AccountService, ProviderType, QueueService, Repository, Account } from "@paddleboard/core";

const middlewares = config();

/**
 * Called when the Github app is installed an authorized on an account
 */
export const authorize = app.use(middlewares, async (context: CloudContext) => {
  const code = context.req.query.get("code");
  if (!code) {
    return context.send("Invalid request", 400);
  }

  const installationId = context.req.query.get("installation_id");

  const queueService = new QueueService({
    account: process.env.QUEUE_ACCOUNT_NAME,
    key: process.env.QUEUE_ACCOUNT_KEY,
    queueName: "github-installations"
  });

  const accountService = new AccountService();
  const githubService = new GitHubService({
    appId: process.env.GITHUB_APP_ID,
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    redirectUri: process.env.GITHUB_REDIRECT_URI,
  });

  const userAccessToken = await githubService.getUserAccessToken(code);
  const githubAccount = await githubService.getUserAccount(userAccessToken);
  const userAccount = await accountService.getByProvider(githubAccount.login, ProviderType.GitHub);

  const installPayload = {
    account: userAccount,
    installationId: installationId
  };

  await queueService.enqueue(installPayload);

  context.res.headers.set("location", "https://paddleboard.breza.io");
  context.send(null, 302);
});

/**
 * Called when a github event fires (ex. pull request created / updated)
 */
export const hook = app.use(middlewares, (context: CloudContext) => {
  context.send("OK", 200);
});

/**
 * Called when github app installations are created
 */
export const install = app.use([StorageQueueMiddleware()], async (context: CloudContext) => {
  if (!context.event.installationId) {
    return context.send({ message: "installationId is required" }, 500);
  }

  const githubService = new GitHubService({
    appId: process.env.GITHUB_APP_ID,
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    redirectUri: process.env.GITHUB_REDIRECT_URI,
  });

  const account: Account = context.event.account;
  const repositories = await githubService.getRepositories(context.event.installationId);

  const queueService = new QueueService({
    account: process.env.QUEUE_ACCOUNT_NAME,
    key: process.env.QUEUE_ACCOUNT_KEY,
    queueName: "repositories"
  });

  // Queue repo tasks for each mapped repository
  const tasks = repositories.map((githubRepo) => {
    const repo: Repository = {
      name: githubRepo.name,
      description: githubRepo.description,
      portalUrl: githubRepo.html_url,
      accountId: account.id,
      userId: account.userId
    };

    const payload = {
      account: account,
      repository: repo
    };

    return queueService.enqueue(payload);
  });

  await Promise.all(tasks);
});
