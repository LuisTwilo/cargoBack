import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConnectionService } from '../service/connection.service';

@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Get()
  async getConnections() {
    return await this.connectionService.getConnections();
  }

  @Post('sfbt')
  async getSFBearerToken(@Body() _id) {
    this.connectionService.getSalesforeBearerTokenWithRefresToken(_id);
  }

  @Post('/oauthcallback')
  async handlecallback(@Body() callback) {
    await this.connectionService.createConnection(callback);
  }
}
