
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseType  } from 'mongoose';



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
    @Prop()
    _roomId: {
        ref: 'Rooms',
        type: MongooseType.Types.ObjectId
    }
}

export const UserSchema = SchemaFactory.createForClass(User);