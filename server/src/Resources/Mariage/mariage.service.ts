import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { mariage, PrismaClient } from '@prisma/client';
import { UpdatemariageDto } from './dto/updatemariage.dto';
import { CreatemariageDto } from './dto/createmariage.dto';
import { getYear } from 'date-fns';
import * as fs from 'fs';
import * as path from 'path';
import { UuidService } from '../../Helpers/UUID/uuid.service';

@Injectable()
export class MariageService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly uuid: UuidService,
  ) {}

  async findAll(): Promise<mariage[]> {
    return this.prisma.mariage.findMany();
  }

  async findOne(id: string) {
    const One = await this.prisma.mariage.findUnique({ where: { id } });
    return One;
  }

  async create(createmariage: CreatemariageDto) {
    console.log(createmariage);
    const currentyear = getYear(new Date());
    const MariageUUID = this.uuid.Getuuid();
    const matchingPersonel = await this.prisma.personel.findUnique({
      where: { id: createmariage.personelId },
    });
    const Checkontraiter = await this.prisma.mariage.findFirst({
      where: {
        personelId: createmariage.personelId,
        Status: 'En traitement',
      },
    });
    const Checkpasencorevue = await this.prisma.mariage.findFirst({
      where: {
        personelId: createmariage.personelId,
        Status: null,
      },
    });
    const CheckDocnecess = await this.prisma.mariage.findFirst({
      where: {
        personelId: createmariage.personelId,
        Status: 'Documents requis',
      },
    });
    if (Checkpasencorevue) {
      throw new HttpException(
        "Vous avez déjà une demande n est pas n'a pas encore été examinée par l'administrateur.",
        HttpStatus.BAD_REQUEST,
      );
    }
    if (CheckDocnecess) {
      throw new HttpException(
        'Vous avez déjà une demande avec des documents nécessaires ou pas valide. Vous pouvez modifier les documents dans votre profil.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (Checkontraiter) {
      throw new HttpException(
        'Vous avez déjà une demande en cours de traitement. Vous pouvez modifier les documents.',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      if (createmariage.files) {
        const dir = `C:\\AOS\\${matchingPersonel.matricule}\\${currentyear}\\Aides_financières\\Demandes-Mariages\\${MariageUUID}`;
        fs.mkdirSync(dir, { recursive: true });
        createmariage.files.map((file) => {
          const filePath = path.join(dir, file.originalname);
          fs.writeFileSync(filePath, file.buffer);
          console.log(`File written at ${filePath}`);
        });
      }
      return this.prisma.mariage.create({
        data: {
          id: this.uuid.Getuuid(),
          personelId: createmariage.personelId,
          description: createmariage.description,
          sousActiviteId: '1',
        },
      });
    } catch (error) {
      return HttpStatus.FAILED_DEPENDENCY;
    }
  }

  async update(id: string, updatemarigeDto: UpdatemariageDto) {
    const Marriage = await this.prisma.mariage.findUnique({
      where: {
        id,
        personelId: updatemarigeDto.personelId,
      },
    });
    if (!Marriage) {
      throw new HttpException(
        'ya pas une demande avec ce id',
        HttpStatus.BAD_REQUEST,
      );
    } else if (Marriage) {
      const matchingPersonel = await this.prisma.personel.findUnique({
        where: {
          id: updatemarigeDto.personelId,
        },
      });

      try {
        if (updatemarigeDto.files) {
          const dir = `C:\\AOS\\${matchingPersonel.matricule}\\${Marriage.effet.getFullYear()}\\Aides_financières\\Demandes-Mariages\\${id}`;
          const ExisstFiles = fs.readdirSync(dir);
          ExisstFiles.map((filePath) => {
            fs.unlinkSync(path.join(dir, filePath));
          });
          updatemarigeDto.files.map((file) => {
            const filePath = path.join(dir, file.originalname);
            fs.writeFileSync(filePath, file.buffer);
            console.log(`File written at ${filePath}`);
          });
        }
        return this.prisma.mariage.update({
          where: {
            id,
          },
          data: {
            description: updatemarigeDto.description,
            Status: null,
          },
        });
      } catch {
        throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async remove(id: string) {
    return this.prisma.mariage.delete({ where: { id } });
  }
}
