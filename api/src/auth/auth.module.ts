import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";

@Module({
    imports: [
        PrismaModule,
        forwardRef (() => UserModule),
        JwtModule.register({
        secret: process.env.JWT_SECRET
    })],
    controllers:[AuthController],
    providers: [AuthService, UserService],
    exports: [AuthService]
    
})

export class AuthModule{

}