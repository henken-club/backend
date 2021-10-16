import { Injectable } from "@nestjs/common";

import { WritingEntity } from "~/contents/entities/writings.entities";
import { PrismaService } from "~/prisma/prisma.service";

@Injectable()
export class WritingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<WritingEntity> {
    return this.prisma.writing.findUnique({
      where: { id },
      select: {
        id: true,
        author: { select: { id: true } },
        book: { select: { id: true } },
      },
      rejectOnNotFound: true,
    });
  }
}
