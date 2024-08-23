import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(
        private postsService: PostsService
    ){}
    @Post()
    async createPost(@Body() post: CreatePostDto){
        return await this.postsService.createPost(post);
    }
    @Get()
    async getPosts(){
        return await this.postsService.getPosts();
    }
}
