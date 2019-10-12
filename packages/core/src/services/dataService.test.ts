import { RepositoryService } from "./repositoryService";
import { UserProfileService } from "./userProfileService";
import { CategoryService } from "./categoryService";
import { PullRequestService } from "./pullRequestService";
import { AccountService } from "./accountService";
import { UserProfile, Repository, Category, PullRequest, Account, ProviderType } from "../models/app";

describe("Repository Data Service", (): void => {
  it("CRUD operations", async (): Promise<void> => {
    const userProfileService = new UserProfileService();
    const repoService = new RepositoryService();
    const categoryService = new CategoryService();
    const pullRequestService = new PullRequestService();
    const accountService = new AccountService();

    await Promise.all([
      userProfileService.init(),
      accountService.init(),
      categoryService.init(),
      repoService.init(),
      pullRequestService.init(),
    ]);

    let user: UserProfile = {
      email: "wallace@breza.me",
      firstName: "Wallace",
      lastName: "Breza"
    };

    user = await userProfileService.getByEmail("wallace@breza.me") || await userProfileService.save(user);

    let githubAccount: Account = {
      userId: user.id,
      providerId: "wbreza",
      providerType: ProviderType.GitHub,
      metadata: {
        login: "wbreza",
        id: 6540159,
        type: "user",
        name: "Wallace Breza"
      }
    }

    githubAccount = await accountService.getByProvider(githubAccount.providerId, githubAccount.providerType) || await accountService.save(githubAccount);

    let category: Category = {
      name: "Personal",
      description: "Holds all my personal repos",
      userId: user.id
    };

    category = await categoryService.findSingle({ name: category.name }) || await categoryService.save(category);

    let repo: Repository = {
      categoryId: category.id,
      accountId: githubAccount.id,
      userId: user.id,
      name: "Paddleboard",
      portalUrl: "https://github.com/wbreza/paddleboard"
    };

    repo = await repoService.findSingle({ name: repo.name }) || await repoService.save(repo);
    repo = await repoService.get(repo.id, user.id);

    let pullRequest: PullRequest = {
      categoryId: category.id,
      repositoryId: repo.id,
      userId: user.id,
      accountId: githubAccount.id,
      name: "Create the data services",
      description: "Creates the data services for paddleboard",
      portalUrl: "https://github.com/wbreza/paddleboard/pulls/2"
    };

    pullRequest = await pullRequestService.findSingle({ repositoryId: repo.id }) || await pullRequestService.save(pullRequest);

    expect(user).not.toBeNull();
    expect(category).not.toBeNull();
    expect(repo).not.toBeNull();
    expect(pullRequest).not.toBeNull();
  });
});
