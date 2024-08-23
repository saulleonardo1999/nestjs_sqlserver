import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}
    @Get()
    async getUsers(): Promise<User[]>{
        return await this.userService.getUsers();
    }
    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<User>{
        return await this.userService.getUser(id);
    }
    @Post()
    async createUser(@Body() newUser: CreateUserDto): Promise<User>{
        return await this.userService.createUser(newUser);
    }
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number){
       return await this.userService.deleteUser(id);
    }
    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id : number, @Body() user :UpdateUserDto){
        return await this.userService.updateUser(id, user);
    }
    @Post(':id/profile')
    async createProfile(
        @Param('id', ParseIntPipe) id: number, 
        @Body() profile: CreateProfileDto
     ){
        return await this.userService.createProfile(id, profile)
    }
}
