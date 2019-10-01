import { CloudContextBuilder } from "@multicloud/sls-core";
import { getRepositoryList } from "./repository";

describe("Repository Handlers", () => {
  describe("getRepositoryList", () => {
    it("get a list of user profiles", async () => {
      const builder = new CloudContextBuilder();
      const context = await builder
        .asHttpRequest()
        .withRequestMethod("GET")
        .invokeHandler(getRepositoryList);

      expect(context.res.body.value.length).toBeGreaterThanOrEqual(1);
      expect(context.res.status).toEqual(200);
    });
  });
});
