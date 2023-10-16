import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const createUserDTO: CreateUserDTO = {
  email: 'caualuca@gmail.com',
  nome: 'Cauã Luca',
  role: Role.User,
  senha: '123456',
};
