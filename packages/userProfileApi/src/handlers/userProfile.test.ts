import { CloudContextBuilder } from "@multicloud/sls-core";
import { getUserProfileList } from "./userProfile";

describe("User Profile Handlers", () => {
  describe("getUserProfileList", () => {
    it("get a list of user profiles", async () => {
      const builder = new CloudContextBuilder();
      const context = await builder
        .asHttpRequest()
        .withRequestMethod("GET")
        .invokeHandler(getUserProfileList);

      expect(context.res.body.value.length).toBeGreaterThanOrEqual(1);
      expect(context.res.status).toEqual(200);
    });
  });
});
