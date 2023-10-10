import { IsString, IsEmail, IsStrongPassword, IsOptional, IsEnum } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDTO {
  
  @IsString({ message: 'O campo NOME é obrigatório' })
  nome: string;

  @IsEmail({}, { message: 'O campo EMAIL é obrigatório' })
  email: string;

    @IsStrongPassword({
    
        minLength: 6,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0
    })
    senha: string;

    @IsOptional()
    @IsEnum(Role)
    role: number;
    
  


    

    
}