import { Controller, Body, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { TicketService } from '../services/ticket.service';
import { NewTicket } from 'src/dto/scrum-poker';

@Controller('ticket/')
export class TicketController {
    constructor(private readonly appService: TicketService) {}

  @Get()
  async getTicketsByRoom(): Promise<any> {
    return await this.appService.getTicketByRoom();
  }

  @Get(':id')
  async getTicket(@Param('id') id): Promise<any> {
    return await this.appService.getTicket(id);
  }

  @Post()
  async createNewTicket(@Body() newTicket: NewTicket): Promise<any> {
   return await this.appService.createNewTicket(newTicket);
  }

  @Put()
  async updateTicket(@Body() ticket: NewTicket): Promise<any> {
   return await this.appService.updateTicket(ticket);
  }

  @Delete(':id')
  async deleteTicket(@Param('id') id: number): Promise<any> {
   return await this.appService.deleteTicket(id);
  }
}
