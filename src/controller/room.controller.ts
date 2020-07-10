import { Controller, Get, Param, Post, Body, Put, Delete, Res, Req } from '@nestjs/common';
import { RoomService } from 'src/services/room.service';

@Controller('room')
export class RoomController {
    clients = [];
    data = null;
    constructor(private readonly roomService: RoomService) {}

    @Get()
    async getTicketsByRoom(): Promise<any> {
      return await this.roomService.gets();
    }
 
    @Get('sse/:id')
    sseEvent(@Req() req, @Res() res,@Param() param: any): any {
      const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      };
      res.writeHead(200, headers);

      const data = `data: ${JSON.stringify(this.data)}\n\n`;
      res.write(data);

      const index = this.clients.findIndex(x => x.id == param.id);
      if (index >= 0) {
        this.clients[index].res = res;
      } else {        
        this.clients.push({ id: param.id, res});
      }
      req.on('close', () => {
        console.log(`total client: ${this.clients.length} and ${param.id} Connection closed`);
        this.clients = this.clients.filter(c => c.id !== param.id);
      });
    }

    sendEventsToAll() {
      const data = `data: ${JSON.stringify(this.data)}\n\n`;
      this.clients.forEach(c => c.res.write(data));
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
    async updateTicket(@Req() req, @Res() res): Promise<any> {
      this.data = req.body;
      this.data = await this.roomService.update(this.data);
      res.json(this.data)
      return this.sendEventsToAll();
    }
  
    @Delete(':id')
    async deleteTicket(@Param('id') id: number): Promise<any> {
     return await this.roomService.delete(id);
    }
}
