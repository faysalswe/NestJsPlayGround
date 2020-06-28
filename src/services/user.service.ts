import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model, Types } from 'mongoose';
import { NewUser } from 'src/dto/scrum-poker';

@Injectable()
export class UserService {
    constructor(
    @InjectModel(User.name) private readonly roomModel: Model<User>,
    ) { }
    
    async gets(): Promise<Array<User>> {
        return this.roomModel.find().exec();
    }

    async get(id): Promise<User> {
        return this.roomModel.findById(Types.ObjectId(id)).exec();
    }

    async add(newUser: NewUser): Promise<any> {
        const createdCat = new this.roomModel(newUser);
        return createdCat.save();
    }

    async update(newUser): Promise<any> {
        return this.roomModel.updateOne({ title: newUser.title }, newUser).exec();
    }

    async delete(id: number): Promise<any> {
        return this.roomModel.findByIdAndRemove(Types.ObjectId(id)).exec();
    } 
}
