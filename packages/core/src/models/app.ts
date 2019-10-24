export interface Entity {
  id?: string;
  audit?: AuditInfo;
}

export interface AuditInfo {
  created: Date;
  updated: Date;
}

export interface Category extends Entity {
  name: string;
  description?: string;
}

export interface Repository extends Entity {
  name: string;
  portalUrl: string;
  description?: string;
  categoryId?: string;
}

export interface PullRequest extends Entity {
  repositoryId: string;
  name: string;
  description?: string;
  portalUrl: string;
  state: PullRequestState;
}

export interface UserProfile extends Entity {
  email: string;
  firstName: string;
  lastName: string;
  accounts?: Account[];
  categories?: Category[];
  repositories?: Repository[];
  recentPullRequests?: PullRequest[];
}

export interface Account extends Entity {
  providerType: string;
  providerId: string;
  metadata: any;
}

export enum PullRequestState {
  New = "new",
  Read = "read",
  Approved = "approved",
  RequestChanges = "request-changes",
  Closed = "closed"
}

export enum ProviderType {
  GitHub = "github",
  Azure = "azdo",
  GitLab = "gitlab",
  BitBucket = "bitbucket"
};
