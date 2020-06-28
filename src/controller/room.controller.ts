import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { RoomService } from 'src/services/room.service';
import { NewTicket, NewRoom } from 'src/dto/scrum-poker';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    async getTicketsByRoom(): Promise<any> {
      return await this.roomService.gets();
    }
  
    @Get(':id')
    async getTicket(@Param('id') id): Promise<any> {
      return await this.roomService.get(id);
    }
  
    @Post()
    async createNewTicket(@Body() newRoom: NewRoom): Promise<any> {
     return await this.roomService.add(newRoom);
    }
  
    @Put()
    async updateTicket(@Body() newRoom: NewRoom): Promise<any> {
     return await this.roomService.update(newRoom);
    }
  
    @Delete(':id')
    async deleteTicket(@Param('id') id: number): Promise<any> {
     return await this.roomService.delete(id);
    }
}
