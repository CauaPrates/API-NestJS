import { Injectable, NotFoundException, HttpException, HttpStatus } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private async exists(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`O usuário ${id} não existe!`);
    }
  }

  async create(data: CreateUserDTO) {

   data.senha = await bcrypt.hash(data.senha, await bcrypt.genSalt())

    return this.prisma.user.create({
      data,
    })


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

    senha = await bcrypt.hash(senha, await bcrypt.genSalt())

    const updatedUser = await this.prisma.user.update({
      data: { email, nome, senha, role },
      where: {
        id,
      },
    });

    return updatedUser;
  }

  async updatePartial(id: number, { email, nome, senha, role }: UpdatePatchUserDTO) {
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
      data.senha = await bcrypt.hash(senha, salt)
    }
    if (role) {
      data.role = role;
    }

    const updatedUser = await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });

    return updatedUser;
  }

  async delete(id: number) {
    await this.exists(id);

    const deletedUser = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Usuário excluído com sucesso.',
    };
  }

  async getUppercaseName(id: number) {
    const user = await this.showOne(id);
    if (!user) {
      throw new NotFoundException(`O usuário com o ID ${id} não foi encontrado!`);
    }

    const userWithUppercaseName = {
      ...user,
      nome: user.nome.toUpperCase(),
    };

    return userWithUppercaseName;
  }

  async listAlphabetical() {
    return this.prisma.user.findMany({
      orderBy: { nome: 'asc' },
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async showOne(id: number) {
    
    await this.exists(id)
    
    return this.prisma.user.findUnique({
      where: { 
        id },
    });
  }
}