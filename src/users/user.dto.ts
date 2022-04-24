export interface UserDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  hash: string;
  firstName: string;
  lastName: string;
}
