
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TicketUserPoint extends Document {
  
  @Prop()
  ticketPointId: string;

  @Prop()
  userId: string;

  @Prop()
  point: boolean;

}

export const TicketUserPointSchema = SchemaFactory.createForClass(TicketUserPoint);