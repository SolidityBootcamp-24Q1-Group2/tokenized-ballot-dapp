import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '@health/controllers/health.controller';
import { HealthService } from '@health/services/health.service';

describe(HealthController, () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(healthController.getHello()).toBe('Hello World!');
    });
  });
});
