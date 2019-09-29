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

export interface Repo extends Entity {
  categoryId?: string;
  accountId: string;
  userId: string;
  name: string;
  description?: string;
}

export interface PullRequest extends Entity {
  repoId: string;
  providerId: string;
  userId: string;
  name: string;
  description?: string;
}

export interface UserProfile extends Entity {
  email: string;
  firstName: string;
  lastName: string;
  accounts: Account[];
}

export interface Account extends Entity {
  providerId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
