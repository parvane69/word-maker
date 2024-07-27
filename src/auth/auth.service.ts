import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';
import { UserLoginOutputDto, UserRegistrationInputDto } from './auth.dto';
import { users } from '../base/database/entities/users.entity';
import { MessageService } from '../base/webServices/sms/message.service';
import { EmailService } from '../base/webServices/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly messageService: MessageService,
    private readonly emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    confirmation_code: string,
  ): Promise<UserLoginOutputDto> {
    const user = await this.usersRepository.login(username);
    if (!user) throw new NotFoundException(`user not found ${username}`);

    if (!(await bcrypt.compare(confirmation_code, user.confirmation_code)))
      throw new UnauthorizedException(
        `confirmation_code is wrong ${username} - ${confirmation_code}`,
      );

    const payload = {
      id: user.id,
      username: user.phone,
      fullName: user.name + ' ' + user.family,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      ...user,
    };
  }

  async register(
    userRegistrationInputDto: UserRegistrationInputDto,
  ): Promise<users> {
    const { phone, email } = userRegistrationInputDto;
    const found = await this.usersRepository.checkExist(phone);
    const confirmation_code = await this.generateCodeAndSend(phone, email);
    if (!found)
      return await this.usersRepository.save(
        Object.assign(new users(), {
          ...userRegistrationInputDto,
          confirmation_code,
        }),
      );
    else
      await this.usersRepository.updateConfirmaitionCode(
        found.id,
        confirmation_code,
      );
    return found;
  }
  async generateCodeAndSend(phoneNumber, email) {
    const confirmation_code = 123456; //Math.floor(100000 + Math.random() * 900000);

    this.sendVerificationCode(phoneNumber, email, confirmation_code);

    const hash_confirmation_code = await bcrypt.hash(
      confirmation_code.toString(),
      12,
    );
    return hash_confirmation_code;
  }
  private sendVerificationCode(phoneNumber, email, confirmation_code) {
    if (phoneNumber.startsWith('+98'))
      this.messageService.sendSMS(phoneNumber, confirmation_code);
    else if (email) this.sendEmail(email, confirmation_code);
  }
  private async sendEmail(email, confirmation_code) {
    await this.emailService.sendEmail({
      to: email,
      subject: 'verification word-maker',
      text: 'کد تایید شما جهت ورود ' + confirmation_code,
    });
  }
}
