import { Module } from '@nestjs/common';
import { DemandeCondoleanceService } from './demande-condoleance.service';
import { DemandeCondoleanceController } from './demande-condoleance.controller';

@Module({
  imports: [],
  controllers: [DemandeCondoleanceController],
  providers: [DemandeCondoleanceService],
})
export class DemandeCondoleanceModule {}
