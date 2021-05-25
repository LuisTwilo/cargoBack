import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateIntegrationDTO } from '../dto/integration.dto';
import { IntegrationService } from '../service/integration.service';

@Controller('integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post()
  async createIntegration(@Body() integration: CreateIntegrationDTO) {
    return await this.integrationService.createIntegration(integration);
  }

  @Get()
  async getAllIntegrations() {
    return await this.integrationService.getAllIntegrations();
  }
}
