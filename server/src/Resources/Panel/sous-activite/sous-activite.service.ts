import { Injectable } from '@nestjs/common';

import { PrismaClient, SousActivite } from '@prisma/client';
import { CreateSousActiviteDto } from './dto/CreateSousActivite.dto';
import { UpdateSousActiviteDto } from './dto/UpdateSousActivite.dto';
import { UuidService } from '../../../Helpers/UUID/uuid.service';

@Injectable()
export class SousActiviteService {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly uuid: UuidService,
  ) {}
  findAll(): Promise<SousActivite[]> {
    return this.prismaClient.sousActivite.findMany();
  }
  async findOne(id: string) {
    return this.prismaClient.sousActivite.findUnique({
      where: { id },
      include: {
        pieces: {
          include: {
            piece: true,
          },
        },
      },
    });
  }

  async PersonelDashboardState(id: string) {
    const demandesEstivage = await this.prismaClient.demandeEstivage.findMany({
      where: { personelId: id },
      select: { Status: true },
    });

    const demandesPelerinage =
      await this.prismaClient.demandePelerinage.findMany({
        where: { personelId: id },
        select: { Status: true },
      });

    const demandesMarriage = await this.prismaClient.mariage.findMany({
      where: { personelId: id },
      select: { Status: true },
    });

    const demandesCredit = await this.prismaClient.demandeCredit.findMany({
      where: { personelId: id },
      select: { Status: true },
    });

    const demandesMaladies = await this.prismaClient.demamdeMaladies.findMany({
      where: { personelId: id },
      select: { Status: true },
    });

    const demandesLang = await this.prismaClient.demandeLang.findMany({
      where: { personelId: id },
      select: { Status: true },
    });

    const demandesCondoleance =
      await this.prismaClient.demandeCondoleance.findMany({
        where: { personelId: id },
        select: { Status: true },
      });

    const demandesZoo = await this.prismaClient.zoo.findMany({
      where: { personelId: id },
      select: { Status: true },
    });

    const demandesRentreeScolaire =
      await this.prismaClient.rentreeScolaire.findMany({
        where: { personelId: id },
        select: { Status: true },
      });

    const demandesExcursion = await this.prismaClient.demandeExcursion.findMany(
      {
        where: { personelId: id },
        select: { Status: true },
      },
    );

    const demandesNaissance = await this.prismaClient.naissance.findMany({
      where: { personelId: id },
      select: { Status: true },
    });

    const demandesRetrait = await this.prismaClient.retrait.findMany({
      where: { personelId: id },
      select: { Status: true },
    });

    const demandesInscreption = await this.prismaClient.inscreption.findMany({
      where: { personelId: id },
      select: { status: true },
    });

    return [
      ...demandesEstivage.map((demande) => demande.Status),
      ...demandesPelerinage.map((demande) => demande.Status),
      ...demandesMarriage.map((demande) => demande.Status),
      ...demandesCredit.map((demande) => demande.Status),
      ...demandesMaladies.map((demande) => demande.Status),
      ...demandesLang.map((demande) => demande.Status),
      ...demandesCondoleance.map((demande) => demande.Status),
      ...demandesZoo.map((demande) => demande.Status),
      ...demandesRentreeScolaire.map((demande) => demande.Status),
      ...demandesExcursion.map((demande) => demande.Status),
      ...demandesNaissance.map((demande) => demande.Status),
      ...demandesRetrait.map((demande) => demande.Status),
      ...demandesInscreption.map((demande) => demande.status), 
    ];
  }

  create(createSousActiviteDto: CreateSousActiviteDto) {
    const SousActiviteWithId = {
      id: this.uuid,
      ...createSousActiviteDto,
    };
    return this.prismaClient.sousActivite.create({
      data: SousActiviteWithId,
    });
  }
  update(id: string, updateSousActiviteDto: UpdateSousActiviteDto) {
    return this.prismaClient.sousActivite.update({
      where: { id },
      data: updateSousActiviteDto,
    });
  }
  delete(id: string) {
    return this.prismaClient.sousActivite.delete({ where: { id } });
  }
}
