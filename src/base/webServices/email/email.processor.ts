import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import * as nodemailer from 'nodemailer';

@Processor('email')
export class EmailProcessor {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'voopi1403@gmail.com',
        pass: 'dqqk lmgp htkb dgme',
      },
    });
  }

  @Process('sendEmail')
  async handleSendEmail(job: Job) {
    const { to, subject, text } = job.data;

    const mailOptions = {
      from: 'voopi1403@gmail.com',
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
