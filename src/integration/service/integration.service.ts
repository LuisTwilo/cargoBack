import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIntegrationDTO } from '../dto/integration.dto';
import { IntegrationEntity } from '../model/integration.entity';

@Injectable()
export class IntegrationService {
  constructor(
    @InjectRepository(IntegrationEntity)
    private readonly integrationRepository: Repository<IntegrationEntity>,
  ) {}

  async createIntegration(integration: CreateIntegrationDTO) {
    return await this.integrationRepository.save(integration);
  }

  async getAllIntegrations() {
    return await this.integrationRepository.find({
      relations: ['flows'],
    });
  }
}
