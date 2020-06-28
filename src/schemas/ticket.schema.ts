
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Ticket extends Document {
  @Prop()
  title: string;

  @Prop()
  point: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);