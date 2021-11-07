import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { Injectable } from "@nestjs/common";

import { PrismaService } from "~/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        alias: true,
        displayName: true,
        avatar: true,
      },
      rejectOnNotFound: true,
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        alias: true,
        displayName: true,
        avatar: true,
      },
      rejectOnNotFound: false,
    });
  }

  async findByAlias(alias: string) {
    return this.prisma.user.findUnique({
      where: { alias },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        alias: true,
        displayName: true,
        avatar: true,
      },
      rejectOnNotFound: false,
    });
  }

  async getMany(
    pagination:
      | { first: number; after: string | null }
      | { last: number; before: string | null },
    orderBy:
      | { createdAt: "asc" | "desc" }
      | { updatedAt: "asc" | "desc" },
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.user.findMany({
          ...args,
          orderBy,
          select: {
            id: true,
          },
        }),
      () => this.prisma.user.count({}),
      pagination,
    );
  }
}
