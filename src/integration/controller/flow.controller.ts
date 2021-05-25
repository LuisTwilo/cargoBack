import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FlowDTO } from '../dto/flow.dto';
import { FlowService } from '../service/flow.service';

@Controller('flow')
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

  @Post()
  createFlow(@Body() flow: FlowDTO) {
    return this.flowService.createflow(flow);
  }

  @Get(':integrationId')
  async getAllFlows(@Param() { integrationId }) {
    return await this.flowService.getAllFlows(integrationId);
  }

  @Get('salesforce/:connectionId/objects')
  async getSalesforceObjects(@Param() { connectionId }) {
    return await this.flowService.getSalesforceObjects(connectionId);
  }

  @Get('salesforce/:connectionId/objects/:object')
  async getSalesforceObjectfields(@Param() { connectionId, object }) {
    return await this.flowService.getObjectFields(object, connectionId);
  }
}
