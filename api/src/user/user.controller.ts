import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

// @UseInterceptors(LogInterceptor)

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  //criar um constructor de lista
  constructor(private readonly userService: UserService) {}

  private usuarios = [];

  @Post()
  async create(@Body() newUser: CreateUserDTO) {
    //inserir o usuario na lista
    this.usuarios.push(newUser);
    return this.userService.create(newUser);
    return 'Deu boa champs';
  }

  @Get()
  async list() {
    //retornar lista da classe
    // return this.usuarios;
    return this.userService.list();
  }

  // @Get('alphabetical')
  // findAllAlphabetical() {
  //     return this.userService.listAlphabetical();
  // }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return this.userService.showOne(id);
  }

  @Get(':id/uppercase-name')
  getUppercaseName(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUppercaseName(id);
  }

  //     const newArray = this.usuarios.filter((usuario) => {

  //         return usuario.name == nomeRecebido && usuario.email == emailRecebido;
  //     })

  //     return newArray;

  @Put(':id')
  async update(
    @Body() data: UpdatePutUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
