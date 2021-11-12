import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { Injectable } from "@nestjs/common";

import {
  AnswerEntity,
  AnswerType,
  GrpcAnswerEntity,
  GrpcAnswerType,
  PrismaAnswerType,
} from "./answer.entity";

import { PrismaService } from "~/prisma/prisma.service";

@Injectable()
export class AnswersService {
  constructor(private readonly prisma: PrismaService) {}

  convertFromPrismaAnswerType(
    type: PrismaAnswerType,
  ): AnswerType {
    switch (type) {
      case PrismaAnswerType.RIGHT:
        return "right";
      case PrismaAnswerType.WRONG:
        return "wrong";
      default:
        throw new Error("Invalid content type");
    }
  }

  convertFromGrpcAnswerType(type: GrpcAnswerType): AnswerType {
    switch (type) {
      case GrpcAnswerType.RIGHT:
        return "right";
      case GrpcAnswerType.WRONG:
        return "wrong";
      default:
        throw new Error("Invalid content type");
    }
  }

  convertToPrismaAnswerType(
    type: AnswerType,
  ): PrismaAnswerType {
    switch (type) {
      case "right":
        return PrismaAnswerType.RIGHT;
      case "wrong":
        return PrismaAnswerType.WRONG;
      default:
        throw new Error("Invalid content type");
    }
  }

  convertToGrpcAnswerType(
    type: AnswerType,
  ): GrpcAnswerType {
    switch (type) {
      case "right":
        return GrpcAnswerType.RIGHT;
      case "wrong":
        return GrpcAnswerType.WRONG;
      default:
        throw new Error("Invalid content type");
    }
  }

  convertToEntity(
    { type, ...answer }: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      comment: string;
      henkenId: string;
      type: PrismaAnswerType;
    },
  ): AnswerEntity {
    return ({
      type: this.convertFromPrismaAnswerType(type),
      ...answer,
    });
  }

  convertToGrpcEntity(input: AnswerEntity): GrpcAnswerEntity {
    return ({
      id: input.id,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      comment: input.comment,
      henkenId: input.henkenId,
      type: this.convertToGrpcAnswerType(input.type),
    });
  }

  async getById(
    id: string,
  ): Promise<AnswerEntity> {
    return this.prisma.answer.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        comment: true,
        henkenId: true,
        type: true,
      },
      rejectOnNotFound: true,
    }).then((henken) => this.convertToEntity(henken));
  }

  async findById(
    id: string,
  ): Promise<AnswerEntity | null> {
    return this.prisma.answer.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        comment: true,
        henkenId: true,
        type: true,
      },
      rejectOnNotFound: false,
    }).then((answer) => (answer ? this.convertToEntity(answer) : null));
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
        this.prisma.answer.findMany({
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

  async create(
    { henkenId, comment, type }: {
      comment: string;
      henkenId: string;
      type: AnswerType;
    },
  ): Promise<AnswerEntity> {
    return this.prisma.answer.create({
      data: {
        comment,
        type: this.convertToPrismaAnswerType(type),
        henken: { connect: { id: henkenId } },
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        comment: true,
        henkenId: true,
        type: true,
      },
    }).then((henken) => this.convertToEntity(henken));
  }
}
