import { Schema as MongooseType  } from 'mongoose';
export class NewRoom {
    readonly title: string;
}

export class NewUser {
    readonly userId: string;
    readonly name: string;
    readonly point: number;
    readonly isAdmin: boolean;
    readonly roomId: MongooseType.Types.ObjectId
}

export class NewTicket {
    readonly roomId: string;
    readonly title: string;
    readonly point: number;
}

export class NewTicketUserPoint {
    readonly ticketPointId: string;
    readonly userId: string;
    readonly point: number;
}

