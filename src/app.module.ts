import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { TicketSchema, Ticket } from './schemas/ticket.schema';
import { UserSchema, User } from './schemas/user.schema';
import { RoomSchema, Room } from './schemas/room';
import { RoomService } from './services/room.service';
import { RoomController } from './controller/room.controller';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { TicketController } from './controller/ticket.controller';
import { TicketService } from './services/ticket.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: User.name, schema: UserSchema },
      { name: Ticket.name, schema: TicketSchema }
    ])
  ],
  controllers: [AppController, RoomController, UserController, TicketController],
  providers: [AppService, RoomService, UserService, TicketService],
})
export class AppModule {}
