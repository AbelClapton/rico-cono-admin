export interface UserRole {
  id: number
  name: string
  accessLevel: number
}

export interface UserAccount {
  email: string
  password: string
  user_metadata: UserAccountMetadata
}

export interface UserAccountMetadata {
  name: string
  phone: string
  ci: string
  role: UserRole
}
