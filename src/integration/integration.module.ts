import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConnectionModule } from 'src/connection/connection.module';
import { JobModule } from 'src/job/job.module';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FlowController } from './controller/flow.controller';
import { IntegrationController } from './controller/integration.controller';
import { FlowEntity } from './model/flow.entity';
import { IntegrationEntity } from './model/integration.entity';
import { FlowService } from './service/flow.service';
import { IntegrationService } from './service/integration.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IntegrationEntity, FlowEntity]),
    AuthModule,
    JobModule,
    ConnectionModule,
  ],
  controllers: [IntegrationController, FlowController],
  providers: [
    IntegrationService,
    FlowService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class IntegrationModule {}
