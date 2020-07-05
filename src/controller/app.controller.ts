import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  async getTicketsByRoom(): Promise<any> {
    return { status: 'server running' };
  }
}
