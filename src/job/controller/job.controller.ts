import { Body, Controller, Param, Post } from '@nestjs/common';
import { JobService } from '../service/job.service';

@Controller('job')
export class Jobcontroller {
  constructor(private readonly jobService: JobService) {}
  @Post()
  createJob(@Body() job) {}

  @Post('getSFData')
  async getSFData(@Body() requBody: { connectionId: number; query: string }) {
    const { connectionId, query } = requBody;

    return await this.jobService.getSalesforceData(query, connectionId);
  }

  @Post('getSFObjects')
  async getSFObjects(@Param() connectionId) {
    return this.jobService.getSakesfirceObjects(connectionId);
  }

  @Post('getFieldDefinition')
  async getFieldDefinition(@Body() req) {
    return this.jobService.getObjectFields(req.object, req.connectionId);
  }

  @Post('createSFRecords')
  async createSFRecords(@Body() req) {
    return await this.jobService.insertSFData(
      req.object,
      req.connectionId,
      req.data,
    );
  }
}
