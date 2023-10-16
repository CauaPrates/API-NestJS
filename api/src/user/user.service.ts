import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async exists(id: number) {
    if (
      !(await this.usersRepository.exist({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe!`);
    }
  }

  async create(data: CreateUserDTO) {
    const existingUser = await this.usersRepository.exist({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Este e-mail já está sendo usado, por favor tente outro.',
      );
    }

    data.senha = await bcrypt.hash(data.senha, await bcrypt.genSalt());

    const user = this.usersRepository.create(data);

    return this.usersRepository.save(user);
  }

  //FAZ PARTE DO CREATE:
  // try {
  //   // Verifica se o e-mail já está cadastrado
  //   const existingUser = await this.prisma.user.findFirst({
  //     where: {
  //       email,
  //     },
  //   });

  //   if (existingUser) {
  //     throw new HttpException('E-mail já cadastrado', HttpStatus.BAD_REQUEST);
  //   }

  //   // Cria o usuário se o e-mail não existir
  //   const createdUser = await this.prisma.user.create({
  //     data: {
  //       nome,
  //       email,
  //       senha,
  //     },
  //     select: {
  //       id: true,
  //       nome: true,
  //     },
  //   });

  //   return createdUser;
  // } catch (error) {
  //   throw new HttpException('Erro ao criar usuário, endereço de E-mail já cadastrado', HttpStatus.BAD_REQUEST);
  // }

  async update(id: number, { email, nome, senha, role }: UpdatePutUserDTO) {
    await this.exists(id);

    senha = await bcrypt.hash(senha, await bcrypt.genSalt());

    await this.usersRepository.update(id, {
      email,
      nome,
      senha,
      role,
    });

    return this.showOne(id);
  }
  async updatePartial(
    id: number,
    { email, nome, senha, role }: UpdatePatchUserDTO,
  ) {
    await this.exists(id);

    const data: any = {};

    if (email) {
      data.email = email;
    }

    if (nome) {
      data.nome = nome;
    }

    if (senha) {
      const salt = await bcrypt.genSalt();
      data.senha = await bcrypt.hash(senha, salt);
    }
    if (role) {
      data.role = role;
    }

    await this.usersRepository.update(id, data);

    return this.showOne(id);
  }

  async delete(id: number) {
    await this.exists(id);

    await this.usersRepository.delete(id);

    return {
      message: 'Usuário excluído com sucesso.',
    };
  }

  async getUppercaseName(id: number) {
    const user = await this.showOne(id);
    if (!user) {
      throw new NotFoundException(
        `O usuário com o ID ${id} não foi encontrado!`,
      );
    }

    const userWithUppercaseName = {
      ...user,
      nome: user.nome.toUpperCase(),
    };

    return userWithUppercaseName;
  }

  async listAlphabetical() {
    return this.usersRepository.find({
      order: { nome: 'asc' },
    });
  }

  async list() {
    return this.usersRepository.find();
  }

  async showOne(id: number) {
    await this.exists(id);

    return this.usersRepository.findOneBy({
      id,
    });
  }
}
