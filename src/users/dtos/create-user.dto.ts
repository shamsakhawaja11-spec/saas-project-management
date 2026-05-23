import { IsString, IsNotEmpty,IsEmail, MinLength, MaxLength } from "class-validator";
export class CreateUserDto{
    @IsString()
    @MaxLength(100)
    @MinLength(2)
    @IsNotEmpty()
    name!:string;
    @IsEmail()
    @IsNotEmpty()
    email!:string;
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(50)
    password!:string;
}

