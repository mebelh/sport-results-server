import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { UsersModule } from 'users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EquipmentModule } from 'equipment/equipment.module';
import { AuthModule } from 'auth/auth.module';
import { JwtModule } from 'jwt/jwt.module';
import { ExercisesModule } from 'exercises/exercises.module';
import { WorkoutController } from 'workout/workout.controller';
import { WorkoutModule } from 'workout/workout.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ResultModule } from 'result/result.module';
import { ApproachModule } from 'approach/approach.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    EquipmentModule,
    ExercisesModule,
    AuthModule,
    JwtModule,
    WorkoutModule,
    ResultModule,
    ApproachModule,
  ],
  controllers: [AppController, WorkoutController],
  providers: [AppService],
})
export class AppModule {}
