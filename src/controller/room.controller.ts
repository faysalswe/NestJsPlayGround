import { Controller, Get, Param, Post, Body, Put, Delete, Res, Req } from '@nestjs/common';
import { RoomService } from 'src/services/room.service';
import { NewRoom } from 'src/dto/scrum-poker';

@Controller('room')
export class RoomController {
    clients = [];
    data = {};
    constructor(private readonly roomService: RoomService) {}

    @Get()
    async getTicketsByRoom(): Promise<any> {
      return await this.roomService.gets();
    }
 
    @Get('sse')
    sseEvent(@Req() req, @Res() res): any {
      const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      };
      res.writeHead(200, headers);

      const data = `data: ${JSON.stringify(this.data)}\n\n`;
      res.write(data);

      const clientId = Date.now();
      const newClient = {
        id: clientId,
        res
      };
      this.clients.push(newClient);

      req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        this.clients = this.clients.filter(c => c.id !== clientId);
      });
    }

    sendEventsToAll() {
      const data = `data: ${JSON.stringify(this.data)}\n\n`;
      this.clients.forEach(c => c.res.write(data));
    }

    @Post('invoke')
    invoke(@Req() req, @Res() res): any {
      this.data = req.body;
      // Send recently added nest as POST result
      res.json(this.data)
      // Invoke iterate and send function
      return this.sendEventsToAll();
    }

    @Get(':id')
    async getTicket(@Param('id') id): Promise<any> {
      return await this.roomService.get(id);
    }
  
    @Post()
    async createNewTicket(@Body() newRoom): Promise<any> {
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
