import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from 'auth/auth.module';
import { JwtModule } from 'jwt/jwt.module';
import { UsersRepository } from 'users/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'users/users.model';

@Module({
  imports: [
    AuthModule,
    JwtModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
