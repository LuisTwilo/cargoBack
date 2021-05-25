import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionModule } from 'src/connection/connection.module';
import { Jobcontroller } from './controller/job.controller';
import { JobEntity } from './model/job.entity';
import { JobService } from './service/job.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobEntity]),
    HttpModule,
    ConnectionModule,
  ],
  controllers: [Jobcontroller],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
