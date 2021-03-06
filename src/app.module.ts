import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomSchema, Room } from './schemas/room';
import { RoomService } from './services/room.service';
import { RoomController } from './controller/room.controller';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CON_STRING),
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema }
    ]),
  ],
  controllers: [ AppController, RoomController ],
  providers: [ RoomService ],
})
export class AppModule {
  constructor() {
  }
}
