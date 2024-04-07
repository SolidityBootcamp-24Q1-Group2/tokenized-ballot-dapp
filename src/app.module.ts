import { Module } from '@nestjs/common';
import { HealthController } from './modules/health/controllers/health.controller';
import { HealthService } from './modules/health/services/health.service';
import { VotesModule } from './modules/votes/votes.module';

@Module({
  imports: [VotesModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {}
