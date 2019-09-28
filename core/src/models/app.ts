export interface Category {
  id: string;
  userId: string;
  name: string;
  description?: string;
  audit: AuditInfo;
}

export interface Repo {
  id: string;
  categoryId?: string;
  accountId: string;
  userId: string;
  name: string;
  description?: string;
  audit: AuditInfo;
}

export interface PullRequest {
  id: string;
  repoId: string;
  providerId: string;
  userId: string;
  name: string;
  description?: string;
  audit: AuditInfo;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  audit: AuditInfo;
  accounts: Account[];
}

export interface AuditInfo {
  created: Date;
  updated: Date;
}

export interface Account {
  id: string;
  providerId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  audit: AuditInfo;
}
