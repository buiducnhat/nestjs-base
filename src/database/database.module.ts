import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'gerpan',
      password: 'Buiducnhat4701@',
      database: 'test',
      entities: [User],
    }),
  ],
})
export class DatabaseModule {}
