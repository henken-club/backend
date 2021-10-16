import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { Injectable } from "@nestjs/common";

import {
  AuthorEntity,
  AuthorOrder,
  AuthorOrderField,
} from "~/contents/entities/author.entities";
import {
  AuthorWritingsOrder,
  AuthorWritingsOrderField,
} from "~/contents/resolvers/dto/authors-writings.dto";
import { PrismaService } from "~/prisma/prisma.service";

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<AuthorEntity> {
    return this.prisma.author.findUnique({
      where: { id },
      select: { id: true, name: true },
      rejectOnNotFound: true,
    });
  }

  async findById(where: { id: string }): Promise<AuthorEntity | null> {
    return this.prisma.author.findUnique({
      where,
      select: { id: true, name: true },
    });
  }

  convertOrderBy({ field, direction }: AuthorOrder): [{ id: "asc" | "desc" }] {
    switch (field) {
      case AuthorOrderField.ID:
        return [{ id: direction }];
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
    orderBy: ReturnType<AuthorsService["convertOrderBy"]>,
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.author.findMany({
          ...args,
          orderBy,
          select: { id: true },
        }),
      () => this.prisma.author.count({}),
      pagination,
    );
  }

  convertWritingOrderBy({
    field,
    direction,
  }: AuthorWritingsOrder): [{ author: { name: "asc" | "desc" } }] {
    switch (field) {
      case AuthorWritingsOrderField.BOOK_TITLE:
        return [{ author: { name: direction } }];
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
    orderBy: ReturnType<AuthorsService["convertWritingOrderBy"]>,
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.writing.findMany({
          ...args,
          where: { authorId: id },
          orderBy,
          select: { id: true },
        }),
      () =>
        this.prisma.writing.count({
          where: { authorId: id },
        }),
      pagination,
    );
  }
}
