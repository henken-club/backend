import {Injectable} from '@nestjs/common';

import {BookSeriesPartEntity} from '~/contents/entities/bookseries-parts.entities';
import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class BookSeriesPartsService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<BookSeriesPartEntity> {
    return this.prisma.bookSeriesPart.findUnique({
      where: {id},
      select: {
        id: true,
        series: {select: {id: true}},
        book: {select: {id: true}},
      },
      rejectOnNotFound: true,
    });
  }
}
