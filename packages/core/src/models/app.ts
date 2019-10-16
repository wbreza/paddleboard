export interface Entity {
  id?: string;
  audit?: AuditInfo;
}

export interface AuditInfo {
  created: Date;
  updated: Date;
}

export interface Category extends Entity {
  userId: string;
  name: string;
  description?: string;
}

export interface Repository extends Entity {
  categoryId?: string;
  accountId: string;
  userId: string;
  name: string;
  portalUrl: string;
  description?: string;
}

export interface PullRequest extends Entity {
  repositoryId: string;
  categoryId?: string;
  accountId: string;
  userId: string;
  name: string;
  description?: string;
  portalUrl: string;
}

export interface UserProfile extends Entity {
  email: string;
  firstName: string;
  lastName: string;
  accounts?: Account[];
}

export interface Account extends Entity {
  userId: string;
  providerType: string;
  providerId: string;
  metadata: any;
}

export enum ProviderType {
  GitHub = "github",
  Azure = "azdo",
  GitLab = "gitlab",
  BitBucket = "bitbucket"
};
