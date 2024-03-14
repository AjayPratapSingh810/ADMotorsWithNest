import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class LoginUserDto {
    @IsString()
    name:string;
    @IsNotEmpty()
    password: string;
}