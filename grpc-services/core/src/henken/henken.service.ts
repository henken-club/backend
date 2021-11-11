import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { Injectable } from "@nestjs/common";
import { ContentType as PrismaContentType } from "@prisma/client";

import { ContentType, GrpcHenkenEntity, HenkenEntity } from "./henken.entity";

import { PrismaService } from "~/prisma/prisma.service";
import { ContentType as GrpcContentType } from "~/protogen/content/type";

@Injectable()
export class HenkensService {
  constructor(private readonly prisma: PrismaService) {}

  convertFromPrismaContentType(
    type: Exclude<PrismaContentType, "TEMP_CONTENT">,
  ): ContentType {
    switch (type) {
      case PrismaContentType.AUTHOR:
        return "author";
      case PrismaContentType.BOOK:
        return "book";
      case PrismaContentType.BOOK_SERIES:
        return "book_series";
    }
    throw new Error("Invalid content type");
  }

  convertFromGrpcContentType(type: GrpcContentType): ContentType {
    switch (type) {
      case GrpcContentType.AUTHOR:
        return "author";
      case GrpcContentType.BOOK:
        return "book";
      case GrpcContentType.BOOK_SERIES:
        return "book_series";
      default:
        throw new Error("Invalid content type");
    }
  }

  convertToPrismaContentType(
    type: ContentType,
  ): Exclude<PrismaContentType, "TEMP_CONTENT"> {
    switch (type) {
      case "author":
        return PrismaContentType.AUTHOR;
      case "book":
        return PrismaContentType.BOOK;
      case "book_series":
        return PrismaContentType.BOOK_SERIES;
    }
    throw new Error("Invalid content type");
  }

  convertToGrpcContentType(
    type: ContentType,
  ): GrpcContentType {
    switch (type) {
      case "author":
        return GrpcContentType.AUTHOR;
      case "book":
        return GrpcContentType.BOOK;
      case "book_series":
        return GrpcContentType.BOOK_SERIES;
    }
    throw new Error("Invalid content type");
  }

  convertToEntity(
    { content, answer, toId: toUserId, fromId: fromUserId, ...henken }: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      fromId: string;
      toId: string;
      comment: string;
      content: { contentId: string; contentType: PrismaContentType };
      answer: { id: string } | null;
    },
  ): HenkenEntity {
    if (content.contentType === PrismaContentType.TEMP_CONTENT) {
      return ({
        fromUserId,
        toUserId,
        answerId: answer?.id || null,
        tempContent: {
          id: content.contentId,
        },
        ...henken,
      });
    } else {
      return ({
        fromUserId,
        toUserId,
        answerId: answer?.id || null,
        realContent: {
          id: content.contentId,
          type: this.convertFromPrismaContentType(content.contentType),
        },
        ...henken,
      });
    }
  }

  convertToGrpcEntity(input: HenkenEntity): GrpcHenkenEntity {
    const common = {
      id: input.id,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      fromUserId: input.fromUserId,
      toUserId: input.toUserId,
      comment: input.comment,
      answerId: input.answerId || undefined,
    };
    if ("tempContent" in input) {
      return {
        ...common,
        content: {
          $case: "tempContent" as const,
          tempContent: { id: input.tempContent.id },
        },
      };
    } else {
      return {
        ...common,
        content: {
          $case: "realContent" as const,
          realContent: {
            id: input.realContent.id,
            type: this.convertToGrpcContentType(input.realContent.type),
          },
        },
      };
    }
  }

  async getById(
    id: string,
  ): Promise<HenkenEntity> {
    return this.prisma.henken.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        fromId: true,
        toId: true,
        comment: true,
        content: { select: { contentId: true, contentType: true } },
        answer: { select: { id: true } },
      },
      rejectOnNotFound: true,
    }).then((henken) => this.convertToEntity(henken));
  }

  async findById(
    id: string,
  ): Promise<HenkenEntity | null> {
    return this.prisma.henken
      .findUnique({
        where: { id },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          fromId: true,
          toId: true,
          comment: true,
          content: { select: { contentId: true, contentType: true } },
          answer: { select: { id: true } },
        },
        rejectOnNotFound: false,
      }).then((henken) => (henken ? this.convertToEntity(henken) : null));
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
        this.prisma.henken.findMany({
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
    { comment, content, fromUserId, toUserId }: {
      comment: string;
      fromUserId: string;
      toUserId: string;
      content:
        | { tempContent: { id: string } }
        | { realContent: { id: string; type: ContentType } };
    },
  ): Promise<HenkenEntity> {
    return this.prisma.henken.create({
      data: {
        comment,
        from: { connect: { id: fromUserId } },
        to: { connect: { id: toUserId } },
        content: "tempContent" in content
          ? {
            connectOrCreate: {
              where: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                contentId_contentType: {
                  contentId: content.tempContent.id,
                  contentType: PrismaContentType.TEMP_CONTENT,
                },
              },
              create: {
                contentId: content.tempContent.id,
                contentType: PrismaContentType.TEMP_CONTENT,
              },
            },
          }
          : {
            connectOrCreate: {
              where: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                contentId_contentType: {
                  contentId: content.realContent.id,
                  contentType: this.convertToPrismaContentType(
                    content.realContent.type,
                  ),
                },
              },
              create: {
                contentId: content.realContent.id,
                contentType: this.convertToPrismaContentType(
                  content.realContent.type,
                ),
              },
            },
          },
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        fromId: true,
        toId: true,
        comment: true,
        content: { select: { contentId: true, contentType: true } },
        answer: { select: { id: true } },
      },
    }).then((henken) => this.convertToEntity(henken));
  }
}
