import { Module, ModuleMetadata } from '@nestjs/common';
import mongoose from 'mongoose';
import { DATABASE_CONNECTION } from 'database/constants';

const databaseProviders: ModuleMetadata['providers'] = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_URI),
  },
];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
