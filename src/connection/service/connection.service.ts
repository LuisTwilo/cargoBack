import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesforceConnection } from '../application/Salesforce/connection.salesforce.entity';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(SalesforceConnection)
    private readonly connectionrepository: Repository<SalesforceConnection>,
    private readonly httpService: HttpService,
  ) {}

  async getConnections() {
    return await this.connectionrepository.find();
  }

  async createConnection(connection) {
    console.log(connection);
    let [clientId, name] = connection.state.split('+');
    let completeConnection = { name, clientId, ...connection };

    return await this.connectionrepository.save(completeConnection);
  }

  async getOneConnection(_id: number) {
    return await this.connectionrepository.findOne(_id);
  }

  async getSalesforeBearerTokenWithRefresToken(_id: number) {
    let connection = await this.getOneConnection(_id);
    let refreshToken = connection.refresh_token;
    let clientId = connection.clientId;

    const url = 'https://login.salesforce.com/services/oauth2/token';

    const data = `grant_type=refresh_token&client_id=${clientId}&refresh_token=${refreshToken}`;
    const bearer = await this.httpService.post(url, data).toPromise();
    return bearer.data;
  }
}
