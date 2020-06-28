
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Room extends Document {
  
  @Prop()
  title: string;

}

export const RoomSchema = SchemaFactory.createForClass(Room);