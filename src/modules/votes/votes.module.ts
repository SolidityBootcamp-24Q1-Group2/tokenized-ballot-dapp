import { Module } from '@nestjs/common';
import { MintTokenController } from './controller/mint.controller';
import { MintTokenService } from './services/mintToken.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MintTokenController],
  providers: [MintTokenService, ConfigService],
})
export class VotesModule {}
