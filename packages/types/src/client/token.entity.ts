import { User } from './user.entity';

export interface Token {
  token: string;
  expires: Date;
  userId: string;
  user?: User;
}
