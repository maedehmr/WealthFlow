import { UserModel } from '@repo/models';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toDomain(entity: User): UserModel {
    return {
      id: entity.id,
      email: entity.email,
      createdAt: entity.createdAt.toISOString(),
    };
  }
}
