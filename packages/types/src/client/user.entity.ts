import { Role } from '@prisma/client';
import { Token } from './token.entity';

export interface User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role[];
  email: string;
  phone: string;
  age: number;
  address: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  tokens?: Token[];
}
