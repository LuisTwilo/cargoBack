import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntegrationModule } from './integration/integration.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConnectionModule } from './connection/connection.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, IntegrationModule, AuthModule, ConnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
