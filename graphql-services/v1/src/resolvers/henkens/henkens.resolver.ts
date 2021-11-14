import {
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { defer, from, iif, map, mergeMap, Observable, throwError } from "rxjs";

import {
  CreateHenkenArgs,
  CreateHenkenArgsContentType,
  CreateHenkenPayload,
} from "./dto/create-henken.dto";
import { FindHenkenArgs, FindHenkenPayload } from "./dto/find-henken.dto";
import { ManyHenkensArgs } from "./dto/many-henkens.dto";

import { AuthContext } from "~/auth/auth-context.decorator";
import { RequireAuth } from "~/auth/auth.guard";
import { AuthService } from "~/auth/auth.service";
import { Answer } from "~/entities/answer.entities";
import { ContentType } from "~/entities/content.entities";
import {
  Henken,
  HenkenConnection,
  HenkenContentUnion,
} from "~/entities/henken.entities";
import { User } from "~/entities/user.entities";
import { AccountsService } from "~/services/account/accounts.service";
import { AnswersService } from "~/services/answers/answers.service";
import { HenkensService } from "~/services/henkens/henkens.service";
import { UsersService } from "~/services/users/users.service";

@Resolver(() => Henken)
export class HenkensResolver {
  constructor(
    private readonly auth: AuthService,
    private readonly accounts: AccountsService,
    private readonly henkens: HenkensService,
    private readonly users: UsersService,
    private readonly answers: AnswersService,
  ) {}

  @ResolveField(() => HenkenContentUnion, { name: "content" })
  resolveContent(@Parent() { content }: Henken) {
    if (content.attribute === "real") {
      return { attribute: "real", id: content.id, type: content.type };
    } else if (content.attribute === "temp") {
      return { attribute: "temp", id: content.id };
    }
    throw new InternalServerErrorException();
  }

  @ResolveField((type) => User, { name: "postedBy" })
  resolvePostedBy({ fromUserId }: Henken): Observable<User> {
    return this.users.getById(fromUserId);
  }

  @ResolveField((type) => User, { name: "postsTo" })
  resolvePostsTo({ toUserId }: Henken): Observable<User> {
    return this.users.getById(toUserId);
  }

  @ResolveField((type) => Answer, { name: "answer", nullable: true })
  resolveAnswer({ answerId }: Henken): Observable<Answer | null> {
    if (!answerId) {
      return from([null]);
    }

    return this.answers.getById(answerId);
  }

  @Query(() => Henken, { name: "henken" })
  getHenken(
    @Args("id", { type: () => ID }) id: string,
  ): Observable<Henken> {
    return this.henkens.getById(id);
  }

  @Query(() => FindHenkenPayload, { name: "findHenken" })
  findHenken(
    @Args({ type: () => FindHenkenArgs }) { id }: FindHenkenArgs,
  ): Observable<FindHenkenPayload> {
    return this.henkens.findById(id).pipe(map((henken) => ({ henken })));
  }

  @Query(() => HenkenConnection, { name: "manyHenkens" })
  manyHenkens(
    @Args({ type: () => ManyHenkensArgs }) { orderBy, ...pagination }:
      ManyHenkensArgs,
  ): Observable<HenkenConnection> {
    return this.henkens.getMany(
      pagination,
      orderBy,
      {
        fromId: null,
        toId: null,
      },
    );
  }

  @Mutation(() => CreateHenkenPayload, {
    name: "createHenken",
  })
  @RequireAuth()
  createUser(
    @AuthContext() { authorization }: AuthContext,
    @Args({ type: () => CreateHenkenArgs }) {
      toUserId,
      comment,
      contentId,
      contentType,
    }: CreateHenkenArgs,
  ): Observable<CreateHenkenPayload> {
    return this.auth.extractAccountId(authorization).pipe(
      mergeMap((accountId) => this.accounts.getUserId(accountId)),
    ).pipe(
      mergeMap(
        (fromUserId) => (
          iif(
            () => contentType === CreateHenkenArgsContentType.TEMP_CONTENT,
            this.henkens.createHenken({
              fromUserId,
              toUserId,
              comment,
              tempContent: { id: contentId },
            }),
            defer(() => {
              const args = {
                fromUserId,
                toUserId,
                comment,
              };
              switch (contentType) {
                case CreateHenkenArgsContentType.BOOK:
                  return this.henkens.createHenken({
                    ...args,
                    realContent: {
                      id: contentId,
                      type: ContentType.BOOK,
                    },
                  });
                case CreateHenkenArgsContentType.AUTHOR:
                  return this.henkens.createHenken({
                    ...args,
                    realContent: {
                      id: contentId,
                      type: ContentType.AUTHOR,
                    },
                  });
                case CreateHenkenArgsContentType.BOOK_SERIES:
                  return this.henkens.createHenken({
                    ...args,
                    realContent: {
                      id: contentId,
                      type: ContentType.BOOK_SERIES,
                    },
                  });
                default:
                  return throwError(() => new BadRequestException());
              }
            }),
          )
        ),
      ),
      map((henken) => ({ henken })),
    );
  }
}
