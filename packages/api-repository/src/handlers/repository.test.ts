import shortid from "shortid";
import { CloudContextBuilder } from "@multicloud/sls-core";
import { RepositoryService, Repository, UserProfile, UserProfileService } from "@paddleboard/core";
import { getRepositoryListByUser } from "./repository";

describe("Repository Handlers", () => {
  let userProfile: UserProfile;
  let repositories: Repository[];

  beforeAll(() => {
    userProfile = {
      id: shortid.generate(),
      firstName: "Wallace",
      lastName: "Breza",
      email: "wallace@breza.me"
    };

    repositories = [{
      id: shortid.generate(),
      name: "paddleboard",
      accountId: shortid.generate(),
      userId: userProfile.id,
      portalUrl: "https://github.com/wbreza/paddleboard"
    }];

    UserProfileService.prototype.get = jest.fn(() => Promise.resolve(userProfile));
    RepositoryService.prototype.getByUser = jest.fn(() => Promise.resolve(repositories));
  });

  describe("Get repository list by users returns list of expected repos", () => {
    it("get a list of user profiles", async () => {
      const builder = new CloudContextBuilder();
      const context = await builder
        .asHttpRequest()
        .withRequestMethod("GET")
        .withRequestPathParams({
          userId: "abc123"
        })
        .invokeHandler(getRepositoryListByUser);

      expect(context.res.body).toEqual({ value: repositories });
      expect(context.res.status).toEqual(200);
    });
  });
});
