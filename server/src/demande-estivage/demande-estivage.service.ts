import { Injectable } from '@nestjs/common';
import { CreateDemandeEstivageDto } from './dto/create-demande-estivage.dto';
import { UpdateDemandeEstivageDto } from './dto/update-demande-estivage.dto';
import {  PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DemandeEstivageService {
  constructor(private readonly prismaClient: PrismaClient) {}
  findAll() {
    return this.prismaClient.demandeEstivage.findMany();
  }

  findOne(id: string) {
    return this.prismaClient.demandeEstivage.findUnique({
      where: { id },
      include: {
        personel: true,
        sousActivite: true,
        centre: true,
      },
    });
  }
  create(createDemandeEstivageDto: CreateDemandeEstivageDto) {
    const demandeWithId = {
      id: uuid(),
      ...createDemandeEstivageDto,
    };
    return this.prismaClient.demandeEstivage.create({ data: demandeWithId });
  }
  update(id: string, updateDemandeEstivageDto: UpdateDemandeEstivageDto) {
    return this.prismaClient.demandeEstivage.update({
      where: { id },
      data: updateDemandeEstivageDto,
    });
  }

  remove(id: string) {
    return this.prismaClient.demandeEstivage.delete({ where: { id } });
  }
}
