import {
  BadRequestException,
  InternalServerErrorException,
  UseGuards,
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
  Henken,
  HenkenConnection,
  HenkenContentUnion,
} from "../henkens.entities";
import { HenkensService } from "../henkens.service";

import {
  CreateHenkenArgs,
  CreateHenkenArgsContentType,
  CreateHenkenPayload,
} from "./dto/create-henken.dto";
import { FindHenkenArgs, FindHenkenPayload } from "./dto/find-henken.dto";
import { ManyHenkensArgs } from "./dto/many-henkens.dto";

import { AccountsService } from "~/account/accounts.service";
import { Answer } from "~/answers/answers.entities";
import { AnswersService } from "~/answers/answers.service";
import { Viewer, ViewerType } from "~/auth/viewer.decorator";
import { ViewerGuard } from "~/auth/viewer.guard";
import { ContentType } from "~/content/content.entities";
import { User } from "~/users/users.entities";
import { UsersService } from "~/users/users.service";

@Resolver(() => Henken)
export class HenkensResolver {
  constructor(
    private readonly henkens: HenkensService,
    private readonly users: UsersService,
    private readonly answers: AnswersService,
    private readonly accounts: AccountsService,
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
  @UseGuards(ViewerGuard)
  createUser(
    @Viewer() { accountId }: ViewerType,
    @Args({ type: () => CreateHenkenArgs }) {
      toUserId,
      comment,
      contentId,
      contentType,
    }: CreateHenkenArgs,
  ): Observable<CreateHenkenPayload> {
    return this.accounts.getUserId(accountId).pipe(
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
