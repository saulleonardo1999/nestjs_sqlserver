import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    
    ){}
    async createUser(user: CreateUserDto): Promise<User>{
        const userFound = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        });
        if(userFound){
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }
        const newUser = this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }
    async getUsers(): Promise<User[]>{
        return await this.userRepository.find();
    }
    async getUser(id: number): Promise<User>{
        const userFound = await this.userRepository.findOne({
            where: {
                id
            },
            relations: ['posts', 'profile']
        })
        if(!userFound){
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }
        return userFound;
    }
    async deleteUser(id: number) {
        const result = await this.userRepository.delete({id});
        if(result.affected === 0){
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }
       return result;
    }
    async updateUser(id: number, user: UpdateUserDto){
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })
        if(!userFound){
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }
        const userUpdated = Object.assign(userFound, user);
       return await this.userRepository.save(userUpdated);
    }
    async createProfile(id: number, profile:CreateProfileDto ){
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        });
        if(!userFound){
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }

        const newProfile = this.profileRepository.create(profile);

        const savedProfile = await this.profileRepository.save(newProfile);
        
        userFound.profile = savedProfile;
        return await this.userRepository.save(userFound);
    }
}
