import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomSchema, Room } from './schemas/room';
import { RoomService } from './services/room.service';
import { RoomController } from './controller/room.controller';
import { SseModule } from './sse/sse.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema }
    ]),
    SseModule
  ],
  controllers: [ AppController, RoomController ],
  providers: [ RoomService ],
})
export class AppModule {}
