import { Controller, Get } from '@nestjs/common';
import { HealthService } from '@health/services/health.service';

@Controller('/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHello(): string {
    return this.healthService.getHello();
  }
}
