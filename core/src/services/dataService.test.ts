import { UserProfileService } from "./userProfileService";
import { UserProfile } from "../models/app";

describe("DataService", () => {
  it("works", async () => {
    const userProfileService = new UserProfileService();
    await userProfileService.init();

    const user: UserProfile = {
      email: "wallace@breza.me",
      firstName: "Wallace",
      lastName: "Breza",
      accounts: [],
    };

    const newUser = await userProfileService.save(user);
    const foundUser = await userProfileService.get(newUser.id);

    expect(foundUser).not.toBeNull();
    expect(foundUser).toEqual(newUser);

    const allUsers = await userProfileService.list();
    const matchingUser = allUsers.find((user) => user.id === newUser.id);
    expect(matchingUser).toEqual(newUser);

    await userProfileService.delete(newUser.id);
  });
});
