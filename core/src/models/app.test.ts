import shortid from "shortid";
import { Category, Repo, UserProfile, Account, AuditInfo } from "./app";

describe("App Models", (): void => {
  const auditInfo: AuditInfo = {
    created: new Date(),
    updated: new Date()
  };

  const githubAccount: Account = {
    id: shortid.generate(),
    email: "wallace@breza.me",
    providerId: "wbreza",
    accessToken: "ABC123",
    refreshToken: "XYZ789",
    audit: auditInfo
  };

  const user: UserProfile = {
    id: shortid.generate(),
    email: "wallace@breza.me",
    firstName: "Wallace",
    lastName: "Breza",
    accounts: [githubAccount],
    audit: auditInfo
  };

  const category: Category = {
    id: shortid.generate(),
    name: "Personal",
    userId: user.id,
    audit: auditInfo
  };

  const repo: Repo = {
    id: shortid.generate(),
    name: "paddleboard",
    accountId: githubAccount.id,
    categoryId: category.id,
    userId: user.id,
    audit: auditInfo
  }

  it("exists without typescript error", (): void => {
    expect(repo).not.toBeNull();
    expect(repo.id).not.toBeNull();
    expect(category.id).not.toBeNull();
    expect(user.id).not.toBeNull();
    expect(githubAccount.id).not.toBeNull();
  });
});
