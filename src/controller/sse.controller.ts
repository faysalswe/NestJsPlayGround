import { Controller, Get, Param, Post, Body, Put, Delete, Res, Req } from '@nestjs/common';
import { RoomService } from 'src/services/room.service';

@Controller('sse')
export class SseController {
    clients = [];
    data = {};
    constructor(private readonly roomService: RoomService) {}

    @Get()
    async getTicketsByRoom(): Promise<any> {
      return await this.roomService.gets();
    }
 
    @Get('room')
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
}
