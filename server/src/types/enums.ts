export enum RoleType {
  'SUPER_ADMIN' = 1,
  'BUSINESS_ADMIN' = 2,
  'BUSINESS_ACCOUNT' = 3,
  'DEFAULT_ACCOUNT' = 4,
}

export enum StatusType {
  'PENDING' = 1,
  'ACCEPTED' = 2,
  'EXPIRED' = 3,
}

export enum RolePermission {
  'READ' = 1,
  'WRITE' = 2,
  'UPDATE' = 3,
  'DELETE' = 4,
  'REJECT' = 5,
  'APPROVE' = 6,
  'NO_ACCESS' = 7,
}
