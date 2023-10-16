import { Role } from '../enums/role.enum';
import { UpdatePutUserDTO } from '../user/dto/update-put-user.dto';

export const updatePutUserDTO: UpdatePutUserDTO = {
  email: 'caualuca@gmail.com',
  nome: 'Cauã Luca',
  role: Role.User,
  senha: '123456',
};
