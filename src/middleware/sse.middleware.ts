import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class SseMiddleware implements NestMiddleware {
  clients = [];
  data = {};
  use(req: any, res: any, next: () => void) {
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
    // next();
  }
}
