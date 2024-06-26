import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { CentresService } from './centres.service';
import { CreateCentreDto } from './dto/create-centre.dto';
import { UpdateCentreDto } from './dto/update-centre.dto';

@Controller('centres')
export class CentresController {
  constructor(private readonly centresService: CentresService) {}
  @Get()
  findAll() {
    return this.centresService.findAll();
  }
  @Get('CentresWithEmptyAppartements/:dateStart')
  findCentresWithEmptyAppartements(@Param('dateStart') dateStart: string) {
    return this.centresService.findCentresWithEmptyAppartements({
      dateStart,
    });
  }
  @Get('apartments/available/:demandeId')
  async getAvailableApartments(@Param('demandeId') demandeId: string) {
    try {
      const apartments =
        await this.centresService.getAvailableApartmentsForDemande(demandeId);
      return apartments;
    } catch (error) {
      throw new BadRequestException(
        `Error fetching available apartments: ${error.message}`,
      );
    }
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centresService.findOne(id);
  }
  @Post()
  create(@Body() createCentreDto: CreateCentreDto) {
    return this.centresService.create(createCentreDto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCentreDto: UpdateCentreDto) {
    return this.centresService.update(id, updateCentreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centresService.remove(id);
  }
}
