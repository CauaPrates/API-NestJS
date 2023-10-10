import { CanActivate, ExecutionContext, Injectable, } from '@nestjs/common'
import { log } from 'console';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
        ) { }



    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;

        try {
            const data = this.authService.checkToken((authorization ?? '').split(' ')[1]);

            request.tokenPayload = data;

            request.user = await this.userService.showOne(data.id)

            return true;

        } catch (e) {
            return false;
        }


    }


}