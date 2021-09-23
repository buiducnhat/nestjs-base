import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { SocialDto } from '../auth/dto/social.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Social } from './entities/social.entity';
import { User } from './entities/user.entity';
import { SocialProvider } from './enums/social-provider.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Social)
    private socialRepository: Repository<Social>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findWithEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  findOne(id: number | string) {
    return this.userRepository.findOne(id);
  }

  update(id: number | string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number | string) {
    return this.userRepository.delete(id);
  }

  async createSocial(socialUserDto: SocialDto, userId: number | string) {
    const user = await this.userRepository.findOne(userId);

    const socialUser = new Social();
    socialUser.user = user;
    for (const [key, value] of Object.entries(socialUserDto)) {
      socialUser[key] = value;
    }
    return this.socialRepository.save(socialUser);
  }

  async addSocialToUser(userId: number | string, socialUserId: number | string) {
    const socialUser = await this.socialRepository.findOne(socialUserId);
    const user = await this.findOne(userId);

    if (user.socials.some((social) => social.id === socialUser.id)) {
      return user;
    }
    user.socials.push(socialUser);
    return this.userRepository.save(user);
  }

  findSocialUser(socialId: string, provider: SocialProvider) {
    return this.socialRepository.findOne({ socialId, provider });
  }
}
