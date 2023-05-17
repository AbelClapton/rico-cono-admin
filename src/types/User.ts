import { UserRole } from './UserRole'

export interface User {
  id: string
  email: string
  role: UserRole
}

export interface UserProfile extends User {
  name?: string
  phone?: string
  ci?: string
}
