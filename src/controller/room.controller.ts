import { Controller, Get, Param, Post, Body, Put, Delete, Res, Req } from '@nestjs/common';
import { RoomService } from 'src/services/room.service';

@Controller('room')
export class RoomController {
  clients = [];
  data = {};
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getTicketsByRoom(): Promise<any> {
    return await this.roomService.gets();
  }
 
  @Get('sse/:roomId/:userId')
  sseEvent(@Req() req, @Res() res,@Param() param: any): any {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
    console.log(this.data, "data");
    const data = `data: ${JSON.stringify(this.data[param.roomId])}\n\n`;
    res.write(data);
    
    const index = this.clients.findIndex(x => x.userId == param.userId);
    if (index >= 0) {
      this.clients[index].res = res;
    } else {        
      this.clients.unshift({ userId: param.userId, roomId: param.roomId, res});
    }
    req.on('close', () => {
      console.log(`total client: ${this.clients.length} and ${param.userId} Connection closed`);
      this.clients = this.clients.filter(c => c.userId !== param.userId);
    });
  }

  sendEventsToAll(roomId) {
    const data = `data: ${JSON.stringify(this.data[roomId])}\n\n`;
    this.clients.forEach(c => {
      if (roomId == c.roomId) {
        c.res.write(data);
      }
    });
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
    const entity = await this.roomService.update(req.body);
    this.data[entity._id] = entity;
    res.json(entity);
    return this.sendEventsToAll(entity._id);
  }

  @Delete(':id')
  async deleteTicket(@Param('id') id: number): Promise<any> {
    return await this.roomService.delete(id);
  }
}
