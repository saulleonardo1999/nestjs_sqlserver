import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      port: 1433,
      username: 'sa',
      password: 'adminsaul221299',
      database: 'nestdb',
      host: 'localhost',
      options: {
        trustServerCertificate: true
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    UsersModule,
    PostsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
