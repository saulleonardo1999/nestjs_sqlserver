import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        private userService: UsersService
    ){}
    async createPost(post: CreatePostDto){
        const userFound = this.userService.getUser(post.authorId);
        if(!userFound){
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }

        const newPost = this.postsRepository.create(post);
        return await this.postsRepository.save(newPost);
    }
    async getPosts(){
        return await this.postsRepository.find({
            relations:['author']
        });
    }
}
