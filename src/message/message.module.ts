import { Module, Global } from '@nestjs/common';
import { MessageService } from './message.service';

@Global()
@Module({
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
