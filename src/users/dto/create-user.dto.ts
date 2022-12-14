export class CreateUserDto {
  phone: string;
}

export class SendAuthCodeDto {
  phone: string;
}

export class AuthUserDto {
  phone: string;
  code: string;
}
