import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class SseMiddleware implements NestMiddleware {
  clients = [];
  nests = [];
  use(req: any, res: any, next: () => void) {
  }
}
