import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { UsersModule } from 'users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EquipmentModule } from 'equipment/equipment.module';
import { AuthModule } from 'auth/auth.module';
import { DatabaseModule } from 'database/database.module';
import { JwtModule } from 'jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule,
    EquipmentModule,
    AuthModule,
    DatabaseModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
