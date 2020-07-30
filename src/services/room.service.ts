import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Room } from 'src/schemas/room';

@Injectable()
export class RoomService {
    constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    ) { }
    
    async gets(): Promise<Array<Room>> {
        return this.roomModel.find().exec();
    }

    async get(id): Promise<Room> {
        return this.roomModel.findById(Types.ObjectId(id)).exec();
    }

    async add(newRoom): Promise<any> {
        const createdCat = new this.roomModel(newRoom);
        return createdCat.save();
    }

    async update(newRoom): Promise<any> {
        await this.roomModel.updateOne({ _id: newRoom._id }, newRoom).exec();
        return this.roomModel.findById(Types.ObjectId(newRoom._id)).exec();
    }

    async delete(id: number): Promise<any> {
        return this.roomModel.findByIdAndRemove(Types.ObjectId(id)).exec();
    }
}
