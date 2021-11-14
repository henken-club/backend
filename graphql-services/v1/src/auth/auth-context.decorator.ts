import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from "express";

export type AuthContext = { authorization: string };

export const AuthContext = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<AuthContext> => {
    const gqlctx = GqlExecutionContext.create(ctx);
    const req: Request = gqlctx.getContext().req;

    if (!req.headers.authorization) {
      throw new InternalServerErrorException();
    }

    return { authorization: req.headers.authorization };
  },
);
