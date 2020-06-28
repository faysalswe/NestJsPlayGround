import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model, Types } from 'mongoose';
import { Ticket } from 'src/schemas/ticket.schema';
import { NewTicket } from 'src/dto/scrum-poker';

@Injectable()
export class TicketService {
    constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
    ) { }
    
    async getTicketByRoom(): Promise<any> {
        return this.ticketModel.find().exec();
    }

    async getTicket(id): Promise<any> {
        return this.ticketModel.findById(Types.ObjectId(id)).exec();
    }

    async createNewTicket(newTicket: NewTicket): Promise<Ticket> {
        const createdCat = new this.ticketModel(newTicket);
        // explanation this line
        // this.ticketModel.remove({}).exec();
        return createdCat.save();
    }

    async updateTicket(ticket: NewTicket): Promise<any> {
        const res = this.ticketModel.findOneAndUpdate().exec();
        return res;
    }

    async deleteTicket(id: number): Promise<any> {
        const objectId = Types.ObjectId(id);
        const data = this.ticketModel.findByIdAndDelete(objectId).exec();
        return data;
    }
}
