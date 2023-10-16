import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/entity';

export const userEntityList: UserEntity[] = [
  {
    nome: 'Cauã Luca',
    email: 'caualuca@gmail.com',
    id: 1,
    senha: '$2b$10$CoZIpYGsotSxz5X/eq7QuOAxhwKPK6iZpXAWMnkUk3hF4IT3LN3Xa',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nome: 'Samuel',
    email: 'samu@gmail.com',
    id: 2,
    senha: '$2b$10$CoZIpYGsotSxz5X/eq7QuOAxhwKPK6iZpXAWMnkUk3hF4IT3LN3Xa',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nome: 'Adolfo',
    email: 'adolfo@gmail.com',
    id: 3,
    senha: '$2b$10$CoZIpYGsotSxz5X/eq7QuOAxhwKPK6iZpXAWMnkUk3hF4IT3LN3Xa',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
