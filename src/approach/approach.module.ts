import { Module } from '@nestjs/common';
import { ApproachService } from 'approach/approach.service';
import { ApproachRepository } from 'approach/approach.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Approach, ApproachSchema } from 'approach/approach.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Approach.name,
        schema: ApproachSchema,
      },
    ]),
  ],
  providers: [ApproachRepository, ApproachService],
  exports: [ApproachService, ApproachRepository],
})
export class ApproachModule {}
