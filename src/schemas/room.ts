
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Room extends Document {
  
  @Prop(raw([{
    email: { type: String },
    fullName: { type: String },
    point: { type: Number },
    isAdmin: { type: Boolean }
  }]))
  users: Record<string, any>[];

  @Prop(raw([{
    title: { type: String },
    point: { type: Number },
    users:[{
      userId: { types: SchemaTypes.ObjectId },
      point: { type: Number}
    }]
  }]))
  cards: Record<string, any>[];

  @Prop()
  isVisibleToAll: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);