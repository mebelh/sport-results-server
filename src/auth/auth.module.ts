import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthCode, AuthCodeSchema } from 'auth/authCode.model';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'users/users.module';
import { JwtModule } from 'jwt/jwt.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule,
    MongooseModule.forFeature([
      {
        name: AuthCode.name,
        schema: AuthCodeSchema,
      },
    ]),
  ],
  exports: [AuthService],
})
export class AuthModule {}
