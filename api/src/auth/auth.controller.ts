import { Controller, Post, Body, Headers, UseGuards, Req } from '@nestjs/common'
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';


@Controller('auth')

export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() {email, senha}: AuthLoginDTO) {
        return this.authService.login(email, senha)
     }

    @Post('register')
    async register(@Body() newUser: AuthRegisterDTO) {
        // this.usuarios.push(newUser)
        return this.authService.register(newUser)

     }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO) {
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() {senha, token}: AuthResetDTO){
        return this.authService.reset(senha, token);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user){
        return { user};
    }


}