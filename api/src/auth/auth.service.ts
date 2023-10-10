import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common/exceptions/';
import { User } from '@prisma/client';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

        private issuer = 'login';
        private audience = 'users';

    constructor(
        private readonly jwtService: JwtService,
        private readonly prsima: PrismaService,
        private readonly userService: UserService,
    ) {}

    createToken(user: User) {
        return {
            accessToken: this.jwtService.sign(
                {
                    id: user.id,
                    nome: user.nome,
                    email: user.email,
                },
                {
                    expiresIn: '7 days',
                    subject: String(user.id),
                    issuer: this.issuer,
                    audience: this.audience,
                },
            ),
        };
    }

    checkToken(token: string) {
        try{
        const data = this.jwtService.verify(token, {
            audience: this.audience,
            issuer: this.issuer
        });
        return data;
    }catch(e){
        throw new BadRequestException(e)
    }
    }

    isValidToken(token: string){
        try{
            this.checkToken(token)
            return true;
        }catch(e) {
            return false;
        }
    }

    async login(email: string, senha: string) {
        const user = await this.prsima.user.findFirst({
            where: {
                email,
            },
        });

        if (!user) {
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }

       if(!await bcrypt.compare(senha, user.senha)){
        throw new UnauthorizedException('E-mail e/ou senha incorretos.')
       }

        return this.createToken(user);
    }

    async forget(email: string) {
        const user = await this.prsima.user.findFirst({
            where: {
                email,
            },
        });

        if (!user) {
            throw new UnauthorizedException('E-mail está incorreto.');
        }

        return true;
    }

    async reset(senha: string, token: string) {
        // Validar o token

        const id = 0; // Altere a lógica para obter o ID do usuário

        const user = await this.prsima.user.update({
            where: {
                id,
            },
            data: {
                senha,
            },
        });

        return this.createToken(user);
    }

    async register(newUser: AuthRegisterDTO) {
        const user = await this.userService.create(newUser);

        return this.createToken(user);
    }
}
