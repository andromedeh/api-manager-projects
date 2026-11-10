import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignUpDTO {
  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'The email of the user', uniqueItems: true })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ description: 'The password of the user', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string

  @ApiProperty({
    description: 'User role',
    enum: Role,
    default: Role.ADMIN,
    required: false,
  })
  @IsEnum(Role)
  role?: Role = Role.ADMIN
}

export class SignInDTO {
  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string
}

export class ForgotPasswordDTO {
  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string
}

export class ResetPasswordDTO {
  @ApiProperty({ description: 'Reset token' })
  @IsString()
  @IsNotEmpty()
  token: string

  @ApiProperty({ description: 'The new password of the user', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string
}
