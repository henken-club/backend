import { InternalServerErrorException } from "@nestjs/common";
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { from, map, Observable } from "rxjs";

import { FindHenkenArgs, FindHenkenPayload } from "./dto/find-henken.dto";
import { ManyHenkensArgs } from "./dto/many-henkens.dto";

import { Answer } from "~/entities/answer.entities";
import {
  Henken,
  HenkenConnection,
  HenkenContentUnion,
} from "~/entities/henken.entities";
import { User } from "~/entities/user.entities";
import { AnswersService } from "~/services/answers/answers.service";
import { HenkensService } from "~/services/henkens/henkens.service";
import { UsersService } from "~/services/users/users.service";

@Resolver(() => Henken)
export class HenkensResolver {
  constructor(
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
}
