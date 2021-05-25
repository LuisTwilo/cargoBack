import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesforceConnection } from './application/Salesforce/connection.salesforce.entity';
import { SalesforceAPI } from './application/Salesforce/salesforceApiService';
import { ConnectionController } from './controller/connection.controller';
import { ConnectionService } from './service/connection.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalesforceConnection]), HttpModule],
  controllers: [ConnectionController],
  providers: [ConnectionService, SalesforceAPI],
  exports: [ConnectionService, SalesforceAPI],
})
export class ConnectionModule {}
