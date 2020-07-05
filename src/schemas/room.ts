
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Room extends Document {
  
  @Prop(raw([{
    userId: { type: String },
    name: { type: String },
    point: { type: Number },
    isAdmin: { type: Boolean }
  }]))
  users: Record<string, any>[];

  @Prop(raw([{
    title: { type: String },
    point: { type: Number },
    userCardPoints: [{ 
      point: { type: Number},
      userId: { type: String }
    }]
  }]))
  cards: Record<string, any>[];

  @Prop()
  isVisibleToAll: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);