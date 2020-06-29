import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class User extends Document {

    @Prop()
    userId: string;
    @Prop()
    name: string;
    @Prop()
    point: number;
    @Prop()
    isAdmin: boolean;
    @Prop({type: SchemaTypes.ObjectId, ref:'Room'})
    _roomId;
}

export const UserSchema = SchemaFactory.createForClass(User);