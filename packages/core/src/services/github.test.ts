import { GitHubService, GitHubServiceOptions } from "./github";

describe("Github Service", () => {
  it("Can generate a github JWT token", () => {
    const options: GitHubServiceOptions = {
      appId: "42342"
    };
    const githubService = new GitHubService(options)
    const jwt = githubService.createAppToken();

    expect(jwt).not.toBeNull();
  });
});
