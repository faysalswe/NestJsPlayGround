import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomSchema, Room } from './schemas/room';
import { RoomService } from './services/room.service';
import { RoomController } from './controller/room.controller';
import { SseController } from './controller/sse.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema }
    ]),
  ],
  controllers: [ AppController, RoomController, SseController ],
  providers: [ RoomService ],
})
export class AppModule {}
