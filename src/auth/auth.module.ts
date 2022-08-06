import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'users/users.module';
import { JwtModule } from 'jwt/jwt.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [forwardRef(() => UsersModule), JwtModule],
  exports: [AuthService],
})
export class AuthModule {}
