import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { Subscriber } from './entity/subscriber.entity';
import { Setting } from 'src/setting/entity/setting.entity';
import { Network } from 'src/network/entity/network.entity';
import { Asset } from 'src/asset/entity/asset.entity';
import { Contract } from 'src/contract/entity/contract.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Setting,
      User,
      Subscriber,
      Network,
      Asset,
      Contract,
    ]),
    JwtModule.register({
      global: true,
      secret: ConfigService.JWTConfig.secret,
      signOptions: { expiresIn: ConfigService.JWTConfig.expire },
    }),
    MailerModule.forRoot({
      transport: {
        host: ConfigService.Mail.host,
        port: ConfigService.Mail.port,
        secure: false,
        auth: {
          user: ConfigService.Mail.user,
          pass: ConfigService.Mail.password,
        },
      },
      template: {
        dir: join(process.cwd(), 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
