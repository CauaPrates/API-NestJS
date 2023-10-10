import { IsEmail, IsString } from "class-validator";

export class CreateSneakerDTO {

    @IsString()
    sneaker: string;

    @IsEmail()
    emailUser: string;
    
    
}