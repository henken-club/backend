import { AnswerType as GrpcAnswerType } from "~/protogen/core/answer";

export { AnswerType as PrismaAnswerType } from "@prisma/client";
export { AnswerType as GrpcAnswerType } from "~/protogen/core/answer";

export type AnswerType = "right" | "wrong";

export type AnswerEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  comment: string;
  henkenId: string;
  type: AnswerType;
};

export type GrpcAnswerEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  comment: string;
  henkenId: string;
  type: GrpcAnswerType;
};
