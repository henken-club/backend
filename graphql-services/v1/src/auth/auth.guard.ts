import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from "express";
import { map, Observable } from "rxjs";

import { AuthService } from "./auth.service";

export function RequireAuth(
  { needRegister = true, roles = [] }: {
    needRegister?: boolean;
    roles?: string[];
  } = {},
) {
  return applyDecorators(
    UseGuards(AuthGuard),
    SetMetadata("needRegister", needRegister),
    SetMetadata("roles", roles),
  );
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AuthService) private readonly auth: AuthService,
  ) {}

  canActivate(context: ExecutionContext): Observable<true> {
    const ctx = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req;

    if (!req.headers.authorization) {
      throw new UnauthorizedException("Required Authorization in header");
    }

    const needRegister = this.reflector.get<boolean>(
      "needRegister",
      ctx.getHandler(),
    );
    const roles = this.reflector.get<string[]>(
      "roles",
      ctx.getHandler(),
    );

    return this.auth.validate(
      req.headers.authorization,
      { needRegister, roles },
    ).pipe(
      map((result) => {
        if (result.status) {
          return true;
        } else {
          throw new UnauthorizedException(result.message);
        }
      }),
    );
  }
}
