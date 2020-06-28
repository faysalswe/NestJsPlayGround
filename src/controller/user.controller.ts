import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { NewRoom, NewUser } from 'src/dto/scrum-poker';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getTicketsByRoom(): Promise<any> {
      return await this.userService.gets();
    }
  
    @Get(':id')
    async getTicket(@Param('id') id): Promise<any> {
      return await this.userService.get(id);
    }
  
    @Post()
    async createNewTicket(@Body() newUser: NewUser): Promise<any> {
     return await this.userService.add(newUser);
    }
  
    @Put()
    async updateTicket(@Body() newRoom: NewRoom): Promise<any> {
     return await this.userService.update(newRoom);
    }
  
    @Delete(':id')
    async deleteTicket(@Param('id') id: number): Promise<any> {
     return await this.userService.delete(id);
    }
}
