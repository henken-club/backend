import {Injectable} from '@nestjs/common';
import {findManyCursorConnection} from '@devoxa/prisma-relay-cursor-connection';

import {
  BookWritingsOrder,
  BookWritingsOrderField,
} from '~/contents/resolvers/dto/books-writings.dto';
import {
  BookEntity,
  BookOrder,
  BookOrderField,
} from '~/contents/entities/books.entities';
import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<BookEntity> {
    return this.prisma.book.findUnique({
      where: {id},
      select: {id: true, title: true},
      rejectOnNotFound: true,
    });
  }

  async findById(where: {id: string}): Promise<BookEntity | null> {
    return this.prisma.book.findUnique({
      where,
      select: {id: true, title: true},
    });
  }

  convertOrderBy({field, direction}: BookOrder): [{id: 'asc' | 'desc'}] {
    switch (field) {
      case BookOrderField.ID:
        return [{id: direction}];
    }
    throw new Error(`Unexpected order field: ${field}`);
  }

  async getMany(
    pagination: {
      first: number | null;
      after: string | null;
      last: number | null;
      before: string | null;
    },
    orderBy: ReturnType<BooksService['convertOrderBy']>,
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.book.findMany({
          ...args,
          orderBy,
          select: {id: true},
        }),
      () => this.prisma.book.count({}),
      pagination,
    );
  }

  convertWritingsOrderBy({
    field,
    direction,
  }: BookWritingsOrder): [{author: {name: 'asc' | 'desc'}}] {
    switch (field) {
      case BookWritingsOrderField.AUTHOR_NAME:
        return [{author: {name: direction}}];
    }
    throw new Error(`Unexpected order field: ${field}`);
  }

  async getWritings(
    id: string,
    pagination: {
      first: number | null;
      after: string | null;
      last: number | null;
      before: string | null;
    },
    orderBy: ReturnType<BooksService['convertWritingsOrderBy']>,
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.writing.findMany({
          ...args,
          where: {bookId: id},
          orderBy,
          select: {id: true},
        }),
      () =>
        this.prisma.writing.count({
          where: {bookId: id},
        }),
      pagination,
    );
  }
}
