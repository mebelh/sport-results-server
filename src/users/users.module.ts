import { forwardRef, Module, ModuleMetadata } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Connection } from 'mongoose';
import { userSchema } from 'users/users.model';
import { USER_MODEL } from 'users/constants';
import { DATABASE_CONNECTION } from 'database/constants';
import { DatabaseModule } from 'database/database.module';
import { AuthModule } from 'auth/auth.module';
import { JwtModule } from 'jwt/jwt.module';

export const usersProviders: ModuleMetadata['providers'] = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('User', userSchema),
    inject: [DATABASE_CONNECTION],
  },
];

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule), JwtModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService, ...usersProviders],
})
export class UsersModule {}
