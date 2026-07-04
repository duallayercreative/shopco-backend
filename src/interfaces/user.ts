import { User, UserRole, UserStatus } from "@prisma/client";

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: UserRole;
  status: UserStatus;
  image: string | null;
  phone: string | null;
  address: string | null;
  dateOfBirth: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const userResponse = (user: User): UserResponse => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    role: user.role,
    status: user.status,
    image: user.image,
    phone: user.phone,
    address: user.address,
    dateOfBirth: user.dateOfBirth,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
