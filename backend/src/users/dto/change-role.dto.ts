import { IsString, IsIn } from 'class-validator';

export class ChangeRoleDto {
  @IsString()
  userId: string;

  @IsIn(['admin', 'user'])
  newRole: 'admin' | 'user';
}
