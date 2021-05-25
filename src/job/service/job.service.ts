import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SalesforceAPI } from 'src/connection/application/Salesforce/salesforceApiService';
import { ConnectionService } from 'src/connection/service/connection.service';
import { Repository } from 'typeorm';
import { JobEntity } from '../model/job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
    private readonly salesforceApi: SalesforceAPI,
    private readonly connectionservice: ConnectionService,
  ) {}

  async runJob(job, data, bearer, sObject) {
    await this.jobRepository.save(job);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearer}`,
    };
  }

  async getSalesforceData(query: string, connectionId: number) {
    let instanceUrl = await (
      await this.connectionservice.getOneConnection(connectionId)
    ).instance_url;
    let bearer = await this.connectionservice.getSalesforeBearerTokenWithRefresToken(
      connectionId,
    );
    return await this.salesforceApi.querySFData(
      instanceUrl,
      query,
      bearer.access_token,
    );
  }

  async getSakesfirceObjects(connectionId: number) {
    let instanceUrl = await (
      await this.connectionservice.getOneConnection(connectionId)
    ).instance_url;

    let bearer = await this.connectionservice.getSalesforeBearerTokenWithRefresToken(
      connectionId,
    );

    return await this.salesforceApi.getListofAvailableObjects(
      instanceUrl,
      bearer.access_token,
    );
  }

  async getObjectFields(object: string, connectionId: number) {
    let instanceUrl = await (
      await this.connectionservice.getOneConnection(connectionId)
    ).instance_url;

    let bearer = await this.connectionservice.getSalesforeBearerTokenWithRefresToken(
      connectionId,
    );

    return await this.salesforceApi.getObjectFields(
      bearer.access_token,
      object,
      instanceUrl,
    );
  }

  async insertSFData(object: string, connectionId: number, data: any[]) {
    let instanceUrl = await (
      await this.connectionservice.getOneConnection(connectionId)
    ).instance_url;

    let bearer = await this.connectionservice.getSalesforeBearerTokenWithRefresToken(
      connectionId,
    );

    return await this.salesforceApi.insertObjectList(
      data,
      object,
      instanceUrl,
      bearer.access_token,
    );
  }
}
