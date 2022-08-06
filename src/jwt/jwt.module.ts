import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModule as JWTModule } from '@nestjs/jwt';

@Module({
  providers: [JwtService],
  imports: [
    JWTModule.register({
      secret: process.env.PRIVATE_KEY || 'secret',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [JwtService],
})
export class JwtModule {}
