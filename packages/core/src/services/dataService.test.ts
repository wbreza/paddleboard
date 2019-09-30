import { RepositoryService } from "./repositoryService";
import { UserProfileService } from "./userProfileService";
import { CategoryService } from "./categoryService";
import { PullRequestService } from "./pullRequestService";
import { UserProfile, Repository, Category, PullRequest } from "../models/app";
import shortid from "shortid";

describe("Repository Data Service", (): void => {
  it("CRUD operations", async (): Promise<void> => {
    const userProfileService = new UserProfileService();
    const repoService = new RepositoryService();
    const categoryService = new CategoryService();
    const pullRequestService = new PullRequestService();

    await Promise.all([
      userProfileService.init(),
      categoryService.init(),
      repoService.init(),
      pullRequestService.init(),
    ]);

    let user: UserProfile = {
      email: "wallace@breza.me",
      firstName: "Wallace",
      lastName: "Breza",
      accounts: [{
        id: shortid.generate(),
        providerId: "wbreza",
        email: "wallace@breza.me",
        accessToken: "ABC123",
        refreshToken: "XYZ789"
      }]
    };

    user = await userProfileService.getByEmail("wallace@breza.me") || await userProfileService.save(user);

    let category: Category = {
      name: "Personal",
      description: "Holds all my personal repos",
      userId: user.id
    };

    category = await categoryService.findSingle({ name: category.name }) || await categoryService.save(category);

    let repo: Repository = {
      categoryId: category.id,
      accountId: user.accounts[0].id,
      userId: user.id,
      name: "Paddleboard"
    };

    repo = await repoService.findSingle({ name: repo.name }) || await repoService.save(repo);

    let pullRequest: PullRequest = {
      categoryId: category.id,
      repositoryId: repo.id,
      userId: user.id,
      name: "Create the data services",
      description: "Creates the data services for paddleboard",
      portalUrl: "https://github.com/wbreza/paddleboard/pulls/2",
      providerId: "2"
    };

    pullRequest = await pullRequestService.findSingle({ repositoryId: repo.id }) || await pullRequestService.save(pullRequest);

    expect(user).not.toBeNull();
    expect(category).not.toBeNull();
    expect(repo).not.toBeNull();
    expect(pullRequest).not.toBeNull();
  });
});
